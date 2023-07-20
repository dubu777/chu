package com.chu.customer.service;

import com.chu.customer.domain.CustomerDetailDto;
import com.chu.customer.domain.CustomerDto;
import com.chu.customer.domain.CustomerSignUpDto;
import com.chu.customer.domain.LikeDto;
import com.chu.customer.repository.CustomerRepository;
import com.chu.global.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{

    private final CustomerRepository customerRepository;

    @Override
    public boolean checkId(String id) {
        return customerRepository.checkId(id);
    }

    @Override
    public boolean checkEmail(String email) {
        return customerRepository.checkEmail(email);
    }

    @Override
    public int signUp(CustomerSignUpDto customerSignUpDto) {
        return customerRepository.signUp(customerSignUpDto);
    }

    @Override
    public boolean signIn(SignInDto signInDto) {
        return customerRepository.signIn(signInDto);
    }

    @Override
    public CustomerDetailDto getCustomerDetail(String id) {
        // 이건 서비스 로직에서 db 여러번 접근하는게 나을지도
        return customerRepository.getCustomerDetail(id);
    }

    @Override
    public String findId(FindIdDto findIdDto) {
        return customerRepository.findId(findIdDto);
    }

    @Override
    public int isValidUser(FindPwdDto findPwdDto) {
        return customerRepository.isValidUser(findPwdDto);
    }

    @Override
    public boolean changePwd(ChangePwdDto changePwdDto) {
        return customerRepository.changePwd(changePwdDto);
    }

    @Override
    public int changeLikeInfo(LikeDto likeDto) {
        return customerRepository.changeLikeInfo(likeDto);
    }
}
