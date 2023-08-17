package com.chu.global.service;

import com.chu.designer.domain.ResponseMainPageDto;
import com.chu.global.domain.RequestAlertCreateDto;

public interface UserService {

    // 메인페이지 조회
    ResponseMainPageDto getMain();

    // 알림 생성
    void createAlert(RequestAlertCreateDto requestAlertCreateDto);
}
