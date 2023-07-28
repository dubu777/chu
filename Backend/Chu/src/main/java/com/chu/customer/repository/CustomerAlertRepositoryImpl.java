package com.chu.customer.repository;

import com.chu.customer.domain.AlertToCustomer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Slf4j
@Repository
@Transactional
@RequiredArgsConstructor
public class CustomerAlertRepositoryImpl implements CustomerAlertRepository {
    @Override
    public ArrayList<AlertToCustomer> getAlertToCustomer(int customerSeq) {
        ArrayList<AlertToCustomer> alertsToCustomer = new ArrayList<>();
        // 로직

        // 고객 seq로 알람 가져오기

        return alertsToCustomer;
    }
}
