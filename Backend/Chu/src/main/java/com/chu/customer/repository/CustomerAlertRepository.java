package com.chu.customer.repository;

import com.chu.customer.domain.AlertToCustomerDto;

import java.util.ArrayList;

public interface CustomerAlertRepository {
    // 고객 알림 정보 가져오기
    ArrayList<AlertToCustomerDto> getAlertToCustomer(int customerSeq);

}
