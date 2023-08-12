package com.chu.event.controller;

import com.chu.consulting.domain.ResponseParticipantConsulting;
import com.chu.event.domain.ResponseEventDto;
import com.chu.event.service.EventService;
import com.chu.global.domain.HttpResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Slf4j
@RestController
@RequestMapping("/event")
@RequiredArgsConstructor

public class EventController {

    private final EventService eventService;

    @GetMapping("/{customer_seq}")
    public ResponseEntity<HttpResponseDto> participantEvent(@PathVariable("customer_seq") int customerSeq) {

        ResponseEventDto responseEventDto = null;
        try{
            responseEventDto = eventService.checkCanMake(customerSeq);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), responseEventDto));
    }

    @PostMapping("/{customer_seq}")
    public ResponseEntity<HttpResponseDto> postEvent(@PathVariable("customer_seq") int customerSeq, @RequestPart("img") MultipartFile[] files){

        try{
            MultipartFile inputImgFile = files[0];
            MultipartFile targetImgFIle = files[1];

            // 입력이미지
            // 서버에 실제 저장, 저장한 이미지 이름 가져오기 왜? 앞으로 디비에 넣을꺼니까
            String inputImgFileName = eventService.getSavedImgFileEventOriginFile(customerSeq, inputImgFile);
            String targetImgFileName = eventService.getSavedImgFileEventTargetFile(customerSeq, targetImgFIle);

            eventService.updateImgNamesAndState(customerSeq, inputImgFileName, targetImgFileName, 1);

            // GPU 서버로 전달 로직


        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }


}
