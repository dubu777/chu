package com.chu.customer.controller;

import com.chu.customer.service.CustomerService;
import com.chu.global.domain.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    // 로직들 global로 빼서 global 에서 customer, designer 주입해서 쓸까 고민중
    // 아이디 중복확인
    @GetMapping(value = "/customer/check-id")
    public ResponseEntity<ResponseDto> checkId(@RequestParam String id){
        log.info("id = {id}", id);
        boolean isSuccess = customerService.checkId(id);

        if(isSuccess){
            ResponseDto responseDto = new ResponseDto(200, true);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(200, false);
            return ResponseEntity.ok(responseDto);
        }
    }

    // 이메일 중복확인
    @GetMapping(value = "/customer/check-email")
    public ResponseEntity<ResponseDto> checkEmail(@RequestParam String email){
        log.info("email = {email}", email);
        boolean isSuccess = customerService.checkEmail(email);

        if(isSuccess){
            ResponseDto responseDto = new ResponseDto(200, true);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(200, false);
            return ResponseEntity.ok(responseDto);
        }
    }
}
