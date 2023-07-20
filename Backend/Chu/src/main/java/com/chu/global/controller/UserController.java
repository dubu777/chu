package com.chu.global.controller;

import com.chu.customer.service.CustomerService;
import com.chu.designer.service.DesignerService;
import com.chu.global.domain.AlertCreateDto;
import com.chu.global.domain.AlertReadDto;
import com.chu.global.domain.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final CustomerService customerService;
    private final DesignerService designerService;

    // 아이디 중복확인
    @GetMapping("/check-id")
    public ResponseEntity<ResponseDto> checkId(@RequestParam String id){
        log.info("id = {id}", id);

        // 존재하지 않으면 가능 -> true
        boolean existsCustomer = customerService.checkId(id);
        // 존재하지 않으면 가능 -> true
        boolean existsDesigner = designerService.checkId(id);

        // 두 테이블 모두 존재하지 않아야함
        if (existsCustomer && existsDesigner) {
            ResponseDto responseDto = new ResponseDto(200, true);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, false);
            return ResponseEntity.ok(responseDto);
        }
    }

    // 이메일 중복확인
    @GetMapping("/check-email")
    public ResponseEntity<ResponseDto> checkEmail(@RequestParam String email){
        log.info("email = {email}", email);

        // 존재하지 않으면 가능 -> true
        boolean existsCustomer = customerService.checkEmail(email);
        // 존재하지 않으면 가능 -> true
        boolean existsDesigner = designerService.checkEmail(email);

        // 두 테이블 모두 존재하지 않아야함
        if (existsCustomer && existsDesigner) {
            ResponseDto responseDto = new ResponseDto(200, true);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, false);
            return ResponseEntity.ok(responseDto);
        }
    }

    @PostMapping("/alert")
    public ResponseEntity<ResponseDto> creatAlert(@RequestBody AlertCreateDto alertCreateDto) {

        String userType = alertCreateDto.getUserType();

        boolean customerSuccess = false;
        boolean designerSuccess = false;

        if(userType.equals("customer")){
            boolean isSuccess = customerService.createAlert(alertCreateDto);
            if(isSuccess) customerSuccess = true;
        }
        else if(userType.equals("designer")){
            boolean isSuccess = designerService.createAlert(alertCreateDto);
            if(isSuccess) designerSuccess = true;
        }

        if(customerSuccess || designerSuccess){
            ResponseDto responseDto = new ResponseDto(200, null);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @PatchMapping("/alert")
    public ResponseEntity<ResponseDto> readAlert(@RequestBody AlertReadDto alertReadDto) {

        String userType = alertReadDto.getUserType();

        boolean customerSuccess = false;
        boolean designerSuccess = false;

        if (userType.equals("customer")) {
            boolean isSuccess = customerService.readAlert(alertReadDto);
            if (isSuccess) customerSuccess = true;
        } else if (userType.equals("designer")) {
            boolean isSuccess = designerService.readAlert(alertReadDto);
            if (isSuccess) designerSuccess = true;
        }

        if (customerSuccess || designerSuccess) {
            ResponseDto responseDto = new ResponseDto(200, null);
            return ResponseEntity.ok(responseDto);
        } else {
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }
}
