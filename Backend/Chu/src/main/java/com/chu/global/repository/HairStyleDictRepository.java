package com.chu.global.repository;

import com.chu.global.domain.HairStyleDict;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HairStyleDictRepository extends JpaRepository<HairStyleDict, Integer> {

    HairStyleDict findBySeq(Integer seq);

    List<HairStyleDict> findByHairStyleCategorySeq(int hairStyleCategorySeq);
}
