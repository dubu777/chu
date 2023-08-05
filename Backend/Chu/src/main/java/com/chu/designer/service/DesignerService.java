package com.chu.designer.service;

import com.chu.designer.domain.*;
import com.chu.global.domain.*;

import java.sql.Date;
import java.util.ArrayList;

public interface DesignerService {

    // 아이디 중복체크
    boolean checkId(String id);

    // 이메일 중복체크
    boolean checkEmail(String email);

    // 디자이너 회원가입
    void signUp(Designer designer);

    // 디자이너 로그인
    ResponseDesignerLoginDetailDto signIn(RequestSignInDto requestSignInDto);
//
//    // 디자이너 회원가입
//    boolean signUp(RequestDesignerSignUpDto requestDesignerSignUpDto);
//
//    // 디자이너 로그인
//    boolean signIn(RequestSignInDto requestSignInDto);
//
//    // 디자이너 정보 조회
//    Designer getDesignerInfo(String id);
//
//    // 디자이너 로그인 시 정보 조회
//    ResponseDesignerLoginDetailDto getLoginDesignerDetail(String id);
//
//    // 디자이너 아이디 찾기
//    String findId(RequestFindIdDto requestFindIdDto);
//
//    // 디자이너 유효성 조회
//    int isValidUser(RequestFindPwdDto requestFindPwdDto);
//
//    // 디자이너 비밀번호 변경
//    boolean changePwd(RequestChangePwdDto requestChangePwdDto);
//
//    // 디자이너 시간상태리스트 조회
//    ArrayList<ResponseTimeStateDto> getTimeStateList(int designerSeq, Date date);
//
//    // 디자이너 알림 조회
//    ArrayList<ResponseAlertDesignerDto> getAlertList(int designerSeq);
//
//    // 디자이너 알림 생성
//    boolean createAlert(RequestAlertCreateDto requestAlertCreateDto);
//
//    // 디자이너 알림 읽음 여부 수정
//    boolean readAlert(RequestAlertReadDto requestAlertReadDto);
}
