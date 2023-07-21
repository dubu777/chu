package com.chu.customer.repository;

import com.chu.customer.domain.*;
import com.chu.global.domain.*;

import java.util.ArrayList;

public interface CustomerRepository {

    // 아이디 중복 검사
    boolean checkId(String id);

    // 이메일 중복 검사
    boolean checkEmail(String email);

    // 고객 회원 가입
    boolean signUp(RequestCustomerSignUpDto requestCustomerSignUpDto);

    // 고객 로그인 가능 여부 확인
    boolean signIn(RequestSignInDto requestSignInDto);

    // 고객 정보 가져오기
    CustomerDto getCustomerInfo(String id);

    // 고객 아이디 찾기
    String findId(RequestFindIdDto requestFindIdDto);

    ArrayList<ImageDto> getTopStyleByFace(int faceSeq);

    int isValidUser(RequestFindPwdDto requestFindPwdDto);

    boolean changePwd(RequestChangePwdDto requestChangePwdDto);

    int changeLikeInfo(RequestLikeDto requestLikeDto);


    ArrayList<ResponseAlertCustomerDto> getAlertList(int customerSeq);

    boolean createAlert(RequestAlertCreateDto requestAlertCreateDto);

    boolean readAlert(AlertReadDto alertReadDto);
}
