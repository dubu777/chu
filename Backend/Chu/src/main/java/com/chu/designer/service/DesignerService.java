package com.chu.designer.service;

import com.chu.designer.domain.DesignerDetailDto;
import com.chu.designer.domain.DesignerDto;
import com.chu.global.domain.SignInDto;

public interface DesignerService {
    boolean checkId(String id);
    boolean checkEmail(String email);

    int signUp(DesignerDto designerDto);

    int signIn(SignInDto signInDto);

    DesignerDetailDto getDesignerDetail(String id);
}
