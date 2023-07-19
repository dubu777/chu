package com.chu.designer.service;

import com.chu.designer.domain.DesignerDetailDto;
import com.chu.designer.domain.DesignerDto;
import com.chu.global.domain.ChangePwdDto;
import com.chu.global.domain.FindIdDto;
import com.chu.global.domain.FindPwdDto;
import com.chu.global.domain.SignInDto;

public interface DesignerService {
    boolean checkId(String id);
    boolean checkEmail(String email);

    int signUp(DesignerDto designerDto);

    boolean signIn(SignInDto signInDto);

    DesignerDetailDto getDesignerDetail(String id);

    String findId(FindIdDto findIdDto);

    int isValidUser(FindPwdDto findPwdDto);

    boolean changePwd(ChangePwdDto changePwdDto);
}
