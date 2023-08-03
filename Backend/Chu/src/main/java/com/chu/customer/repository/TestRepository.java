package com.chu.customer.repository;

import com.chu.customer.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TestRepository extends JpaRepository<Customer, Integer> {

    Optional<Customer> findByEmail(String email);
    Customer findById(String id);
    boolean existsByEmail(String email);


}
