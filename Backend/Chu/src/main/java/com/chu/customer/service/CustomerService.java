package com.chu.customer.service;

import com.chu.customer.domain.*;
import com.chu.global.domain.*;

import java.util.ArrayList;

public interface CustomerService {

    // 아이디 중복체크
    boolean checkId(String id);
    
    // 이메일 중복체크
    boolean checkEmail(String email);
    
    // 고객 회원가입
    boolean signUp(RequestCustomerSignUpDto requestCustomerSignUpDto);
    
    // 고객 로그인
    boolean signIn(RequestSignInDto requestSignInDto);

    // 고객 정보 조회
    CustomerDto getCustomerInfo(String id);
    
    // 고객 로그인 시 정보 조회
    ResponseCustomerLoginDetailDto getLoginCustomerDetail(String id);

    // 고객 아이디 찾기
    String findId(RequestFindIdDto requestFindIdDto);

    int isValidUser(RequestFindPwdDto requestFindPwdDto);

    boolean changePwd(RequestChangePwdDto requestChangePwdDto);

    int changeLikeInfo(RequestLikeDto requestLikeDto);

    boolean putCustomerDetailInfo(int customerSeq, CustomerDetailChangeDto customerDetailChangeDto);

    ArrayList<AlertCustomerDto> getAlertList(int customerSeq);

    boolean createAlert(AlertCreateDto alertCreateDto);

    boolean readAlert(AlertReadDto alertReadDto);
}
