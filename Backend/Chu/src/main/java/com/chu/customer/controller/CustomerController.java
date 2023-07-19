package com.chu.customer.controller;

import com.chu.customer.domain.CustomerDetailDto;
import com.chu.customer.domain.CustomerDto;
import com.chu.customer.service.CustomerService;
import com.chu.global.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;
    
    // 회원 가입
    @PostMapping(value = "/sign-up")
    public ResponseEntity<ResponseDto> signUp(@RequestBody CustomerDto customerDto){
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

    // 로그인
    @PostMapping(value = "/sign-in")
    public ResponseEntity<ResponseDto> signIn(@RequestBody SignInDto signInDto) {

        boolean isUser = customerService.signIn(signInDto);

        // 로그인 성공
        if(isUser){
            CustomerDetailDto customerDetailDto = customerService.getCustomerDetail(signInDto.getId());
            ResponseDto responseDto = new ResponseDto(200, customerDetailDto);
            return ResponseEntity.ok(responseDto);
        }
        // 로그인 실패
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @GetMapping("/find-id")
    public ResponseEntity<ResponseDto> findId(@RequestParam String name, @RequestParam String email){

        FindIdDto findIdDto = new FindIdDto();
        findIdDto.setName(name);
        findIdDto.setEmail(email);

        String id = customerService.findId(findIdDto);

        if(id != null){
            HashMap<String, String> resultMap = new HashMap<>();
            resultMap.put("id", id);
            ResponseDto responseDto = new ResponseDto(200, resultMap);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @GetMapping("/find-pwd")
    public ResponseEntity<ResponseDto> findPwd(@RequestParam String id, @RequestParam String name, @RequestParam String email){

        FindPwdDto findPwdDto = new FindPwdDto();
        findPwdDto.setName(name);
        findPwdDto.setId(id);
        findPwdDto.setEmail(email);

        int seq = customerService.isValidUser(findPwdDto);
        
        // 존재하는 유저일 경우
        if(seq == 1){
            HashMap<String, Integer> resultMap = new HashMap<>();
            resultMap.put("seq", seq);
            ResponseDto responseDto = new ResponseDto(200, resultMap);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @PatchMapping("/change-pwd")
    public ResponseEntity<ResponseDto> changePwd(@RequestBody ChangePwdDto changePwdDto) {
        boolean isSuccess = customerService.changePwd(changePwdDto);

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
