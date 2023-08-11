package com.chu.designer.service;

import com.chu.customer.domain.RequestCustomerChangePwdDto;
import com.chu.designer.domain.*;
import com.chu.global.domain.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public interface DesignerService {

    // 아이디 중복체크
    boolean checkId(String id);

    // 이메일 중복체크
    boolean checkEmail(String email);

    // 디자이너 회원가입
    int signUp(Designer designer);


    // 디자이너 로그인
    ResponseUserLoginToken signIn(RequestSignInDto requestSignInDto);

    // 로그인 후 메인페이지 정보
    ResponseDesignerLoginDetailDto getMainPageInfo(int designerSeq);

    // 디자이너 아이디 찾기
    ResponseFindIdDto findId(String name, String email);

    // 디자이너 비밀번호 찾기
    ResponseFindPwdDto findPwd(String name, String email, String id);

    // 디자이너 비밀번호 변경
    void changePwd(RequestCustomerChangePwdDto param);

    // 날짜 별 상담 가능시간 조회
    List<ResponseTimeStateDto> getTimeStateList(int designerSeq, String date);

    // 디자이너 알림 조회
    List<AlertDesignerOnLoginDto> getAlert(int designerSeq);

    // 디자이너 알림 읽음 처리
    void checkAlert(int alertSeq);

    // 예약화면 - 디자이너 포트폴리오, 다른 디자이너 랜덤사진 4장 가져오기
    ResponseRsvPageDto getReservationPage(int designerSeq);

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
