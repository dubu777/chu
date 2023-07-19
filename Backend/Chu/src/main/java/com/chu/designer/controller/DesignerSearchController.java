package com.chu.designer.controller;

import com.chu.designer.domain.DesignerSearchDto;
import com.chu.designer.domain.DesignerSearchResponseDto;
import com.chu.designer.service.DesignerSearchService;
import com.chu.global.domain.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<ResponseDto> search2Filter(@RequestParam("hairStyle") String[] hairStyle, @RequestParam int customerSeq){
        
    }

}
