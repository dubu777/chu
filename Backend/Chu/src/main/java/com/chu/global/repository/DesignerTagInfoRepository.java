package com.chu.global.repository;

import com.chu.designer.domain.DesignerTagInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface DesignerTagInfoRepository extends JpaRepository<DesignerTagInfo, Integer> {
    List<DesignerTagInfo> findByDesignerSeq(Integer designerSeq);

//    @Query("SELECT dti.designer.seq FROM DesignerTagInfo dti WHERE dti.hairStyleDict.seq = :hairStyleSeq")
//    List<Integer> searchDesigner(Integer seq);
}
