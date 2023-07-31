package com.chu.customer.repository;

import com.chu.customer.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<Customer, Integer> {

}
