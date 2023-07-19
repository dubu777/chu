package com.chu.designer.controller;
import com.chu.designer.domain.DesignerDetailDto;
import com.chu.designer.domain.DesignerDto;
import com.chu.designer.service.DesignerService;
import com.chu.global.domain.FindIdDto;
import com.chu.global.domain.FindPwdDto;
import com.chu.global.domain.ResponseDto;
import com.chu.global.domain.SignInDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Slf4j
@RestController
@RequiredArgsConstructor
public class DesignerController {
    private final DesignerService designerService;

    // 회원 가입
    @PostMapping(value = "/designer/sign-up")
    public ResponseEntity<ResponseDto> signUp(@RequestBody DesignerDto designerDto) {
        log.info(designerDto.toString());
        int isSuccess = designerService.signUp(designerDto);

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
    @PostMapping(value = "/designer/sign-in")
    public ResponseEntity<ResponseDto> signIn(@RequestBody SignInDto signInDto){
        boolean isDesigner = true;

        isDesigner = designerService.signIn(signInDto);

        // 로그인 성공
        if(isDesigner){
            DesignerDetailDto designerDetailDto = designerService.getDesignerDetail(signInDto.getId());
            ResponseDto responseDto = new ResponseDto(200, designerDetailDto);
            return ResponseEntity.ok(responseDto);
        }
        // 로그인 실패
        else{
            ResponseDto responseDto = new ResponseDto(204, null);
            return ResponseEntity.ok(responseDto);
        }
    }

    @GetMapping("/designer/find-id")
    public ResponseEntity<ResponseDto> findId(@RequestParam String name, @RequestParam String email){

        FindIdDto findIdDto = new FindIdDto();
        findIdDto.setName(name);
        findIdDto.setEmail(email);

        String id = designerService.findId(findIdDto);

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

    @GetMapping("/designer/find-pwd")
    public ResponseEntity<ResponseDto> findPwd(@RequestParam String id, @RequestParam String name, @RequestParam String email){

        FindPwdDto findPwdDto = new FindPwdDto();
        findPwdDto.setName(name);
        findPwdDto.setId(id);
        findPwdDto.setEmail(email);

        int seq = designerService.isValidUser(findPwdDto);

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
}
