package com.chu.customer.service;

import com.chu.customer.domain.CustomerDetailDto;
import com.chu.customer.domain.CustomerDto;
import com.chu.global.domain.SignInDto;

public interface CustomerService {

    boolean checkId(String id);
    boolean checkEmail(String email);
    int signUp(CustomerDto customerDto);

    int signIn(SignInDto signInDto);

    CustomerDetailDto getCustomerDetail(String id);
}
