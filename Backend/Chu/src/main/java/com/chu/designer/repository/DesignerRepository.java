package com.chu.designer.repository;

import com.chu.designer.domain.*;
import com.chu.global.domain.*;

import java.sql.Date;
import java.util.ArrayList;

public interface DesignerRepository {
    boolean checkId(String id);

    boolean checkEmail(String email);

    boolean signUp(RequestDesignerSignUpDto requestDesignerSignUpDto);

    boolean signIn(RequestSignInDto requestSignInDto);

    DesignerDto getDesignerInfo(String id);

    String findId(RequestFindIdDto requestFindIdDto);

    int isValidUser(RequestFindPwdDto requestFindPwdDto);

    boolean changePwd(RequestChangePwdDto requestChangePwdDto);

    ArrayList<ResponseTimeStateDto> getTimeStateList(int designerSeq, Date date);

    ArrayList<ResponseAlertDesignerDto> getAlertList(int designerSeq);

    boolean createAlert(RequestAlertCreateDto requestAlertCreateDto);

    boolean readAlert(RequestAlertReadDto requestAlertReadDto);

    ArrayList<ResponseBestDesignerDto> getBestDesigners();
}
