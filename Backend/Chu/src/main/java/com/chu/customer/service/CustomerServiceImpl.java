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

        if(isSuccess) {
            return true;
        }
        else{
            return false;
        }
    }

    @Override
    public boolean checkEmail(String email) {
        return false;
    }

    @Override
    public int signUp(CustomerDto customerDto) {
        return 0;
    }
}
