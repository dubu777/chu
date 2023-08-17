package com.chu.customer.repository;

import com.chu.customer.domain.CustomerHairCondition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerHairConditionRepository extends JpaRepository<CustomerHairCondition, Integer> {

    @Query("SELECT chc FROM CustomerHairCondition chc JOIN FETCH chc.hairConditionDict WHERE chc.customer.seq = :customerSeq")
    List<CustomerHairCondition> findAllByCustomerSeq(int customerSeq);

    // 기존 데이터들 삭제
    void deleteAllByCustomerSeq(int customerSeq);

}
