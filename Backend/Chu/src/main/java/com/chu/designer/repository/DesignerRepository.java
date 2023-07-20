package com.chu.designer.repository;

import com.chu.designer.domain.DesignerDetailDto;
import com.chu.designer.domain.DesignerMyPageDto;
import com.chu.designer.domain.DesignerSignUpDto;
import com.chu.global.domain.*;

import java.sql.Date;
import java.util.ArrayList;

public interface DesignerRepository {
    boolean checkId(String id);
    boolean checkEmail(String email);

    int signUp(DesignerSignUpDto designerSignUpDto);

    boolean signIn(SignInDto signInDto);

    DesignerDetailDto getDesignerDetail(String id);

    String findId(FindIdDto findIdDto);

    int isValidUser(FindPwdDto findPwdDto);

    boolean changePwd(ChangePwdDto changePwdDto);

    ArrayList<TimeStateDto> getTimeStateList(int designerSeq, Date date);

    ArrayList<AlertDesignerDto> getAlertList(int designerSeq);

    boolean createAlert(AlertCreateDto alertCreateDto);

    boolean readAlert(AlertReadDto alertReadDto);

    DesignerMyPageDto getMyPageInfo(int designerSeq);
}
