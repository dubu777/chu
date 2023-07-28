package com.chu.customer.repository;

import com.chu.customer.domain.AlertToCustomer;

import java.util.ArrayList;

public interface CustomerAlertRepository {
    ArrayList<AlertToCustomer> getAlertToCustomer(int customerSeq);

}
