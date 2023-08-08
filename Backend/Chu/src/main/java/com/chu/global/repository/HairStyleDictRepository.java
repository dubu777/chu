package com.chu.global.repository;

import com.chu.global.domain.HairStyleDict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HairStyleDictRepository extends JpaRepository<HairStyleDict, Integer> {

    HairStyleDict findBySeq(Integer seq);

    List<HairStyleDict> findByHairStyleCategorySeq(int hairStyleCategorySeq);

    @Query("SELECT hsd.seq FROM HairStyleDict hsd WHERE hsd.seq IN :my_style_tag AND hsd.hairStyleCategory.seq = :hair_style_category_seq")
    List<Integer> findByMyHairStyleCategorySeq(@Param("hair_style_category_seq") Integer categorySeq, @Param("my_style_tag") List<Integer> myHairTagSeqs);

}
