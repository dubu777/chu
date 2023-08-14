package com.chu.event.controller;

import com.chu.consulting.domain.ResponseParticipantConsulting;
import com.chu.event.domain.ResponseEventDto;
import com.chu.event.service.EventService;
import com.chu.global.domain.HttpResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Slf4j
@RestController
@RequestMapping("/event")
@RequiredArgsConstructor

public class EventController {

    private final EventService eventService;

    @GetMapping("/{customer_seq}")
    public ResponseEntity<HttpResponseDto> participantEvent(@PathVariable("customer_seq") int customerSeq) {

        ResponseEventDto responseEventDto = null;
        try{
            responseEventDto = eventService.checkCanMake(customerSeq);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), responseEventDto));
    }

    @PostMapping("/inputImage/{customer_seq}")
    public ResponseEntity<HttpResponseDto> postInputImage(@PathVariable("customer_seq") int customerSeq, @RequestPart("img") MultipartFile file){
        try{
            log.info("이미지 왔니?");
            // 서버에 실제 저장, 저장한 이미지 이름 가져오기 왜? 앞으로 디비에 넣을꺼니까
            String inputImgFileName = eventService.getSavedImgFileEventOriginFile(customerSeq, file);
            log.info("inputImgFile: ", inputImgFileName);
            eventService.updateInputImageNameAndState(customerSeq, inputImgFileName, 1);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    @PostMapping("/targetImage/{customer_seq}")
    public ResponseEntity<HttpResponseDto> postTargetImage(@PathVariable("customer_seq") int customerSeq, @RequestPart("img") MultipartFile file){
        try{
            log.info("이미지 왔니?");
            // 서버에 실제 저장, 저장한 이미지 이름 가져오기 왜? 앞으로 디비에 넣을꺼니까
            String targetImgFileName = eventService.getSavedImgFileEventTargetFile(customerSeq, file);
            log.info("inputImgFile: ", targetImgFileName);
            eventService.updateTargetImageNameAndState(customerSeq, targetImgFileName, 2);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }


    @PostMapping("/{customer_seq}")
    public ResponseEntity<HttpResponseDto> postEvent(@PathVariable("customer_seq") int customerSeq){

        try{
            eventService.updateState(customerSeq,3);

            // GPU 서버로 이미지 만들어주세요 이미지 전달 로직

            String inputImageName = eventService.getInputImageName(customerSeq);
            String targetImageName = eventService.getTargetImageName(customerSeq);

            List<String> targetFileUrls = new ArrayList<>();
            targetFileUrls.add("/chu/upload/images/customer/event/target/" + customerSeq + ".png");

            LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            String url = "http://3.34.80.231:5000/save-img2";
            HttpStatus httpStatus = HttpStatus.CREATED;

//            JsonNode response;
//        ResponseEntity<String> response;
            ResponseEntity<byte[]> response;

            String pathToFile = "/chu/upload/images/designer/customer/event/origin/" + customerSeq + ".png";
            Resource fileResource = new FileSystemResource(pathToFile);

            if (fileResource.exists()) {
                body.add("file", fileResource);
            }
            // 타겟사진 고른 개수 리스트 길이만큼 반복하면 될듯
            for (String destUrl : targetFileUrls) {
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

                        Files.write(Path.of("/chu/upload/images/customer/event/confusion/" + customerSeq + ".png"), fileData);

                        eventService.updateConfusionImageNameAndState(customerSeq, customerSeq + ".png", 4);
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

        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    private static final RestTemplate REST_TEMPLATE;

    static {
        // RestTemplate 기본 설정을 위한 Factory 생성
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(3000);
        factory.setReadTimeout(3000);
        factory.setBufferRequestBody(false); // 파일 전송은 이 설정을 꼭 해주자.
        REST_TEMPLATE = new RestTemplate(factory);
    }
}
