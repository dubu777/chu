package com.chu.designer.service;

import com.chu.designer.domain.DesignerLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DesignerLikeRepository extends JpaRepository<DesignerLike, Integer> {

    Integer countByDesignerSeq(Integer designerSeq);

    DesignerLike findByCustomerSeqAndDesignerSeq(Integer customerSeq, Integer designerSeq);

}
