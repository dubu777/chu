package com.chu.designer.controller;

import com.chu.designer.domain.ResponseDesignerMyPageDto;
import com.chu.designer.service.DesignerDetailService;
import com.chu.global.domain.HttpResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
