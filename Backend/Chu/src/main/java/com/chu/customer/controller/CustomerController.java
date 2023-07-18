package com.chu.customer.controller;

import com.chu.customer.domain.CustomerDto;
import com.chu.customer.service.CustomerService;
import com.chu.global.domain.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    
    // 회원 가입
    @PostMapping(value = "/customer/sign-up")
    public ResponseEntity<ResponseDto> signUp(@ResponseBody CustomerDto customerDto){
        log.info(customerDto.toString());
        int isSuccess = customerService.signUp(customerDto);

        if(isSuccess == 1){
            ResponseDto responseDto = new ResponseDto(200, null);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

}
