package com.chu.global.controller;

import com.chu.customer.service.CustomerService;
import com.chu.designer.service.DesignerService;
import com.chu.global.domain.ResponseDto;
import com.chu.global.domain.SignInDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class GlobalController {

    private final CustomerService customerService;
    private final DesignerService designerService;

    // 로그인, 아이디 찾기, 비밀번호 찾기
    // 회원, 디자이너 중복 체크 두번
    @GetMapping("/sign-in")
    public ResponseEntity<ResponseDto> signIn(SignInDto signInDto){

        int isUser = 0;
        isUser = customerService.signIn(signInDto);

        // 고객일 경우
        if(isUser == 1){
            customerService.getCustomerDetail(signInDto.getId());
        }
        // 일단 고객은 아닌 경우
        else{
            isUser = designerService.signIn(signInDto);
            // 디자이너일 경우
            if(isUser == 2){
                designerService.getDesignerDetail(signInDto.getId());
            }
        }
        
        // 로그인 실패
        
    }
}
