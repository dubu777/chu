package com.chu.customer.service;

import com.chu.customer.domain.CustomerDto;

public interface CustomerService {

    boolean checkId(String id);
    boolean checkEmail(String email);
    int signUp(CustomerDto customerDto);

}
