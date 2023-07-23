package com.chu.customer.repository;

import com.chu.customer.domain.AlertToCustomerDto;

import java.util.ArrayList;

public interface CustomerAlertRepository {
    ArrayList<AlertToCustomerDto> getAlertToCustomer(int customerSeq);

}
