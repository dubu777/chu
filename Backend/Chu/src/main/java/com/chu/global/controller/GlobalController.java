package com.chu.global.controller;

import com.chu.customer.domain.CustomerDetailDto;
import com.chu.customer.service.CustomerService;
import com.chu.designer.domain.DesignerDetailDto;
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

        // 디자이너 고객 구분할 flag 추가
        // 고객일 경우
        if(isUser == 1){
            CustomerDetailDto customerDetailDto = customerService.getCustomerDetail(signInDto.getId());
            ResponseDto responseDto = new ResponseDto(200, customerDetailDto);
            return ResponseEntity.ok(responseDto);
        }
        // 일단 고객은 아닌 경우
        else{
            isUser = designerService.signIn(signInDto);
            // 디자이너일 경우
            if(isUser == 2){
                DesignerDetailDto designerDetailDto = designerService.getDesignerDetail(signInDto.getId());
                ResponseDto responseDto = new ResponseDto(200, designerDetailDto);
                return ResponseEntity.ok(responseDto);
            }
        }
        
        // 로그인 실패
        ResponseDto responseDto = new ResponseDto(200, null);
        return ResponseEntity.ok(responseDto);
    }
}
