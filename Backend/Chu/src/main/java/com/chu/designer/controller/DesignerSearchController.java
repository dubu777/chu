package com.chu.designer.controller;

import com.chu.designer.domain.DesignerDetailInfoDto;
import com.chu.designer.domain.DesignerSearchAreaDto;
import com.chu.designer.domain.DesignerSearchDto;
import com.chu.designer.domain.DesignerSearchResponseDto;
import com.chu.designer.service.DesignerSearchService;
import com.chu.global.domain.HttpResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Slf4j
@RestController
@RequestMapping("/designer/search")
@RequiredArgsConstructor
public class DesignerSearchController {

    private final DesignerSearchService designerSearchService;

    @GetMapping("/name")
    public ResponseEntity<HttpResponseDto> search2Name(@RequestParam int customerSeq, @RequestParam String name){

        ArrayList<DesignerSearchDto> designerSearchDtoList = designerSearchService.search2Name(customerSeq, name);

        if(designerSearchDtoList.size() != 0){
            DesignerSearchResponseDto designerSearchResponseDto = new DesignerSearchResponseDto();
            designerSearchResponseDto.setDesignerListCnt(designerSearchDtoList.size());
            designerSearchResponseDto.setDesignerList(designerSearchDtoList);
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, designerSearchResponseDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<HttpResponseDto> search2Filter(@RequestParam("hairStyle") String[] hairStyle, @RequestParam int customerSeq){
        ArrayList<DesignerSearchDto> designerSearchDtoList = designerSearchService.search2Filter(customerSeq, hairStyle);

        if(designerSearchDtoList.size() != 0){
            DesignerSearchResponseDto designerSearchResponseDto = new DesignerSearchResponseDto();
            designerSearchResponseDto.setDesignerListCnt(designerSearchDtoList.size());
            designerSearchResponseDto.setDesignerList(designerSearchDtoList);
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, designerSearchResponseDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/like-cnt")
    public ResponseEntity<HttpResponseDto> search2LikeCount(@RequestParam int customerSeq){
        ArrayList<DesignerSearchDto> designerSearchDtoList = designerSearchService.search2LikeCount(customerSeq);

        if(designerSearchDtoList.size() != 0){
            DesignerSearchResponseDto designerSearchResponseDto = new DesignerSearchResponseDto();
            designerSearchResponseDto.setDesignerListCnt(designerSearchDtoList.size());
            designerSearchResponseDto.setDesignerList(designerSearchDtoList);
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, designerSearchResponseDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/around")
    public ResponseEntity<HttpResponseDto> search2AllArea(){
        ArrayList<DesignerSearchAreaDto> designerSearchAreaDtoList = designerSearchService.search2AllArea();

        if(designerSearchAreaDtoList.size() != 0){
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, designerSearchAreaDtoList);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/detail")
    public ResponseEntity<HttpResponseDto> getDesignerDetailInfo(@PathVariable("designer-seq") int designerSeq, @RequestParam int customerSeq){

        DesignerDetailInfoDto designerDetailInfoDto = designerSearchService.getDesignerDetailInfo(designerSeq, customerSeq);

        if(designerDetailInfoDto != null){
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, designerDetailInfoDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }
}
