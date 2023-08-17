package com.chu.event.repository;

import com.chu.consulting.domain.Consulting;
import com.chu.event.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {

    Event findByCustomerSeq(int customerSeq);
}
