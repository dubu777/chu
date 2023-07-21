package com.chu.designer.service;

import com.chu.designer.domain.*;
import com.chu.global.domain.*;

import java.sql.Date;
import java.util.ArrayList;

public interface DesignerService {
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

    boolean patchIntroduction(int designerSeq, String introduction);

    boolean patchImg(int designerSeq, String img);

    DesignerMyPageUpdateShowDto getDesignerMyPageUpdateInfo(int designerSeq);

    boolean updateDesignerInfo(int designerSeq, DesignerInfoUpdateDto designerInfoUpdateDto);


    boolean updatePossibleReservationTime(int designerSeq, ReservationTimeDto reservationTimeDto);
}
