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
    int signUp(CustomerSignUpDto customerSignUpDto);

    // 고객 로그인 가능 여부 확인
    boolean signIn(SignInDto signInDto);

    // 고객 정보 가져오기
    CustomerDto getCustomerInfo(String id);

    ArrayList<ImageDto> getTopStyleByFace(int faceSeq);

    String findId(FindIdDto findIdDto);

    int isValidUser(FindPwdDto findPwdDto);

    boolean changePwd(ChangePwdDto changePwdDto);

    int changeLikeInfo(LikeDto likeDto);

    CustomerDetailDto getCustomerDetail(int customerSeq);

    boolean patchImage(String imgName);

    CustomerDetailInfoDto getCustomerDetailInfo(int customerSeq);

    boolean putCustomerDetailInfo(int customerSeq, CustomerDetailChangeDto customerDetailChangeDto);

    ArrayList<AlertCustomerDto> getAlertList(int customerSeq);

    boolean createAlert(AlertCreateDto alertCreateDto);

    boolean readAlert(AlertReadDto alertReadDto);
}
