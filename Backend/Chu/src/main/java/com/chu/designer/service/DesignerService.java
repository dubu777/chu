package com.chu.designer.service;

import com.chu.consulting.domain.ConsultingDto;
import com.chu.designer.domain.*;
import com.chu.global.domain.*;

import java.sql.Date;
import java.util.ArrayList;

public interface DesignerService {
    // 아이디 중복체크
    boolean checkId(String id);

    //이메일 중복체크
    boolean checkEmail(String email);

    // 디자이너 회원가입
    boolean signUp(RequestDesignerSignUpDto requestDesignerSignUpDto);

    // 디자이너 로그인
    boolean signIn(RequestSignInDto requestSignInDto);

    // 디자이너 정보 조회
    DesignerDto getDesignerInfo(String id);

    // 디자이너 로그인 시 정보 조회
    ResponseDesignerLoginDetailDto getLoginDesignerDetail(String id);

    // 디자이너 아이디 찾기
    String findId(RequestFindIdDto requestFindIdDto);

    int isValidUser(RequestFindPwdDto requestFindPwdDto);

    boolean changePwd(RequestChangePwdDto requestChangePwdDto);

    ArrayList<ResponseTimeStateDto> getTimeStateList(int designerSeq, Date date);

    ArrayList<ResponseAlertDesignerDto> getAlertList(int designerSeq);

    boolean createAlert(RequestAlertCreateDto requestAlertCreateDto);

    boolean readAlert(RequestAlertReadDto requestAlertReadDto);

    ArrayList<TimeDto> getPossibleReservationTime(int designerSeq, Date date);

    ArrayList<ConsultingDto> getReservationList(int designerSeq);

    ArrayList<ImageDto> getPortfolio(int designerSeq);

    boolean deletePortfolioImage(int designerSeq, int imageSeq);

    boolean postPortfolioImage(int designerSeq, String img);

}
