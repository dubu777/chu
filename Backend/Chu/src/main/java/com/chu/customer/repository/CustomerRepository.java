package com.chu.customer.repository;

import com.chu.customer.domain.*;
import com.chu.global.domain.*;

import java.util.ArrayList;

public interface CustomerRepository {

    boolean checkId(String id);
    boolean checkEmail(String email);
    int signUp(CustomerSignUpDto customerSignUpDto);

    boolean signIn(SignInDto signInDto);

    CustomerLoginDetailDto getLoginCustomerDetail(String id);

    String findId(FindIdDto findIdDto);

    int isValidUser(FindPwdDto findPwdDto);

    boolean changePwd(ChangePwdDto changePwdDto);

    int changeLikeInfo(LikeDto likeDto);

    CustomerDetailDto getCustomerDetail(int customerSeq);

    boolean patchImage(String imgName);

    CustomerDetailInfoDto getCustomerDetailInfo(int customerSeq);

    boolean putCustomerDetailInfo(int customerSeq, CustomerDetailChangeDto customerDetailChangeDto);

    ArrayList<AlertCustomerDto> getAlertList(int customerSeq);
}
