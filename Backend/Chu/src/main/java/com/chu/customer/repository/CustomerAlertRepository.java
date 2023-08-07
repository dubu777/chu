package com.chu.customer.repository;

import com.chu.customer.domain.CustomerAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;

public interface CustomerAlertRepository extends JpaRepository<CustomerAlert, Integer> {

//    ArrayList<CustomerAlert> getAlertToCustomer(int customerSeq);
    List<CustomerAlert> getCustomerAlertByCustomerSeq(int customerSeq);

    // 알림 읽음 처리
    @Modifying
    @Query("UPDATE CustomerAlert a SET a.isCheck = true WHERE a.seq = :alertSeq")
    void checkAlert(int alertSeq);

}
