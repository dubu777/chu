package com.chu.designer.controller;
import com.chu.designer.domain.DesignerDto;
import com.chu.designer.service.DesignerService;
import com.chu.global.domain.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class DesignerController {
    private final DesignerService designerService;

    // 로직들 global로 빼서 global 에서 customer, designer 주입해서 쓸까 고민중
    // 아이디 중복확인
    @GetMapping(value = "/designer/check-id")
    public ResponseEntity<ResponseDto> checkId(@RequestParam String id){
        log.info("id = {id}", id);
        boolean isSuccess = designerService.checkId(id);

        if(isSuccess){
            ResponseDto responseDto = new ResponseDto(200, true);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(200, false);
            return ResponseEntity.ok(responseDto);
        }
    }

    // 이메일 중복 확인
    @GetMapping(value = "/designer/check-email")
    public ResponseEntity<ResponseDto> checkEmail(@RequestParam String email){
        log.info("email = {}", email);
        boolean isSuccess = designerService.checkEmail(email);

        if(isSuccess){
            ResponseDto responseDto = new ResponseDto(200, true);
            return ResponseEntity.ok(responseDto);
        }
        else{
            ResponseDto responseDto = new ResponseDto(200, false);
            return ResponseEntity.ok(responseDto);
        }
    }

    @PostMapping(value = "/designer/sign-up")
    public ResponseEntity<ResponseDto> signUp(@RequestBody DesignerDto designerDto) {
        log.info(designerDto.toString());
        int isSuccess = designerService.signUp(designerDto);

        if(isSuccess == 1){

        }
    }
}
