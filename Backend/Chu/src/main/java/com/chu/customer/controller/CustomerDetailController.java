package com.chu.customer.controller;

import com.chu.customer.service.CustomerDetailService;
import com.chu.global.domain.HttpResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/customer/detail")
@RestController
@RequiredArgsConstructor
public class CustomerDetailController {

    private final CustomerDetailService customerDetailService;

    @PatchMapping("/img")
    public ResponseEntity<HttpResponseDto> patchImg(@RequestParam("img") String imgName){

        boolean isSuccess = customerDetailService.patchImage(imgName);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, imgName);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }
}
