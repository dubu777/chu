package com.chu.global.repository;

import com.chu.designer.domain.DesignerTagInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface DesignerTagInfoRepository extends JpaRepository<DesignerTagInfo, Integer> {
    List<DesignerTagInfo> findByDesignerSeq(Integer designerSeq);

    @Query(value ="SELECT designer_seq FROM designer_tag_info WHERE hair_style_seq = :seq", nativeQuery = true)
    List<Integer> findDesignerSeqByHairStyleSeq(Integer seq);

    @Query("SELECT dti FROM DesignerTagInfo dti JOIN FETCH dti.hairStyleDict WHERE dti.designer.seq = :designerSeq")
    List<DesignerTagInfo> findByDesignerSeqWithHairStyleDict(Integer designerSeq);

}
