package com.chu.global.controller;

import com.chu.customer.service.CustomerService;
import com.chu.designer.service.DesignerService;
import com.chu.global.domain.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
