package com.chu.designer.controller;
import com.chu.customer.domain.RequestCustomerChangePwdDto;
import com.chu.designer.domain.*;
import com.chu.designer.service.DesignerService;
import com.chu.global.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/designer")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DesignerController {
    private final DesignerService designerService;

    // 회원가입
    @PostMapping(value = "/sign-up")
    public ResponseEntity<HttpResponseDto> signUp(@RequestBody RequestDesignerSignUpDto requestDesignerSignUpDto){

        try{
            // requestDto -> Designer entity 변환
            Designer designer = requestDesignerSignUpDto.toDesignerEntity();
            designerService.signUp(designer);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    // 로그인
    @PostMapping(value = "/sign-in")
    public ResponseEntity<HttpResponseDto> signIn(@RequestBody RequestSignInDto requesSignInDto){

        ResponseDesignerLoginDetailDto responseDesignerLoginDetailDto = null;

        try{
            responseDesignerLoginDetailDto = designerService.signIn(requesSignInDto);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), responseDesignerLoginDetailDto));
    }

    // 아이디 찾기
    @GetMapping(value = "/find-id")
    public ResponseEntity<HttpResponseDto> findId(@RequestParam String name, @RequestParam String email){

        ResponseFindIdDto response = new ResponseFindIdDto();

        try{
            response = designerService.findId(name, email);
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
            response = designerService.findPwd(name, email, id);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), response));
    }

    // 디자이너 비밀번호 변경
    @PutMapping(value = "/change-pwd")
    public ResponseEntity<HttpResponseDto> changePwd(@RequestBody RequestCustomerChangePwdDto param){

        try{
            designerService.changePwd(param);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    // 날짜 별 상담 가능시간 조회
    @GetMapping("/date/{designerSeq}")
    public ResponseEntity<HttpResponseDto> getPossibleTimeOfDate(@PathVariable("designerSeq") int designerSeq, @RequestParam String date){

        List<ResponseTimeStateDto> response = new ArrayList<>();

        try{
            response = designerService.getTimeStateList(designerSeq, date);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), response));
    }

    // 알림 조회
    @GetMapping(value = "/alert/{designerSeq}")
    public ResponseEntity<HttpResponseDto> getAlert(@PathVariable int designerSeq){

        List<AlertDesignerOnLoginDto> alert = new ArrayList<>();

        try{
            alert = designerService.getAlert(designerSeq);

        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), alert));

    }

//    @GetMapping("/date")
//    public ResponseEntity<HttpResponseDto> getPossibleTimeOfDate(@PathVariable("designer_seq") int designerSeq, @RequestParam Date date) {
//        ArrayList<ResponseTimeStateDto> responseTimeStateDtoList = new ArrayList<>();
//
//        responseTimeStateDtoList = designerService.getTimeStateList(designerSeq, date);
//
//        if (responseTimeStateDtoList.size() != 0) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseTimeStateDtoList);
//            return ResponseEntity.ok(httpResponseDto);
//        } else {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
//
//    @GetMapping("/alert")
//    public ResponseEntity<HttpResponseDto> getAlert(@PathVariable("designer_seq") int designerSeq) {
//        ArrayList<ResponseAlertDesignerDto> responseAlertDesignerDtoList = designerService.getAlertList(designerSeq);
//
//        if (responseAlertDesignerDtoList.size() != 0) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseAlertDesignerDtoList);
//            return ResponseEntity.ok(httpResponseDto);
//        } else {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
}
