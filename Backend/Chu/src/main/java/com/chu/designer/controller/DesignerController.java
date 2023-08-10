package com.chu.designer.controller;
import com.chu.customer.domain.RequestCustomerChangePwdDto;
import com.chu.designer.domain.*;
import com.chu.designer.service.DesignerDetailService;
import com.chu.designer.service.DesignerService;
import com.chu.global.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    private final DesignerDetailService designerDetailService;

    // 회원가입
    @PostMapping(value = "/sign-up", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HttpResponseDto> signUp(@RequestBody RequestDesignerSignUpDto requestDesignerSignUpDto,
                                                  @RequestPart(value = "img") MultipartFile img){

        try{
            // 여기서 디비에 폴더경로 가져오기, 실제 파일 서버 저장 함수
//            String filePath = designerDetailService.getSavedImgFilePathDesignerProfile(img);

            // requestDto -> Designer entity 변환
            Designer designer = requestDesignerSignUpDto.toDesignerEntity();
            designerService.signUp(designer, img);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    // 로그인
    @PostMapping(value = "/sign-in")
    public ResponseEntity<HttpResponseDto> signIn(@RequestBody RequestSignInDto requesSignInDto){

        ResponseUserLoginToken responseDesignerLoginToken = null;

        try{
            responseDesignerLoginToken = designerService.signIn(requesSignInDto);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), responseDesignerLoginToken));
    }

    // 로그인 후 메인페이지
    @GetMapping(value = "/main/{designerSeq}")
    public ResponseEntity<HttpResponseDto> getMainPageInfo(@PathVariable int designerSeq){

        ResponseDesignerLoginDetailDto responseDesignerLoginDetailDto = null;

        try{
            responseDesignerLoginDetailDto = designerService.getMainPageInfo(designerSeq);
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

    // 알림 읽음 처리
    @PutMapping(value = "/alert/{alertSeq}")
    public ResponseEntity<HttpResponseDto> checkAlert(@PathVariable int alertSeq){

        try{
            designerService.checkAlert(alertSeq);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), null));
    }

    // 예약화면 - 디자이너 포트폴리오, 다른 디자이너 랜덤사진 4장 가져오기
    @GetMapping(value = "/reservation/{designerSeq}")
    public ResponseEntity<HttpResponseDto> getReservationPage(@PathVariable int designerSeq){

        ResponseRsvPageDto responseRsvPageDto = null;

        try{
            responseRsvPageDto = designerService.getReservationPage(designerSeq);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), responseRsvPageDto));

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
