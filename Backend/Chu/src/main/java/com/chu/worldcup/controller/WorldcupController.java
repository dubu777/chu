package com.chu.worldcup.controller;

import com.chu.global.domain.ImageWithHairInfoDto;
import com.chu.global.domain.HttpResponseDto;
import com.chu.worldcup.domain.WorldcupRequestDto;
import com.chu.worldcup.domain.WorldcupStatisticsRequestDto;
import com.chu.worldcup.service.WorldcupService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/worldcup")
public class WorldcupController {

    private final WorldcupService worldcupService;

    @GetMapping("/")
    public ResponseEntity<HttpResponseDto> getWorldcup(@RequestParam int worldcupSeq){

        ArrayList<ImageWithHairInfoDto> imageWithHairInfoDtoList = worldcupService.getWorldcup(worldcupSeq);

        if(imageWithHairInfoDtoList.size() != 0){
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, imageWithHairInfoDtoList);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }

    }

    @PostMapping("/")
    public ResponseEntity<HttpResponseDto> createWorldcup(@RequestBody WorldcupRequestDto worldcupRequestDto) {

        int responseSeq = worldcupService.createWorldcup(worldcupRequestDto);

        // 예외 처리 다시 보기
        if(responseSeq > 0){
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseSeq);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @PatchMapping("/")
    public ResponseEntity<HttpResponseDto> updateWorldcupStatistics(@RequestBody WorldcupStatisticsRequestDto worldcupStatisticsRequestDto) {

        boolean isSuccess = worldcupService.updateWorldcupStatistics(worldcupStatisticsRequestDto);

        if(isSuccess){
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

}
