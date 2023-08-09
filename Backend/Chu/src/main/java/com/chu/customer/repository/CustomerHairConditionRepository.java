package com.chu.customer.repository;

import com.chu.customer.domain.CustomerHairCondition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerHairConditionRepository extends JpaRepository<CustomerHairCondition, Integer> {

    List<CustomerHairCondition> findAllByCustomerSeq(int customerSeq);

}
