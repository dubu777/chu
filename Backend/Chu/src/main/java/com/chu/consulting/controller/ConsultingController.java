package com.chu.consulting.controller;

import com.chu.consulting.domain.*;
import com.chu.consulting.service.ConsultingService;
import com.chu.designer.domain.HairStyleDto;
import com.chu.designer.service.DesignerSearchService;
import com.chu.global.domain.HttpResponseDto;
import com.chu.global.domain.ImageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/consulting")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor

public class ConsultingController {

    private final ConsultingService consultingService;
    private final DesignerSearchService designerSearchService;

    @GetMapping("/{consulting_seq}")
    public ResponseEntity<HttpResponseDto> participantConsulting(@PathVariable("consulting_seq") int consultingSeq) {

        String sessionId = null;

        try{
            sessionId = consultingService.participantConsulting(consultingSeq);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), sessionId));
    }

    // 상담 예약하기
    @PostMapping("")
    public ResponseEntity<HttpResponseDto> postConsulting(@RequestBody RequestConsultingDto requestConsultingDto){

        try{
            // requestConsultingDto -> entity 만들기
            Consulting consulting = requestConsultingDto.toConsultingEntity();
            consultingService.postConsulting(consulting);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    // 상담 취소하기
    @PutMapping("/cancel/{consultingSeq}")
    public ResponseEntity<HttpResponseDto> cancelConsulting(@PathVariable int consultingSeq){

        try{
            consultingService.cancelConsulting(consultingSeq);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    @PatchMapping("/{consulting_seq}")
    public ResponseEntity<HttpResponseDto> updateConsultingSessionId(@PathVariable("consulting_seq") int consultingSeq, @RequestParam String sessionId){

        try{
            consultingService.updateConsultingUrl(consultingSeq, sessionId);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    // 상담 후기 등록
    @PatchMapping("/review")
    public ResponseEntity<HttpResponseDto> updateConsultingReview(@RequestBody RequestConsultingReviewDto requestConsultingReviewDto){

        try{
            consultingService.updateConsultingReview(requestConsultingReviewDto);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

//
//    @PatchMapping("/")
//    public ResponseEntity<HttpResponseDto> updateConsultingUrl(@PathVariable("consulting-seq") int consultingSeq, @RequestParam String url){
//
//        boolean isSuccess = consultingService.updateConsultingUrl(consultingSeq, url);
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
//    @DeleteMapping("/")
//    public ResponseEntity<HttpResponseDto> deleteConsulting(@PathVariable("consulting-seq") int consultingSeq) {
//
//        boolean isSuccess = consultingService.deleteConsulting(consultingSeq);
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
    public ResponseEntity<HttpResponseDto> getConsultingResultDetailInfo(@RequestParam int consultingSeq){

        ResponseConsultingReviewInfoDto responseConsultingReviewInfoDto = new ResponseConsultingReviewInfoDto();

        try{
            List<HairStyleDto> allCutHairStyle = designerSearchService.showCategoryView(1);
            List<HairStyleDto> allPermHairStyle = designerSearchService.showCategoryView(2);
            List<ImageDto> imgs = consultingService.getConfusionImageList(consultingSeq);

            responseConsultingReviewInfoDto.setCutHairStyle(allCutHairStyle);
            responseConsultingReviewInfoDto.setPermHairStyle(allPermHairStyle);
            responseConsultingReviewInfoDto.setImgs(imgs);

        } catch (Exception e){
            e.printStackTrace();
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }

        HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseConsultingReviewInfoDto);
        return ResponseEntity.ok(httpResponseDto);
    }

}
