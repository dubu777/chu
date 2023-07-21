package com.chu.customer.service;

import com.chu.customer.repository.CustomerDetailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomerDetailServiceImpl implements CustomerDetailService {

    private final CustomerDetailRepository customerDetailRepository;

    @Override
    public boolean patchImage(String imgName) {
        return customerDetailRepository.patchImage(imgName);
    }
}
