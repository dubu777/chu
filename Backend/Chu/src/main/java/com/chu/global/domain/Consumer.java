package com.chu.global.domain;

import com.chu.consulting.service.ConsultingService;
import com.chu.event.service.EventService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Component
@Slf4j
public class Consumer implements Runnable {
    private final BlockingQueue<ImageMakeDto> queue;
    private final EventService eventService;
    private final ConsultingService consultingService;

    public Consumer(BlockingQueue<ImageMakeDto> queue, EventService eventService, ConsultingService consultingService) {
        this.queue = queue;
        this.eventService = eventService;
        this.consultingService = consultingService;
    }

    @Override
    public void run() {
        while (true) {
            ImageMakeDto workRequest;
            synchronized (queue) {
                workRequest = queue.poll();
            }
            if (workRequest != null) {
                // GPU 서버에 작업을 전송하고 응답을 받는 로직
                if(workRequest.getFlag() == 'E'){
                    processEvent(workRequest);
                }
                else if(workRequest.getFlag() == 'C'){
                    processConsulting(workRequest);
                }
            }

            // 다음 작업을 가져오기 전에 일정 시간 대기할 수 있습니다.
            try {
                Thread.sleep(1000); // 1초 대기
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    private void processEvent(ImageMakeDto task) {
        LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        String url = "http://3.34.80.231:5000/save-img2";
        HttpStatus httpStatus = HttpStatus.CREATED;

//            JsonNode response;
//        ResponseEntity<String> response;
        ResponseEntity<byte[]> response;
        // 타겟사진 고른 개수 리스트 길이만큼 반복하면 될듯
        for (String destUrl : task.getFileList()) {
            body.add("file", new FileSystemResource(destUrl));
        }
        System.out.println("요청 바디 >>>>>>>>> " + body);

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        // 요청 설정
        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        response = REST_TEMPLATE.postForEntity(url, requestEntity, byte[].class);

        // 압축파일의 바이너리 데이터
        byte[] imageBytes = response.getBody();
        // 이부분은 서비스가서 처리하기
        try (ByteArrayInputStream byteStream = new ByteArrayInputStream(imageBytes);
             ZipInputStream zipStream = new ZipInputStream(byteStream)) {

            // 여기서 entry가 파일 하나. 이걸 ec2서버에 저장하는 로직을 구현하면 될 것 같다. (다른 이미지 처리하는 것과 동일하게)
            ZipEntry entry;
            int n = 0;
            while ((entry = zipStream.getNextEntry()) != null) {
                if (!entry.isDirectory()) {  // 디렉토리가 아닌 경우만 처리
                    String filename = entry.getName();
                    byte[] fileData = new byte[(int) entry.getSize()];
                    int bytesRead = zipStream.read(fileData);

                    Files.write(Path.of("/chu/upload/images/customer/event/confusion/" + task.getCustomerSeq() + ".png"), fileData);

                    eventService.updateConfusionImageNameAndState(task.getConsultingSeq(), task.getCustomerSeq() + ".png", 4);
                    // 파일 처리 로직을 적용하고 예시로 콘솔에 출력
                    log.info("Filename: {}",filename);
                    log.info("File size: {} bytes", bytesRead);
                    n++;
                }
                zipStream.closeEntry();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void processConsulting(ImageMakeDto task){
        LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        String url = "http://3.34.80.231:5000/save-img";
        HttpStatus httpStatus = HttpStatus.CREATED;

//        JsonNode response;
//        ResponseEntity<String> response;
        ResponseEntity<byte[]> response;

        // 타겟사진 고른 개수 리스트 길이만큼 반복하면 될듯
        for (String destUrl : task.getFileList()) {
            body.add("file", new FileSystemResource(destUrl));
        }
        System.out.println("요청 바디 >>>>>>>>> " + body);

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        // 요청 설정
        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // 요청,응답값 로그 찍기 위함
//            REST_TEMPLATE.getInterceptors().add(new RequestResponseLoggingInterceptor());

//            response = REST_TEMPLATE.postForObject(url, requestEntity, JsonNode.class);
//            response = REST_TEMPLATE.exchange(url, HttpMethod.POST, requestEntity, String.class);
        response = REST_TEMPLATE.postForEntity(url, requestEntity, byte[].class);

        log.info("응답 왔음");

        // 압축파일의 바이너리 데이터
        byte[] imageBytes = response.getBody();

        // 압축파일의 바이너리 배열을 풀어 파일 처리 로직
        // 이부분은 서비스가서 처리하기
        try (ByteArrayInputStream byteStream = new ByteArrayInputStream(imageBytes);
             ZipInputStream zipStream = new ZipInputStream(byteStream)) {

            // 여기서 entry가 파일 하나. 이걸 ec2서버에 저장하는 로직을 구현하면 될 것 같다. (다른 이미지 처리하는 것과 동일하게)
            ZipEntry entry;
            int n = 0;
            while ((entry = zipStream.getNextEntry()) != null) {
                if (!entry.isDirectory()) {  // 디렉토리가 아닌 경우만 처리
                    String filename = entry.getName();
                    byte[] fileData = new byte[(int) entry.getSize()];
                    int bytesRead = zipStream.read(fileData);

                    Files.write(Path.of("/chu/upload/images/consulting/confusion/" + task.getConsultingSeq() + "_"+task.getPortfolioNums().get(n)+".png"), fileData);

                    consultingService.postConsultingConfusionImage(task.getConsultingSeq(), task.getPortfolioNums().get(n));
                    // 파일 처리 로직을 적용하고 예시로 콘솔에 출력
                    log.info("Filename: {}",filename);
                    log.info("File size: {} bytes", bytesRead);
                    n++;
                }
                zipStream.closeEntry();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void sendImageToQueue(ImageMakeDto imageMakeDto) {
        synchronized (queue) {
            queue.add(imageMakeDto);
        }
    }

    private static final RestTemplate REST_TEMPLATE;

    static {
        // RestTemplate 기본 설정을 위한 Factory 생성
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(3000);
        factory.setReadTimeout(180*60*1000);
        factory.setBufferRequestBody(false); // 파일 전송은 이 설정을 꼭 해주자.
        REST_TEMPLATE = new RestTemplate(factory);
    }
}