package com.chu.global.repository;

import com.chu.global.domain.HairConditionDict;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HairConditionDictRepository extends JpaRepository<HairConditionDict, Integer> {

    List<HairConditionDict> findAll();
}
