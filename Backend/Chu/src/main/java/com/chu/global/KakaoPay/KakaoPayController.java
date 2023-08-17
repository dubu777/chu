package com.chu.global.KakaoPay;

import com.chu.global.KakaoPay.domain.KakaoPayApprovalDto;
import com.chu.global.domain.HttpResponseDto;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller()
public class KakaoPayController {

    @Setter(onMethod_ = @Autowired)
    private KakaoPayService kakaoPayService;

    @PostMapping ("/kakaoPay")
    public ResponseEntity<HttpResponseDto> kakaoPay(){
            String returnValue = "";
        try{
            returnValue = kakaoPayService.kakaoPayReady();
        } catch(Exception e){
            e.printStackTrace();
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), returnValue));

    }

    @GetMapping("/paySuccess")
    public ResponseEntity<HttpResponseDto> paySuccess(@RequestParam("pg_token") String pg_token){

        KakaoPayApprovalDto response = null;

        try{
            response = kakaoPayService.kakaoPayInfo(pg_token);
        } catch(Exception e){
            e.printStackTrace();
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), response));
    }

}
