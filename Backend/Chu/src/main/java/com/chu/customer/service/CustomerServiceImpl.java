package com.chu.customer.service;

import com.chu.customer.domain.*;
import com.chu.customer.repository.CustomerRepository;
import com.chu.global.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


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
    public CustomerLoginDetailDto getLoginCustomerDetail(String id) {
        // 이건 서비스 로직에서 db 여러번 접근하는게 나을지도
        return customerRepository.getLoginCustomerDetail(id);
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

    @Override
    public CustomerDetailDto getCustomerDetail(int customerSeq) {
        return customerRepository.getCustomerDetail(customerSeq);
    }

    @Override
    public boolean patchImage(String imgName) {
        return customerRepository.patchImage(imgName);
    }

    @Override
    public CustomerDetailInfoDto getCustomerDetailInfo(int customerSeq) {
        return customerRepository.getCustomerDetailInfo(customerSeq);
    }

    @Override
    public boolean putCustomerDetailInfo(int customerSeq, CustomerDetailChangeDto customerDetailChangeDto) {
        return customerRepository.putCustomerDetailInfo(customerSeq, customerDetailChangeDto);
    }

    @Override
    public ArrayList<AlertCustomerDto> getAlertList(int customerSeq) {
        return customerRepository.getAlertList(customerSeq);
    }

    @Override
    public boolean createAlert(AlertCreateDto alertCreateDto) {
        return customerRepository.createAlert(alertCreateDto);
    }
}
