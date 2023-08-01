package com.chu.customer.controller;

import com.chu.customer.domain.*;
import com.chu.customer.service.CustomerService;
import com.chu.designer.domain.DesignerSearchDto;
import com.chu.designer.domain.ResponseDesignerSearchDto;
import com.chu.designer.service.DesignerSearchService;
import com.chu.global.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;
    private final DesignerSearchService designerSearchService;

    // 회원 가입
    @PostMapping(value = "/sign-up")
    public ResponseEntity<HttpResponseDto> signUp(@RequestBody RequestCustomerSignUpDto requestCustomerSignUpDto){
        log.info(requestCustomerSignUpDto.toString());
        boolean isSuccess = customerService.signUp(requestCustomerSignUpDto);

        if(isSuccess){
            ResponseCustomerLoginDetailDto responseCustomerLoginDetailDto = customerService.getLoginCustomerDetail(requestCustomerSignUpDto.getId());
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseCustomerLoginDetailDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    // 로그인
    @PostMapping(value = "/sign-in")
    public ResponseEntity<HttpResponseDto> signIn(@RequestBody RequestSignInDto requestSignInDto) {

        boolean isUser = customerService.signIn(requestSignInDto);

        // 로그인 성공
        if(isUser){
            ResponseCustomerLoginDetailDto responseCustomerLoginDetailDto = customerService.getLoginCustomerDetail(requestSignInDto.getId());
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseCustomerLoginDetailDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        // 로그인 실패
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/find-id")
    public ResponseEntity<HttpResponseDto> findId(@RequestParam String name, @RequestParam String email){

        RequestFindIdDto requestFindIdDto = new RequestFindIdDto();
        requestFindIdDto.setName(name);
        requestFindIdDto.setEmail(email);

        String id = customerService.findId(requestFindIdDto);

        if(id != null){
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, id);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/find-pwd")
    public ResponseEntity<HttpResponseDto> findPwd(@RequestParam String id, @RequestParam String name, @RequestParam String email){

        RequestFindPwdDto requestFindPwdDto = new RequestFindPwdDto();
        requestFindPwdDto.setName(name);
        requestFindPwdDto.setId(id);
        requestFindPwdDto.setEmail(email);

        int seq = customerService.isValidUser(requestFindPwdDto);

        // 존재하는 유저일 경우
        if(seq == 1){
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, seq);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @PatchMapping("/change-pwd")
    public ResponseEntity<HttpResponseDto> changePwd(@RequestBody RequestChangePwdDto requestChangePwdDto) {
        boolean isSuccess = customerService.changePwd(requestChangePwdDto);

        if(isSuccess){
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @PostMapping("/like")
    public ResponseEntity<HttpResponseDto> changeLikeInfo(@RequestBody RequestLikeDto requestLikeDto){

        int likeCount = customerService.changeLikeInfo(requestLikeDto);

        ResponseLikeDto responseLikeDto = new ResponseLikeDto();
        responseLikeDto.setLikeCnt(likeCount);
        responseLikeDto.setLike(requestLikeDto.isLike());

        // 예외 처리 다시 필요
        if(responseLikeDto != null){
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseLikeDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

//    @GetMapping("/like")
//    public ResponseEntity<HttpResponseDto> getLikeDesignerInfo(@PathVariable("customer-seq") int customerSeq){
//
//        List<DesignerSearchDto> designerSearchDtoList = designerSearchService.search2Like(customerSeq);
//
//        if(designerSearchDtoList.size() != 0){
//            ResponseDesignerSearchDto responseDesignerSearchDto = new ResponseDesignerSearchDto();
//            responseDesignerSearchDto.setDesignerListCnt(designerSearchDtoList.size());
//            responseDesignerSearchDto.setDesignerList(designerSearchDtoList);
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseDesignerSearchDto);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//        else{
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }

    @GetMapping("/alert")
    public ResponseEntity<HttpResponseDto> getAlert(@PathVariable("customer-seq") int customerSeq){
        ArrayList<ResponseAlertCustomerDto> responseAlertCustomerDtoList = customerService.getAlertList(customerSeq);

        if(responseAlertCustomerDtoList.size() != 0){
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseAlertCustomerDtoList);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }
}
