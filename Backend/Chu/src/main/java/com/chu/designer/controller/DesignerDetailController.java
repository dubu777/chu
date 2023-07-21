package com.chu.designer.controller;

import com.chu.designer.domain.ResponseDesignerMyPageDto;
import com.chu.designer.service.DesignerDetailService;
import com.chu.global.domain.HttpResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/designer/detail")
@RequiredArgsConstructor
public class DesignerDetailController {

    private final DesignerDetailService designerDetailService;

    @GetMapping("/mypage")
    public ResponseEntity<HttpResponseDto> getMyPageInfo(@PathVariable("designer_seq") int designerSeq) {
        ResponseDesignerMyPageDto responseDesignerMyPageDto = designerDetailService.getMyPageInfo(designerSeq);

        if (responseDesignerMyPageDto != null) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseDesignerMyPageDto);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @PatchMapping("/introduction")
    public ResponseEntity<HttpResponseDto> patchIntroduction(@PathVariable("designer_seq") int designerSeq, @RequestParam String introduction) {

        boolean isSuccess = designerDetailService.patchIntroduction(designerSeq, introduction);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, introduction);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

}
