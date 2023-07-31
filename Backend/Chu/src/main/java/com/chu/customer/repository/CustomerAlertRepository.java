package com.chu.customer.repository;

import com.chu.customer.domain.CustomerAlert;

import java.util.ArrayList;

public interface CustomerAlertRepository {
    ArrayList<CustomerAlert> getAlertToCustomer(int customerSeq);

}
