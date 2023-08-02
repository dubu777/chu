package com.chu.global.repository;

import com.chu.designer.domain.DesignerTagInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DesignerTagInfoRepository extends JpaRepository<DesignerTagInfo, Integer> {
    List<DesignerTagInfo> findByDesignerSeq(Integer designerSeq);
}
