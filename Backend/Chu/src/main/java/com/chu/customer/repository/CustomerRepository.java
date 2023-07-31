package com.chu.customer.repository;

import com.chu.customer.domain.*;
import com.chu.global.domain.*;

import java.util.ArrayList;

public interface CustomerRepository {

    boolean checkId(String id);

    boolean checkEmail(String email);

    boolean signUp(RequestCustomerSignUpDto requestCustomerSignUpDto);

    boolean signIn(RequestSignInDto requestSignInDto);

    Customer getCustomerInfo(String id);

    String findId(RequestFindIdDto requestFindIdDto);

    ArrayList<ImageDto> getTopStyleByFace(int faceSeq);

    int isValidUser(RequestFindPwdDto requestFindPwdDto);

    boolean changePwd(RequestChangePwdDto requestChangePwdDto);

    int changeLikeInfo(RequestLikeDto requestLikeDto);

    ArrayList<ResponseAlertCustomerDto> getAlertList(int customerSeq);

    boolean createAlert(RequestAlertCreateDto requestAlertCreateDto);

    boolean readAlert(RequestAlertReadDto requestAlertReadDto);
}
