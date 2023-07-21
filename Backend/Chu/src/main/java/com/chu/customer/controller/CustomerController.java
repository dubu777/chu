package com.chu.customer.controller;

import com.chu.customer.domain.*;
import com.chu.customer.service.CustomerService;
import com.chu.designer.domain.DesignerSearchDto;
import com.chu.designer.domain.DesignerSearchResponseDto;
import com.chu.designer.service.DesignerSearchService;
import com.chu.designer.service.DesignerService;
import com.chu.global.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;

@Slf4j
@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;
    private final DesignerSearchService designerSearchService;
    
    // 회원 가입
    @PostMapping(value = "/sign-up")
    public ResponseEntity<ResponseDto> signUp(@RequestBody CustomerSignUpDto customerSignUpDto){
        log.info(customerSignUpDto.toString());
        int isSuccess = customerService.signUp(customerSignUpDto);

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
            CustomerLoginDetailDto customerLoginDetailDto = customerService.getLoginCustomerDetail(signInDto.getId());
            ResponseDto responseDto = new ResponseDto(200, customerLoginDetailDto);
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

    @PostMapping("/like")
    public ResponseEntity<ResponseDto> changeLikeInfo(@RequestBody LikeDto likeDto){

        int likeCount = customerService.changeLikeInfo(likeDto);

        LikeResponseDto likeResponseDto = new LikeResponseDto();
        likeResponseDto.setLikeCnt(likeCount);
        likeResponseDto.setIsLike(likeDto.getIsLike());

        // 예외 처리 다시 필요
        if(likeResponseDto != null){
            ResponseDto responseDto = new ResponseDto(200, likeResponseDto);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @GetMapping("/")
    public ResponseEntity<ResponseDto> getCustomerDetail(@PathVariable("customer_seq") int customerSeq) {

        CustomerDetailDto customerDetailDto = customerService.getCustomerDetail(customerSeq);

        if(customerDetailDto != null){
            ResponseDto responseDto = new ResponseDto(200, customerDetailDto);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @PatchMapping("/img")
    public ResponseEntity<ResponseDto> patchImg(@RequestParam("img") String imgName){

        boolean isSuccess = customerService.patchImage(imgName);

        if (isSuccess) {
            ResponseDto responseDto = new ResponseDto(200, imgName);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @GetMapping("/detail")
    public ResponseEntity<ResponseDto> getCustomerDetailInfo(@PathVariable("customer_seq") int customerSeq){
        CustomerDetailInfoDto customerDetailInfoDto = customerService.getCustomerDetailInfo(customerSeq);

        if (customerDetailInfoDto != null) {
            ResponseDto responseDto = new ResponseDto(200, customerDetailInfoDto);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @PutMapping("/detail")
    public ResponseEntity<ResponseDto> putCustomerDetailInfo(@PathVariable("customer_seq") int customerSeq, @RequestBody CustomerDetailChangeDto customerDetailChangeDto) {
        boolean isSuccess = customerService.putCustomerDetailInfo(customerSeq, customerDetailChangeDto);

        if (isSuccess) {
            ResponseDto responseDto = new ResponseDto(200, null);
            return ResponseEntity.ok(responseDto);
        } else {
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @GetMapping("/like")
    public ResponseEntity<ResponseDto> getLikeDesignerInfo(@PathVariable("customer_seq") int customerSeq){

        ArrayList<DesignerSearchDto> designerSearchDtoList = designerSearchService.search2Like(customerSeq);

        if(designerSearchDtoList.size() != 0){
            DesignerSearchResponseDto designerSearchResponseDto = new DesignerSearchResponseDto();
            designerSearchResponseDto.setDesignerListCnt(designerSearchDtoList.size());
            designerSearchResponseDto.setDesignerList(designerSearchDtoList);
            ResponseDto responseDto = new ResponseDto(200, designerSearchResponseDto);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @GetMapping("alert")
    public ResponseEntity<ResponseDto> getAlert(@PathVariable("designer_seq") int designerSeq){
        ArrayList<AlertCustomerDto> AlertCustomerDtoList = customerService.getAlertList(designerSeq);

        if(AlertCustomerDtoList.size() != 0){
            ResponseDto responseDto = new ResponseDto(200, null);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }
}
