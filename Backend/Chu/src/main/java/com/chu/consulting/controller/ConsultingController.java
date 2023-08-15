package com.chu.consulting.controller;

import com.chu.consulting.domain.*;
import com.chu.consulting.service.ConsultingService;
import com.chu.designer.service.DesignerDetailService;
import com.chu.global.domain.HairStyleDto;
import com.chu.designer.service.DesignerSearchService;
import com.chu.global.domain.HttpResponseDto;
import com.chu.global.domain.ImageDto;
import com.chu.global.domain.ImageMakeDto;
import com.chu.global.service.ImageQueueService;
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
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
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
    private final ImageQueueService imageQueueService;

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

            List<String> targetFileUrls = new ArrayList<>();
            targetFileUrls.add("/chu/upload/images/consulting/origin/" + consultingSeq + ".png");
            for (int portfolioNum : portfolioNums) {
                Integer pnumTmp = new Integer(portfolioNum);
                String tmp = pnumTmp.toString();
//                log.info("문자열 제대로 바뀌었다: {}", tmp);
                targetFileUrls.add("/chu/upload/images/designer/portfolio/p_" + tmp + ".png");
            }

            ImageMakeDto imageMakeDto = new ImageMakeDto();
            imageMakeDto.setFileList(targetFileUrls);
            imageMakeDto.setFlag('C');
            imageMakeDto.setConsultingSeq(consultingSeq);
            imageMakeDto.setPortfolioNums(portfolioNums);

            imageQueueService.sendImageToQueue(imageMakeDto);

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
        factory.setReadTimeout(180 * 60 * 1000);
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
