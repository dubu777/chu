package com.chu.customer.service;

import com.chu.customer.domain.ResponseCustomerDetailDto;

public interface CustomerDetailService {
    // 고객 이미지 수정
    boolean patchImage(String imgName);

    // 고객 정보 가져오기
    ResponseCustomerDetailDto getCustomerDetail(int customerSeq);
}
