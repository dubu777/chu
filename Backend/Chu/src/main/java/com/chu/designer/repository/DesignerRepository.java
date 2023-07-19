package com.chu.designer.repository;

import com.chu.designer.domain.DesignerDetailDto;
import com.chu.designer.domain.DesignerDto;
import com.chu.designer.domain.DesignerSignUpDto;
import com.chu.global.domain.ChangePwdDto;
import com.chu.global.domain.FindIdDto;
import com.chu.global.domain.FindPwdDto;
import com.chu.global.domain.SignInDto;

public interface DesignerRepository {
    boolean checkId(String id);
    boolean checkEmail(String email);

    int signUp(DesignerSignUpDto designerSignUpDto);

    boolean signIn(SignInDto signInDto);

    DesignerDetailDto getDesignerDetail(String id);

    String findId(FindIdDto findIdDto);

    int isValidUser(FindPwdDto findPwdDto);

    boolean changePwd(ChangePwdDto changePwdDto);
}
