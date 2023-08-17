package com.chu.global.controller;

import com.chu.customer.service.CustomerService;
import com.chu.designer.domain.ResponseMainPageDto;
import com.chu.designer.service.DesignerService;
import com.chu.global.domain.RequestAlertCreateDto;
import com.chu.global.domain.RequestAlertReadDto;
import com.chu.global.domain.HttpResponseDto;
import com.chu.global.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final CustomerService customerService;
    private final DesignerService designerService;
    private final UserService userService;

    // 아이디 중복확인
    @GetMapping("/check-id")
    public ResponseEntity<HttpResponseDto> checkId(@RequestParam String id, @RequestParam String userType){
        boolean isExist = true;

        try{
            if(userType.equals("customer")){
                isExist = customerService.checkId(id);
            }
            else{
                isExist = designerService.checkId(id);
            }
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), isExist));
    }

    // 이메일 중복확인
    @GetMapping("/check-email")
    public ResponseEntity<HttpResponseDto> checkEmail(@RequestParam String email, @RequestParam String userType){
        boolean isExist = true;

        try{
            if(userType.equals("customer")){
                isExist = customerService.checkEmail(email);
            }
            else{
                isExist = designerService.checkEmail(email);
            }
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), isExist));

    }

    // 로그인없이 메인페이지
    @GetMapping(value = "/main")
    public ResponseEntity<HttpResponseDto> signIn(){

        ResponseMainPageDto responseMainPageDto = null;

        try{
            responseMainPageDto = userService.getMain();
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), responseMainPageDto));

    }

    @PostMapping("/alert")
    public ResponseEntity<HttpResponseDto> createAlert(@RequestBody RequestAlertCreateDto requestAlertCreateDto){

        try{
            userService.createAlert(requestAlertCreateDto);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));

    }
//
//    @PostMapping("/alert")
//    public ResponseEntity<HttpResponseDto> creatAlert(@RequestBody RequestAlertCreateDto requestAlertCreateDto) {
//
//        String userType = requestAlertCreateDto.getUserType();
//
//        boolean customerSuccess = false;
//        boolean designerSuccess = false;
//
//        if(userType.equals("customer")){
//            boolean isSuccess = customerService.createAlert(requestAlertCreateDto);
//            if(isSuccess) customerSuccess = true;
//        }
//        else if(userType.equals("designer")){
//            boolean isSuccess = designerService.createAlert(requestAlertCreateDto);
//            if(isSuccess) designerSuccess = true;
//        }
//
//        if(customerSuccess || designerSuccess){
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//        else{
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
//
//    @PatchMapping("/alert")
//    public ResponseEntity<HttpResponseDto> readAlert(@RequestBody RequestAlertReadDto requestAlertReadDto) {
//
//        String userType = requestAlertReadDto.getUserType();
//
//        boolean customerSuccess = false;
//        boolean designerSuccess = false;
//
//        if (userType.equals("customer")) {
//            boolean isSuccess = customerService.readAlert(requestAlertReadDto);
//            if (isSuccess) customerSuccess = true;
//        } else if (userType.equals("designer")) {
//            boolean isSuccess = designerService.readAlert(requestAlertReadDto);
//            if (isSuccess) designerSuccess = true;
//        }
//
//        if (customerSuccess || designerSuccess) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
//            return ResponseEntity.ok(httpResponseDto);
//        } else {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
}
