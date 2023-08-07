package com.chu.customer.controller;

import com.chu.customer.domain.*;
import com.chu.customer.service.CustomerService;
import com.chu.designer.domain.DesignerSearchDto;
import com.chu.designer.domain.ResponseDesignerSearchDto;
import com.chu.designer.service.DesignerSearchService;
import com.chu.global.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    private final CustomerService customerService;
    private final DesignerSearchService designerSearchService;

    // 회원가입
    @PostMapping(value = "/sign-up")
    public ResponseEntity<HttpResponseDto> signUp(@RequestBody RequestCustomerSignUpDto requestCustomerSignUpDto){

        try{
            // requestDto -> Customer entity로 변환
            Customer customer = requestCustomerSignUpDto.toCustomerEntity();
            customerService.signUp(customer);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    // 로그인
    @PostMapping(value = "/sign-in")
    public ResponseEntity<HttpResponseDto> signIn(@RequestBody RequestSignInDto requestSignInDto){

        // null 이면 일치하는 회원 없음 return
        // null 아니면 아래 로직 수행
        ResponseCustomerLoginDetailDto responseCustomerLoginDetailDto = null;

        try{
            responseCustomerLoginDetailDto = customerService.signIn(requestSignInDto);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), responseCustomerLoginDetailDto));
    }

    // 아이디 찾기
    @GetMapping(value = "/find-id")
    public ResponseEntity<HttpResponseDto> findId(@RequestParam String name, @RequestParam String email){

        ResponseFindIdDto response = new ResponseFindIdDto();

        try{
            response = customerService.findId(name, email);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), response));
    }

    // 비밀번호 찾기
    @GetMapping(value = "/find-pwd")
    public ResponseEntity<HttpResponseDto> findPwd(@RequestParam String name, @RequestParam String email, @RequestParam String id){

        ResponseFindPwdDto response = new ResponseFindPwdDto();

        try{
            response = customerService.findPwd(name, email, id);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), response));
    }

    // 비밀번호 변경
    @PutMapping(value = "/change-pwd")
    public ResponseEntity<HttpResponseDto> changePwd(@RequestBody RequestCustomerChangePwdDto param){

        try{
            customerService.changePwd(param);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    // 알림 조회
    @GetMapping(value = "/alert/{customerSeq}")
    public ResponseEntity<HttpResponseDto> getAlert(@PathVariable int customerSeq){

        List<AlertCustomerOnLoginDto> alert = new ArrayList<>();

        try{
            alert = customerService.getAlert(customerSeq);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), alert));
    }

    // 알림 읽음 처리
    @PutMapping(value = "/alert/{alertSeq}")
    public ResponseEntity<HttpResponseDto> checkAlert(@PathVariable int alertSeq){

        try{
            customerService.checkAlert(alertSeq);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

//
//    @PostMapping("/like")
//    public ResponseEntity<HttpResponseDto> changeLikeInfo(@RequestBody RequestLikeDto requestLikeDto){
//
//        int likeCount = customerService.changeLikeInfo(requestLikeDto);
//
//        ResponseLikeDto responseLikeDto = new ResponseLikeDto();
//        responseLikeDto.setLikeCnt(likeCount);
//        responseLikeDto.setLike(requestLikeDto.isLike());
//
//        // 예외 처리 다시 필요
//        if(responseLikeDto != null){
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseLikeDto);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//        else{
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
//
//    @GetMapping("/like")
//    public ResponseEntity<HttpResponseDto> getLikeDesignerInfo(@PathVariable("customer-seq") int customerSeq){
//
//        ArrayList<DesignerSearchDto> designerSearchDtoList = designerSearchService.search2Like(customerSeq);
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
//
//    @GetMapping("/alert")
//    public ResponseEntity<HttpResponseDto> getAlert(@PathVariable("customer-seq") int customerSeq){
//        ArrayList<ResponseAlertCustomerDto> responseAlertCustomerDtoList = customerService.getAlertList(customerSeq);
//
//        if(responseAlertCustomerDtoList.size() != 0){
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseAlertCustomerDtoList);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//        else{
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
}
