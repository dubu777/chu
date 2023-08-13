package com.chu.consulting.controller;

import com.chu.consulting.domain.*;
import com.chu.consulting.service.ConsultingService;
import com.chu.designer.service.DesignerDetailService;
import com.chu.global.domain.HairStyleDto;
import com.chu.designer.service.DesignerSearchService;
import com.chu.global.domain.HttpResponseDto;
import com.chu.global.domain.ImageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Slf4j
@RestController
@RequestMapping("/consulting")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor

public class ConsultingController {

    private final ConsultingService consultingService;
    private final DesignerSearchService designerSearchService;
    private final DesignerDetailService designerDetailService;

    @GetMapping("/{consulting_seq}")
    public ResponseEntity<HttpResponseDto> participantConsulting(@PathVariable("consulting_seq") int consultingSeq) {

        ResponseParticipantConsulting response = null;

        try {
            response = consultingService.participantConsulting(consultingSeq);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), response));
    }

    // 상담 예약하기
    @PostMapping("")
    public ResponseEntity<HttpResponseDto> postConsulting(@RequestBody RequestConsultingDto requestConsultingDto) {

        int consultingSeq = -1;
        try {
            consultingSeq = consultingService.postConsulting(requestConsultingDto);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), consultingSeq));
    }

    // 헤어모델 api와 이미지 주고받는 컨트롤러
    @PostMapping("/img/{consulting-seq}")
    public ResponseEntity<HttpResponseDto> uploadImg(@PathVariable("consulting-seq") int consultingSeq,
                                                     @RequestPart("img") MultipartFile file) throws IOException {
        String fileName = "";
        try {
            // 우리서버에 이미지, 디비에 이미지 이름 저장하고 옴
            fileName = consultingService.getSavedImgFilePathConsultingOriginFile(consultingSeq, file);
            consultingService.postConsultingOriginImage(consultingSeq, fileName);

            List<Integer> portfolioNums = new ArrayList<>();
            portfolioNums = consultingService.getTargetNumbers(consultingSeq);

            for (int i : portfolioNums) {
                log.info("포트폴리오 넘버다: {}", i);
            }

            List<String> targetFileUrls = new ArrayList<>();
            for (int portfolioNum : portfolioNums) {
                Integer pnumTmp = new Integer(portfolioNum);
                String tmp = pnumTmp.toString();
                log.info("문자열 제대로 바뀌었다: {}", tmp);
//                targetFileUrls.add("file:////chu/upload/images/designer/portfolio/" + tmp + ".png");
                targetFileUrls.add("/chu/upload/images/designer/portfolio/" + tmp + ".png");
            }


            //여기서 타겟사진을 꺼내서 한번에 묶어서 보내야 됨
            //파일 url-> 파일 객체로 변환 작업

            // 타겟 사진 몇개 골랐는지도 넘어와야 하겠다. 한번에 처리할거면 상관없고.
//            for() {
//                String destFile = "여기 넣어져야 할 게 파일이 있는 ec2 서버 경로, 즉 url: /chu/어쩌고/파일명.확장자";
//                targetFileUrls.add(destFile);
//            }
            // test

            // 선진 주석처리
//            targetFileUrls.add("/Users/mzmzrmz/workspace/S09P12B111/Backend/Chu/hair_api_output/source2_hairstyle_1_2_flip_final/0_erased_src_seg.png");
//            targetFileUrls.add("/Users/mzmzrmz/workspace/S09P12B111/Backend/Chu/hair_api_output/source2_hairstyle_1_2_flip_final/2_final_target_seg.png");

            /*
            우리가 파일넣을 때 file.transferTo(destFile); 이렇게 저장했고,
            파일을 다시 불러오고자 할 때에는 파일명과 확장자까지 포함하여 전체 경로를 지정해야됨.
            FileInputStream 등의 클래스를 사용하여 파일을 불러올 때에는
            "C:/uploads/image.jpg"라는 전체 파일 경로를 사용해야 합니다
             */

            // ======================================================================= 플라스크와 통신
            LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            String url = "http://3.34.80.231:5000/save-img";
            HttpStatus httpStatus = HttpStatus.CREATED;

//        JsonNode response;
//        ResponseEntity<String> response;
            ResponseEntity<byte[]> response;

            if (!file.isEmpty()) {
                // 원본 사진
                body.add("file", file.getResource());
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

            // 요청,응답값 로그 찍기 위함
//            REST_TEMPLATE.getInterceptors().add(new RequestResponseLoggingInterceptor());

//            response = REST_TEMPLATE.postForObject(url, requestEntity, JsonNode.class);
//            response = REST_TEMPLATE.exchange(url, HttpMethod.POST, requestEntity, String.class);
            response = REST_TEMPLATE.postForEntity(url, requestEntity, byte[].class);
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
//                        Files.write(Path.of("output"+n+".png"), fileData);

                        // 파일 처리 로직을 적용하고 예시로 콘솔에 출력
//                        System.out.println("Filename: " + filename);
//                        System.out.println("File size: " + bytesRead + " bytes");
//                        n++;
                    }
                    zipStream.closeEntry();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            HttpResponseDto httpResponseDto = new HttpResponseDto(200, fileName);
            return ResponseEntity.ok(httpResponseDto);
        } catch (Exception e) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    // 상담 취소하기
    @PutMapping("/cancel/{consultingSeq}")
    public ResponseEntity<HttpResponseDto> cancelConsulting(@PathVariable int consultingSeq) {

        try {
            consultingService.cancelConsulting(consultingSeq);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    @PatchMapping("/{consulting_seq}")
    public ResponseEntity<HttpResponseDto> updateConsultingSessionId(@PathVariable("consulting_seq") int consultingSeq, @RequestParam String sessionId) {

        try {
            consultingService.updateConsultingUrl(consultingSeq, sessionId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    // 상담 후기 등록
    @PostMapping("/review")
    public ResponseEntity<HttpResponseDto> updateConsultingReview(@RequestBody RequestConsultingReviewDto requestConsultingReviewDto){

        try {
            consultingService.updateConsultingReview(requestConsultingReviewDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    // 상담 결과 등록
    @PostMapping("/result")
    public ResponseEntity<HttpResponseDto> updateConsultingResult(@RequestBody RequestConsultingResultDto requestConsultingResultDto){

        try {
            consultingService.updateConsultingResult(requestConsultingResultDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    // 상담 결과 조회
    @GetMapping("/result/{consulting-seq}")
    public ResponseEntity<HttpResponseDto> getConsultingResult(@PathVariable("consulting-seq") int consultingSeq){

        ResponseConsultingResultDto response = new ResponseConsultingResultDto();

        try {
            response = consultingService.getConsultingResult(consultingSeq);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), response));
    }


    //
//    @GetMapping("/result")
//    public ResponseEntity<HttpResponseDto> getConsultingResult(@PathVariable("consulting-seq") int consultingSeq) {
//
//        ResponseConsultingResultDto responseConsultingResultDto = consultingService.getConsultingResult(consultingSeq);
//
//        if (responseConsultingResultDto != null) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseConsultingResultDto);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//        else {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
//
//    @PatchMapping("/result")
//    public ResponseEntity<HttpResponseDto> updateConsultingResult(@RequestBody RequestConsultingUpdateDto requestConsultingUpdateDto) {
//
//        boolean isSuccess = consultingService.updateConsultingResult(requestConsultingUpdateDto);
//
//        if (isSuccess) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//        else {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
//
//    @PatchMapping("/review")
//    public ResponseEntity<HttpResponseDto> updateConsultingReview(@RequestBody RequestConsultingReviewDto requestConsultingReviewDto) {
//
//        boolean isSuccess = consultingService.updateConsultingReview(requestConsultingReviewDto);
//
//        if (isSuccess) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//        else {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
//
    @GetMapping("/result-element")
    public ResponseEntity<HttpResponseDto> getConsultingResultDetailInfo(@RequestParam int consultingSeq) {

        ResponseConsultingReviewInfoDto responseConsultingReviewInfoDto = new ResponseConsultingReviewInfoDto();

        try {
            List<HairStyleDto> allCutHairStyle = designerSearchService.showCategoryView(1);
            List<HairStyleDto> allPermHairStyle = designerSearchService.showCategoryView(2);
            List<ImageDto> imgs = consultingService.getConfusionImageList(consultingSeq);

            responseConsultingReviewInfoDto.setCutHairStyle(allCutHairStyle);
            responseConsultingReviewInfoDto.setPermHairStyle(allPermHairStyle);
            responseConsultingReviewInfoDto.setImgs(imgs);

        } catch (Exception e) {
            e.printStackTrace();
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }

        HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseConsultingReviewInfoDto);
        return ResponseEntity.ok(httpResponseDto);
    }

    // --------------------------------------------- 사진 업로드 테스트 ---------------
    private static final RestTemplate REST_TEMPLATE;

    static {
        // RestTemplate 기본 설정을 위한 Factory 생성
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(3000);
        factory.setReadTimeout(3000);
        factory.setBufferRequestBody(false); // 파일 전송은 이 설정을 꼭 해주자.
        REST_TEMPLATE = new RestTemplate(factory);
    }

    private class RequestResponseLoggingInterceptor implements org.springframework.http.client.ClientHttpRequestInterceptor {

        private final Logger logger = LoggerFactory.getLogger(getClass());

        @Override
        public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
            // 요청 정보 로깅
            logger.info("Request URI: {}", request.getURI());
            logger.info("Request Method: {}", request.getMethod());
            logger.info("Request Headers: {}", request.getHeaders());
            logger.info("Request Body: {}", new String(body, StandardCharsets.UTF_8));

            // 응답 받기
            ClientHttpResponse response = execution.execute(request, body);

            // 응답 정보 로깅
            logger.info("Response Status Code: {}", response.getRawStatusCode());
            logger.info("Response Status Text: {}", response.getStatusText());
            logger.info("Response Headers: {}", response.getHeaders());
            //logger.info("Response Body: {}", StreamUtils.copyToString(response.getBody(), StandardCharsets.UTF_8));

            return response;
        }
    }

    private class MultipartInputStreamFileResource extends InputStreamResource {
        private final String filename;

        MultipartInputStreamFileResource(InputStream inputStream, String filename) {
            super(inputStream);
            this.filename = filename;
        }

        @Override
        public String getFilename() {
            return this.filename;
        }

        @Override
        public long contentLength() throws IOException {
            return -1; // we do not want to generally read the whole stream into memory ...
        }

    }


}
