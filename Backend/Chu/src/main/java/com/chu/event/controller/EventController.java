package com.chu.event.controller;

import com.chu.consulting.domain.ResponseParticipantConsulting;
import com.chu.event.domain.ResponseEventDto;
import com.chu.event.service.EventService;
import com.chu.global.domain.HttpResponseDto;
import com.chu.global.domain.ImageMakeDto;
import com.chu.global.service.ImageQueueService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Slf4j
@RestController
@RequestMapping("/event")
@RequiredArgsConstructor

public class EventController {

    private final EventService eventService;
    private final ImageQueueService imageQueueService;

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

    @PostMapping("/inputImage/{customer_seq}")
    public ResponseEntity<HttpResponseDto> postInputImage(@PathVariable("customer_seq") int customerSeq, @RequestPart("img") MultipartFile file){
        try{
            log.info("이미지 왔니?");
            // 서버에 실제 저장, 저장한 이미지 이름 가져오기 왜? 앞으로 디비에 넣을꺼니까
            String inputImgFileName = eventService.getSavedImgFileEventOriginFile(customerSeq, file);
            log.info("inputImgFile: ", inputImgFileName);
            eventService.updateInputImageNameAndState(customerSeq, inputImgFileName, 1);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    @PostMapping("/targetImage/{customer_seq}")
    public ResponseEntity<HttpResponseDto> postTargetImage(@PathVariable("customer_seq") int customerSeq, @RequestPart("img") MultipartFile file){
        try{
            log.info("이미지 왔니?");
            // 서버에 실제 저장, 저장한 이미지 이름 가져오기 왜? 앞으로 디비에 넣을꺼니까
            String targetImgFileName = eventService.getSavedImgFileEventTargetFile(customerSeq, file);
            log.info("inputImgFile: ", targetImgFileName);
            eventService.updateTargetImageNameAndState(customerSeq, targetImgFileName, 2);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }


    @PostMapping("/{customer_seq}")
    public ResponseEntity<HttpResponseDto> postEvent(@PathVariable("customer_seq") int customerSeq){

        try{
            eventService.updateState(customerSeq,3);
            String inputImageName = eventService.getInputImageName(customerSeq);
            String targetImageName = eventService.getTargetImageName(customerSeq);

            // GPU 서버로 이미지 만들어주세요 이미지 전달 로직
            List<String> targetFileUrls = new ArrayList<>();
            targetFileUrls.add("/chu/upload/images/customer/event/origin/" + customerSeq + ".png");
            targetFileUrls.add("/chu/upload/images/customer/event/target/" + customerSeq + ".png");

            ImageMakeDto imageMakeDto = new ImageMakeDto();
            imageMakeDto.setFileList(targetFileUrls);
            imageMakeDto.setFlag('E');
            imageMakeDto.setCustomerSeq(customerSeq);

            imageQueueService.sendImageToQueue(imageMakeDto);

        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }
}
