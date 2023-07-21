package com.chu.customer.controller;

import com.chu.customer.domain.*;
import com.chu.customer.service.CustomerService;
import com.chu.designer.domain.DesignerSearchDto;
import com.chu.designer.domain.DesignerSearchResponseDto;
import com.chu.designer.service.DesignerSearchService;
import com.chu.global.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

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
    public ResponseEntity<HttpResponseDto> changeLikeInfo(@RequestBody LikeDto likeDto){

        int likeCount = customerService.changeLikeInfo(likeDto);

        LikeResponseDto likeResponseDto = new LikeResponseDto();
        likeResponseDto.setLikeCnt(likeCount);
        likeResponseDto.setIsLike(likeDto.getIsLike());

        // 예외 처리 다시 필요
        if(likeResponseDto != null){
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, likeResponseDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/")
    public ResponseEntity<HttpResponseDto> getCustomerDetail(@PathVariable("customer_seq") int customerSeq) {

        CustomerDetailDto customerDetailDto = customerService.getCustomerDetail(customerSeq);

        if(customerDetailDto != null){
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, customerDetailDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @PatchMapping("/img")
    public ResponseEntity<HttpResponseDto> patchImg(@RequestParam("img") String imgName){

        boolean isSuccess = customerService.patchImage(imgName);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, imgName);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/detail")
    public ResponseEntity<HttpResponseDto> getCustomerDetailInfo(@PathVariable("customer_seq") int customerSeq){
        CustomerDetailInfoDto customerDetailInfoDto = customerService.getCustomerDetailInfo(customerSeq);

        if (customerDetailInfoDto != null) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, customerDetailInfoDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @PutMapping("/detail")
    public ResponseEntity<HttpResponseDto> putCustomerDetailInfo(@PathVariable("customer_seq") int customerSeq, @RequestBody CustomerDetailChangeDto customerDetailChangeDto) {
        boolean isSuccess = customerService.putCustomerDetailInfo(customerSeq, customerDetailChangeDto);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/like")
    public ResponseEntity<HttpResponseDto> getLikeDesignerInfo(@PathVariable("customer_seq") int customerSeq){

        ArrayList<DesignerSearchDto> designerSearchDtoList = designerSearchService.search2Like(customerSeq);

        if(designerSearchDtoList.size() != 0){
            DesignerSearchResponseDto designerSearchResponseDto = new DesignerSearchResponseDto();
            designerSearchResponseDto.setDesignerListCnt(designerSearchDtoList.size());
            designerSearchResponseDto.setDesignerList(designerSearchDtoList);
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, designerSearchResponseDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("alert")
    public ResponseEntity<HttpResponseDto> getAlert(@PathVariable("designer_seq") int designerSeq){
        ArrayList<AlertCustomerDto> AlertCustomerDtoList = customerService.getAlertList(designerSeq);

        if(AlertCustomerDtoList.size() != 0){
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }
}
