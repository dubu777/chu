package com.chu.designer.controller;

import com.chu.designer.domain.*;
import com.chu.designer.service.DesignerSearchService;
import com.chu.global.domain.HairStyleDto;
import com.chu.global.domain.HttpResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/designer/search")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DesignerSearchController {

    private final DesignerSearchService designerSearchService;

    @GetMapping("/review-score")
    public ResponseEntity<HttpResponseDto> search2ReviewScore(@RequestParam int customerSeq){

        ResponseDesignerSearchDto responseDesignerSearchDto = new ResponseDesignerSearchDto();
        List<HairStyleDto> allCutHairStyle = designerSearchService.showCategoryView(1);
        List<HairStyleDto> allPermHairStyle = designerSearchService.showCategoryView(2);

        responseDesignerSearchDto.setAllCutHairStyle(allCutHairStyle);
        responseDesignerSearchDto.setAllPermHairStyle(allPermHairStyle);

        List<DesignerSearchDto> designerSearchDtoList = designerSearchService.searchList(customerSeq);

        if(designerSearchDtoList.size() != 0) {
            //dto 평점 순으로 정렬
            Collections.sort(designerSearchDtoList, Comparator.comparingDouble(DesignerSearchDto::getReviewScore).reversed());
            responseDesignerSearchDto.setDesignerListCnt(designerSearchDtoList.size());
            responseDesignerSearchDto.setDesignerList(designerSearchDtoList);
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseDesignerSearchDto);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/like-cnt")
    public ResponseEntity<HttpResponseDto> search2LikeCount(@RequestParam int customerSeq) {

        ResponseDesignerSearchDto responseDesignerSearchDto = new ResponseDesignerSearchDto();
        List<DesignerSearchDto> designerSearchDtoList = designerSearchService.searchList(customerSeq);

        if(designerSearchDtoList.size() != 0){
            //좋아요 순으로 정렬
            Collections.sort(designerSearchDtoList, Comparator.comparingDouble(DesignerSearchDto::getLikeCnt).reversed());
            responseDesignerSearchDto.setDesignerListCnt(designerSearchDtoList.size());
            responseDesignerSearchDto.setDesignerList(designerSearchDtoList);
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseDesignerSearchDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<HttpResponseDto> search2Filter(@RequestParam("hairStyleSeqs") Integer[] hairStyleSeqs,
                                                         @RequestParam int customerSeq) {
        log.info("컨트롤러 hairStyleSeqs 파라미터로 들어온 배열 : " + hairStyleSeqs);
        List<DesignerSearchDto> designerSearchDtoList = designerSearchService.search2Filter(customerSeq, hairStyleSeqs);

        if(designerSearchDtoList.size() != 0){
            ResponseDesignerSearchDto responseDesignerSearchDto = new ResponseDesignerSearchDto();
            responseDesignerSearchDto.setDesignerListCnt(designerSearchDtoList.size());
            responseDesignerSearchDto.setDesignerList(designerSearchDtoList);
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseDesignerSearchDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/name")
    public ResponseEntity<HttpResponseDto> search2Name(@RequestParam int customerSeq, @RequestParam String name){

        List<DesignerSearchDto> designerSearchDtoList = designerSearchService.search2Name(customerSeq, name);

        if(designerSearchDtoList.size() != 0){
            ResponseDesignerSearchDto responseDesignerSearchDto = new ResponseDesignerSearchDto();
            responseDesignerSearchDto.setDesignerListCnt(designerSearchDtoList.size());
            responseDesignerSearchDto.setDesignerList(designerSearchDtoList);
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseDesignerSearchDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/around")
    public ResponseEntity<HttpResponseDto> searchAround(){

        List<ResponseDesignerSearchAroundDto> list = null;

        try{
            list = designerSearchService.search2AllArea();
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), list));
    }

//    @GetMapping("/around")
//    public ResponseEntity<HttpResponseDto> search2AllArea(){
//        List<ResponseDesignerSearchAreaDto> responseDesignerSearchAreaDtoList = designerSearchService.search2AllArea();
//
//        if(responseDesignerSearchAreaDtoList.size() != 0){
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseDesignerSearchAreaDtoList);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//        else{
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }

    @GetMapping("/detail/{designer-seq}")
    public ResponseEntity<HttpResponseDto> getDesignerDetailInfo(@PathVariable("designer-seq") Integer designerSeq, @RequestParam("customerSeq") Integer customerSeq){


        ResponseDesignerDetailInfoDto responseDesignerDetailInfoDto = designerSearchService.getDesignerDetailInfo(designerSeq, customerSeq);

        if(responseDesignerDetailInfoDto != null){
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseDesignerDetailInfoDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }
}
