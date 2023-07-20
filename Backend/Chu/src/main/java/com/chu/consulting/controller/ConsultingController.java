package com.chu.consulting.controller;

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
    public ResponseEntity<ResponseDto> participantConsulting(@PathVariable("consulting_seq") int consultingSeq){
        String url = consultingService.;
    }

    @DeleteMapping("/")
    public ResponseEntity<ResponseDto> deleteConsulting(@PathVariable("consulting_seq") int consultingSeq){

        boolean isSuccess = consultingService.deleteConsulting(consultingSeq);

        if(isSuccess){
            ResponseDto responseDto = new ResponseDto(200, null);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

}
