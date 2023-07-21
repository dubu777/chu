package com.chu.consulting.controller;

import com.chu.consulting.domain.*;
import com.chu.consulting.service.ConsultingService;
import com.chu.global.domain.HttpResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/consulting")
@RequiredArgsConstructor

public class ConsultingController {

    private final ConsultingService consultingService;

    @GetMapping("/")
    public ResponseEntity<HttpResponseDto> participantConsulting(@PathVariable("consulting_seq") int consultingSeq) {

        String url = consultingService.participantConsulting(consultingSeq);

        if (url != null) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, url);
            return ResponseEntity.ok(httpResponseDto);
        }
        else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @PostMapping("/")
    public ResponseEntity<HttpResponseDto> postConsulting(@RequestBody RequestConsultingDto requestConsultingDto) {

        boolean isSuccess = consultingService.createConsulting(requestConsultingDto);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
            return ResponseEntity.ok(httpResponseDto);
        }
        else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @PatchMapping("/")
    public ResponseEntity<HttpResponseDto> updateConsultingUrl(@PathVariable("consulting-seq") int consultingSeq, @RequestParam String url){

        boolean isSuccess = consultingService.updateConsultingUrl(consultingSeq, url);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
            return ResponseEntity.ok(httpResponseDto);
        }
        else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @DeleteMapping("/")
    public ResponseEntity<HttpResponseDto> deleteConsulting(@PathVariable("consulting-seq") int consultingSeq) {

        boolean isSuccess = consultingService.deleteConsulting(consultingSeq);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
            return ResponseEntity.ok(httpResponseDto);
        }
        else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/result")
    public ResponseEntity<HttpResponseDto> getConsultingResult(@PathVariable("consulting-seq") int consultingSeq) {

        ConsultingResultDto consultingResultDto = consultingService.getConsultingResult(consultingSeq);

        if (consultingResultDto != null) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, consultingResultDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @PatchMapping("/result")
    public ResponseEntity<HttpResponseDto> updateConsultingResult(@RequestBody ConsultingUpdateDto consultingUpdateDto) {

        boolean isSuccess = consultingService.updateConsultingResult(consultingUpdateDto);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
            return ResponseEntity.ok(httpResponseDto);
        }
        else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @PatchMapping("/review")
    public ResponseEntity<HttpResponseDto> updateConsultingReview(@RequestBody ConsultingReviewDto consultingReviewDto) {

        boolean isSuccess = consultingService.updateConsultingReview(consultingReviewDto);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
            return ResponseEntity.ok(httpResponseDto);
        }
        else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/result-element")
    public ResponseEntity<HttpResponseDto> getConsultingResultDetailInfo(@RequestParam int consultingSeq){

        ConsultingReviewInfoDto consultingReviewInfoDto = consultingService.getConsultingResultDetailInfo(consultingSeq);

        if (consultingReviewInfoDto != null) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, consultingReviewInfoDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

}
