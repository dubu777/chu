package com.chu.designer.controller;
import com.chu.consulting.domain.ConsultingDto;
import com.chu.designer.domain.*;
import com.chu.designer.service.DesignerService;
import com.chu.global.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;

@Slf4j
@RestController
@RequestMapping("/designer")
@RequiredArgsConstructor
public class DesignerController {
    private final DesignerService designerService;

    // 회원 가입
    @PostMapping(value = "/sign-up")
    public ResponseEntity<HttpResponseDto> signUp(@RequestBody RequestDesignerSignUpDto requestDesignerSignUpDto) {
        log.info(requestDesignerSignUpDto.toString());
        boolean isSuccess = designerService.signUp(requestDesignerSignUpDto);

        if (isSuccess) {
            ResponseDesignerLoginDetailDto responseDesignerLoginDetailDto = designerService.getLoginDesignerDetail(requestDesignerSignUpDto.getId());
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseDesignerLoginDetailDto);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    // 로그인
    @PostMapping(value = "/sign-in")
    public ResponseEntity<HttpResponseDto> signIn(@RequestBody RequestSignInDto requestSignInDto) {
        boolean isDesigner = true;

        isDesigner = designerService.signIn(requestSignInDto);

        // 로그인 성공
        if (isDesigner) {
            ResponseDesignerLoginDetailDto responseDesignerLoginDetailDto = designerService.getLoginDesignerDetail(requestSignInDto.getId());
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseDesignerLoginDetailDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        // 로그인 실패
        else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/find-id")
    public ResponseEntity<HttpResponseDto> findId(@RequestParam String name, @RequestParam String email) {

        RequestFindIdDto requestFindIdDto = new RequestFindIdDto();
        requestFindIdDto.setName(name);
        requestFindIdDto.setEmail(email);

        String id = designerService.findId(requestFindIdDto);

        if (id != null) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, id);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/find-pwd")
    public ResponseEntity<HttpResponseDto> findPwd(@RequestParam String id, @RequestParam String name, @RequestParam String email) {

        RequestFindPwdDto requestFindPwdDto = new RequestFindPwdDto();
        requestFindPwdDto.setName(name);
        requestFindPwdDto.setId(id);
        requestFindPwdDto.setEmail(email);

        int seq = designerService.isValidUser(requestFindPwdDto);

        // 존재하는 유저일 경우
        if (seq == 1) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, seq);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @PatchMapping("/change-pwd")
    public ResponseEntity<HttpResponseDto> changePwd(@RequestBody RequestChangePwdDto requestChangePwdDto) {
        boolean isSuccess = designerService.changePwd(requestChangePwdDto);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/date")
    public ResponseEntity<HttpResponseDto> getPossibleTimeOfDate(@PathVariable("designer_seq") int designerSeq, @RequestParam Date date) {
        ArrayList<ResponseTimeStateDto> responseTimeStateDtoList = new ArrayList<>();

        responseTimeStateDtoList = designerService.getTimeStateList(designerSeq, date);

        if (responseTimeStateDtoList.size() != 0) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseTimeStateDtoList);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/alert")
    public ResponseEntity<HttpResponseDto> getAlert(@PathVariable("designer_seq") int designerSeq) {
        ArrayList<ResponseAlertDesignerDto> responseAlertDesignerDtoList = designerService.getAlertList(designerSeq);

        if (responseAlertDesignerDtoList.size() != 0) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseAlertDesignerDtoList);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/time")
    public ResponseEntity<HttpResponseDto> getPossibleReservationTime(@PathVariable("designer-seq") int designerSeq, Date date) {

        ArrayList<TimeDto> possibleReservationTime = designerService.getPossibleReservationTime(designerSeq, date);

        if (possibleReservationTime.size() != 0) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, possibleReservationTime);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }

    }

    @PutMapping("/time")
    public ResponseEntity<HttpResponseDto> updatePossibleReservationTime(@PathVariable("designer-seq") int designerSeq, @RequestBody ReservationTimeDto reservationTimeDto) {

        boolean isSuccess = designerService.updatePossibleReservationTime(designerSeq, reservationTimeDto);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/reservation-list")
    public ResponseEntity<HttpResponseDto> getReservationList(@PathVariable("designer-seq") int designerSeq) {

        ArrayList<ConsultingDto> reservationList = designerService.getReservationList(designerSeq);

        if (reservationList.size() != 0) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, reservationList);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/portfolio")
    public ResponseEntity<HttpResponseDto> getPortfolio(@PathVariable("designer-seq") int designerSeq) {

        ArrayList<ImageDto> portfolioList = designerService.getPortfolio(designerSeq);

        if (portfolioList.size() != 0) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, portfolioList);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @PostMapping("/portfolio")
    public ResponseEntity<HttpResponseDto> postPortfolio(@PathVariable("designer-seq") int designerSeq, @RequestParam String img) {

        boolean isSuccess = designerService.postPortfolioImage(designerSeq, img);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @DeleteMapping("/portfolio")
    public ResponseEntity<HttpResponseDto> deletePortfolio(@PathVariable("designer-seq") int designerSeq, @RequestParam int imageSeq) {

        boolean isSuccess = designerService.deletePortfolioImage(designerSeq, imageSeq);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }
}
