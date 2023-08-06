package com.chu.designer.controller;

import com.chu.consulting.domain.ResponseConsultingDto;
import com.chu.designer.domain.RequestDesignerInfoUpdateDto;
import com.chu.designer.domain.RequestReservationPossibleDateAndTimeDto;
import com.chu.designer.domain.ResponseDesignerMyPageUpdateShowDto;
import com.chu.designer.domain.ResponseDesignerMyPageDto;
import com.chu.designer.service.DesignerDetailService;
import com.chu.global.domain.HttpResponseDto;
import com.chu.global.domain.ImageDto;
import com.chu.global.domain.TimeDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/designer/detail")
@RequiredArgsConstructor
public class DesignerDetailController {

    private final DesignerDetailService designerDetailService;
//
//    @GetMapping("/")
//    public ResponseEntity<HttpResponseDto> getDesignerDetailInfo(@PathVariable("designer-seq") int designerSeq) {
//        ResponseDesignerMyPageUpdateShowDto responseDesignerMyPageUpdateShowDto = new ResponseDesignerMyPageUpdateShowDto();
//
//        responseDesignerMyPageUpdateShowDto = designerDetailService.getDesignerMyPageUpdateInfo(designerSeq);
//
//        if (responseDesignerMyPageUpdateShowDto != null) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseDesignerMyPageUpdateShowDto);
//            return ResponseEntity.ok(httpResponseDto);
//        } else {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
//
//    @PutMapping("/")
//    public ResponseEntity<HttpResponseDto> updateDesignerInfo(@PathVariable("designer-seq") int designerSeq, @RequestBody RequestDesignerInfoUpdateDto requestDesignerInfoUpdateDto) {
//
//        boolean isSuccess = designerDetailService.updateDesignerInfo(designerSeq, requestDesignerInfoUpdateDto);
//
//        if (isSuccess) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
//            return ResponseEntity.ok(httpResponseDto);
//        } else {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
//
//    @GetMapping("/mypage")
//    public ResponseEntity<HttpResponseDto> getMyPageInfo(@PathVariable("designer-seq") int designerSeq) {
//        ResponseDesignerMyPageDto responseDesignerMyPageDto = designerDetailService.getMyPageInfo(designerSeq);
//
//        if (responseDesignerMyPageDto != null) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseDesignerMyPageDto);
//            return ResponseEntity.ok(httpResponseDto);
//        } else {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
//
//    @PatchMapping("/introduction")
//    public ResponseEntity<HttpResponseDto> patchIntroduction(@PathVariable("designer-seq") int designerSeq, @RequestParam String introduction) {
//
//        boolean isSuccess = designerDetailService.patchIntroduction(designerSeq, introduction);
//
//        if (isSuccess) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, introduction);
//            return ResponseEntity.ok(httpResponseDto);
//        } else {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
//
//    @PatchMapping("/img")
//    public ResponseEntity<HttpResponseDto> patchImg(@PathVariable("designer-seq") int designerSeq, @RequestParam String img) {
//
//        boolean isSuccess = designerDetailService.patchImg(designerSeq, img);
//
//        if (isSuccess) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, img);
//            return ResponseEntity.ok(httpResponseDto);
//        } else {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
//
//    @GetMapping("/time")
//    public ResponseEntity<HttpResponseDto> getPossibleReservationTime(@PathVariable("designer-seq") int designerSeq, Date date) {
//
//        ArrayList<TimeDto> possibleReservationTime = designerDetailService.getPossibleReservationTime(designerSeq, date);
//
//        if (possibleReservationTime.size() != 0) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, possibleReservationTime);
//            return ResponseEntity.ok(httpResponseDto);
//        } else {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
//
//    @PutMapping("/time")
//    public ResponseEntity<HttpResponseDto> updatePossibleReservationTime(@PathVariable("designer-seq") int designerSeq, @RequestBody RequestReservationPossibleDateAndTimeDto requestReservationPossibleDateAndTimeDto) {
//
//        boolean isSuccess = designerDetailService.updatePossibleReservationTime(designerSeq, requestReservationPossibleDateAndTimeDto);
//
//        if (isSuccess) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
//            return ResponseEntity.ok(httpResponseDto);
//        } else {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
//
//    @GetMapping("/reservation-list")
//    public ResponseEntity<HttpResponseDto> getReservationList(@PathVariable("designer-seq") int designerSeq) {
//
//        ArrayList<ResponseConsultingDto> reservationList = designerDetailService.getReservationList(designerSeq);
//
//        if (reservationList.size() != 0) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, reservationList);
//            return ResponseEntity.ok(httpResponseDto);
//        } else {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }

    @GetMapping("/portfolio/{designer-seq}")
    public ResponseEntity<HttpResponseDto> getPortfolio(@PathVariable("designer-seq") int designerSeq) {

        List<ImageDto> portfolioList = new ArrayList<>();

        try{
            portfolioList = designerDetailService.getPortfolio(designerSeq);
        } catch (Exception e){
            e.printStackTrace();
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }

        HttpResponseDto httpResponseDto = new HttpResponseDto(200, portfolioList);
        return ResponseEntity.ok(httpResponseDto);
    }

    @PostMapping("/portfolio/{designer-seq}")
    public ResponseEntity<HttpResponseDto> postPortfolio(@PathVariable("designer-seq") int designerSeq, @RequestPart("img") MultipartFile file) {

        try{
            String filePath = designerDetailService.getSavedImgFilePath(file);
            designerDetailService.postPortfolioImage(designerSeq, filePath);

        } catch (Exception e){
            e.printStackTrace();
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }

        HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
        return ResponseEntity.ok(httpResponseDto);
    }

    @DeleteMapping("/portfolio/{designer-seq}")
    public ResponseEntity<HttpResponseDto> deletePortfolio(@PathVariable("designer-seq") int designerSeq, @RequestParam int imageSeq) {

        try{
//            designerDetailService.deletePortfolioImage(designerSeq, imageSeq);
            designerDetailService.deletePortfolioImage(imageSeq);
        } catch (Exception e){
            e.printStackTrace();
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
        HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
        return ResponseEntity.ok(httpResponseDto);
    }
}
