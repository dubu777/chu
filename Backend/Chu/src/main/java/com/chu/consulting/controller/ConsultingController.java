package com.chu.consulting.controller;

import com.chu.consulting.domain.*;
import com.chu.consulting.service.ConsultingService;
import com.chu.global.domain.ResponseDto;
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
    public ResponseEntity<ResponseDto> participantConsulting(@PathVariable("consulting_seq") int consultingSeq) {

        String url = consultingService.participantConsulting(consultingSeq);

        if (url != null) {
            ResponseDto responseDto = new ResponseDto(200, url);
            return ResponseEntity.ok(responseDto);
        }
        else {
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @PostMapping("/")
    public ResponseEntity<ResponseDto> postConsulting(@RequestBody ConsultingRequestDto consultingRequestDto) {

        int isSuccess = consultingService.createConsulting(consultingRequestDto);

        if (isSuccess == 1) {
            ResponseDto responseDto = new ResponseDto(200, null);
            return ResponseEntity.ok(responseDto);
        }
        else {
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @PatchMapping("/")
    public ResponseEntity<ResponseDto> updateConsultingUrl(@PathVariable("consulting-seq") int consultingSeq, @RequestParam String url){

        boolean isSuccess = consultingService.updateConsultingUrl(consultingSeq, url);

        if (isSuccess) {
            ResponseDto responseDto = new ResponseDto(200, null);
            return ResponseEntity.ok(responseDto);
        }
        else {
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @DeleteMapping("/")

    public ResponseEntity<ResponseDto> deleteConsulting(@PathVariable("consulting_seq") int consultingSeq) {

        boolean isSuccess = consultingService.deleteConsulting(consultingSeq);

        if (isSuccess) {
            ResponseDto responseDto = new ResponseDto(200, null);
            return ResponseEntity.ok(responseDto);
        }
        else {
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @GetMapping("/result")
    public ResponseEntity<ResponseDto> getConsultingResult(@PathVariable("consulting-seq") int consultingSeq) {

        ConsultingResultDto consultingResultDto = consultingService.getConsultingResult(consultingSeq);

        if (consultingResultDto != null) {
            ResponseDto responseDto = new ResponseDto(200, consultingResultDto);
            return ResponseEntity.ok(responseDto);
        }
        else {
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @PatchMapping("/result")
    public ResponseEntity<ResponseDto> updateConsultingResult(@RequestBody ConsultingUpdateDto consultingUpdateDto) {

        boolean isSuccess = consultingService.updateConsultingResult(consultingUpdateDto);

        if (isSuccess) {
            ResponseDto responseDto = new ResponseDto(200, null);
            return ResponseEntity.ok(responseDto);
        }
        else {
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @PatchMapping("/review")
    public ResponseEntity<ResponseDto> updateConsultingReview(@RequestBody ConsultingReviewDto consultingReviewDto) {

        boolean isSuccess = consultingService.updateConsultingReview(consultingReviewDto);

        if (isSuccess) {
            ResponseDto responseDto = new ResponseDto(200, null);
            return ResponseEntity.ok(responseDto);
        }
        else {
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @GetMapping("/result-element")
    public ResponseEntity<ResponseDto> getConsultingResultDetailInfo(@RequestParam int consultingSeq){

        ConsultingReviewInfoDto consultingReviewInfoDto = consultingService.getConsultingResultDetailInfo(consultingSeq);

        if (consultingReviewInfoDto != null) {
            ResponseDto responseDto = new ResponseDto(200, consultingReviewInfoDto);
            return ResponseEntity.ok(responseDto);
        }
        else {
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

}
