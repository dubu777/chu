package com.chu.designer.service;

import com.chu.designer.domain.DesignerDetailDto;
import com.chu.designer.domain.DesignerDto;
import com.chu.global.domain.SignInDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class DesignerServiceImpl implements DesignerService{
    // repo 주입
    @Override
    public boolean checkId(String id) {
        boolean isSuccess = true;
        // 로직

        return isSuccess;
    }

    @Override
    public boolean checkEmail(String email) {
        boolean isSuccess = true;
        // 로직

        return isSuccess;
    }

    @Override
    public int signUp(DesignerDto designerDto) {
        int isSuccess = 1;

        // 로직

        // 성공 시 row 1 반환

        return isSuccess;
    }

    // 로그인 실패는 0, 로그인
    @Override
    public int signIn(SignInDto signInDto) {
        int isSuccess = 0;

        // 로직

        // 성공시 2 반환
        return isSuccess;
    }

    @Override
    public DesignerDetailDto getDesignerDetail(String id) {
        DesignerDetailDto designerDetailDto = new DesignerDetailDto();


        return designerDetailDto;
    }
}
