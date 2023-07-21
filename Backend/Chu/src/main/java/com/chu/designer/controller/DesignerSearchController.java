package com.chu.designer.controller;

import com.chu.designer.domain.DesignerDetailInfoDto;
import com.chu.designer.domain.DesignerSearchAreaDto;
import com.chu.designer.domain.DesignerSearchDto;
import com.chu.designer.domain.DesignerSearchResponseDto;
import com.chu.designer.service.DesignerSearchService;
import com.chu.global.domain.ResponseDto;
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
    public ResponseEntity<ResponseDto> search2Name(@RequestParam int customerSeq, @RequestParam String name){

        ArrayList<DesignerSearchDto> designerSearchDtoList = designerSearchService.search2Name(customerSeq, name);

        if(designerSearchDtoList.size() != 0){
            DesignerSearchResponseDto designerSearchResponseDto = new DesignerSearchResponseDto();
            designerSearchResponseDto.setDesignerListCnt(designerSearchDtoList.size());
            designerSearchResponseDto.setDesignerList(designerSearchDtoList);
            ResponseDto responseDto = new ResponseDto(200, designerSearchResponseDto);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<ResponseDto> search2Filter(@RequestParam("hairStyle") String[] hairStyle, @RequestParam int customerSeq){
        ArrayList<DesignerSearchDto> designerSearchDtoList = designerSearchService.search2Filter(customerSeq, hairStyle);

        if(designerSearchDtoList.size() != 0){
            DesignerSearchResponseDto designerSearchResponseDto = new DesignerSearchResponseDto();
            designerSearchResponseDto.setDesignerListCnt(designerSearchDtoList.size());
            designerSearchResponseDto.setDesignerList(designerSearchDtoList);
            ResponseDto responseDto = new ResponseDto(200, designerSearchResponseDto);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @GetMapping("/like-cnt")
    public ResponseEntity<ResponseDto> search2LikeCount(@RequestParam int customerSeq){
        ArrayList<DesignerSearchDto> designerSearchDtoList = designerSearchService.search2LikeCount(customerSeq);

        if(designerSearchDtoList.size() != 0){
            DesignerSearchResponseDto designerSearchResponseDto = new DesignerSearchResponseDto();
            designerSearchResponseDto.setDesignerListCnt(designerSearchDtoList.size());
            designerSearchResponseDto.setDesignerList(designerSearchDtoList);
            ResponseDto responseDto = new ResponseDto(200, designerSearchResponseDto);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @GetMapping("/around")
    public ResponseEntity<ResponseDto> search2AllArea(){
        ArrayList<DesignerSearchAreaDto> designerSearchAreaDtoList = designerSearchService.search2AllArea();

        if(designerSearchAreaDtoList.size() != 0){
            ResponseDto responseDto = new ResponseDto(200, designerSearchAreaDtoList);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @GetMapping("/detail")
    public ResponseEntity<ResponseDto> getDesignerDetailInfo(@PathVariable("designer-seq") int designerSeq, @RequestParam int customerSeq){

        DesignerDetailInfoDto designerDetailInfoDto = designerSearchService.getDesignerDetailInfo(designerSeq, customerSeq);

        if(designerDetailInfoDto != null){
            ResponseDto responseDto = new ResponseDto(200, designerDetailInfoDto);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }
}
