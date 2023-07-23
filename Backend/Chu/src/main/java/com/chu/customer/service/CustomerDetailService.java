package com.chu.customer.service;

import com.chu.customer.domain.RequestCustomerDetailChangeDto;
import com.chu.customer.domain.ResponseCustomerDetailInfoDto;
import com.chu.customer.domain.ResponseCustomerDetailDto;

public interface CustomerDetailService {
    // 고객 이미지 수정
    boolean patchImage(String imgName);

    // 마이페이지 들어갈때 가져올 것들
    ResponseCustomerDetailDto getCustomerDetail(int customerSeq);

    // 고객정보 수정 눌렀을때 가져올 것들
    ResponseCustomerDetailInfoDto getCustomerUpdateDetailInfo(int customerSeq);

    // 고객 상세 정보 수정
    boolean putCustomerDetailInfo(int customerSeq, RequestCustomerDetailChangeDto requestCustomerDetailChangeDto);
}
