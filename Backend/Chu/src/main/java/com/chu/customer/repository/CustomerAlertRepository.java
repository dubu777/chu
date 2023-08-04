package com.chu.customer.repository;

import com.chu.customer.domain.CustomerAlert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;

public interface CustomerAlertRepository extends JpaRepository<CustomerAlert, Integer> {

//    ArrayList<CustomerAlert> getAlertToCustomer(int customerSeq);
    List<CustomerAlert> getCustomerAlertBySeq(int customerSeq);


}
