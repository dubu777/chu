package com.chu.global.controller;

import com.chu.customer.domain.CustomerDetailDto;
import com.chu.customer.service.CustomerService;
import com.chu.designer.domain.DesignerDetailDto;
import com.chu.designer.service.DesignerService;
import com.chu.global.domain.ResponseDto;
import com.chu.global.domain.SignInDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class GlobalController {

    private final CustomerService customerService;
    private final DesignerService designerService;


}
