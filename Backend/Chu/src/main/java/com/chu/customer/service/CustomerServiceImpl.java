package com.chu.customer.service;

import com.chu.customer.domain.CustomerDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{

    // repo 주입

    @Override
    public boolean checkId(String id) {
        boolean isSuccess = true;
        // 로직

        return isSuccess;
    }

    @Override
    public boolean checkEmail(String email) {
        boolean isSuccess = true;

        // 로직

        return isSuccess;
    }

    @Override
    public int signUp(CustomerDto customerDto) {
        int isSuccess = 1;
        // 로직

        //성공시 isSuccess 1 아니면 0이나 -1

        return isSuccess;
    }
}
