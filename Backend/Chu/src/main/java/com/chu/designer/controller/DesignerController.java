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
import java.io.IOException;
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
    @PostMapping(value = "/sign-up")
    public ResponseEntity<HttpResponseDto> signUp(@RequestBody RequestDesignerSignUpDto requestDesignerSignUpDto){

        int designerSeq = -1;
        try{
            // requestDto -> Designer entity 변환
            Designer designer = requestDesignerSignUpDto.toDesignerEntity();
            designerSeq = designerService.signUp(designer);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), designerSeq));
    }

    @PostMapping(value = "/sign-up/img/{designer-seq}")
    public ResponseEntity<HttpResponseDto> signUpImg(@PathVariable("designer-seq") int designerSeq, @RequestPart("img") MultipartFile file){
        String uploadFileName = "";

        try {
            // 여기서 디비에 폴더경로 가져오기, 실제 파일 서버 저장 함수

            // 이게 사실상 그냥 저장하는거임 filePath는 쓸 일도 없음 왜냐면 디비에 그냥 똑같이 저장할꺼임 머리 아파서

            // 원래 여기서 https://i9b111.q.ssafy.io/designer-profile/  fileName 으로 저장해놓으면 프론트에서 편할껀데

            // 이미 내가 프론트에서 저거 roor로 파일명만 넣어놔서 이거 또 바꾸면 할 일이 또 많아져서 그냥 냅둘게
            uploadFileName = designerDetailService.getSavedImgFilePathDesignerProfile(file);

            designerDetailService.patchImg(designerSeq, uploadFileName);
        } catch (IOException e) {
            e.printStackTrace();
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }

        HttpResponseDto httpResponseDto = new HttpResponseDto(200, uploadFileName);
        return ResponseEntity.ok(httpResponseDto);
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
