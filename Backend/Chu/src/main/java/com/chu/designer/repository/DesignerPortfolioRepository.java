package com.chu.designer.repository;

import com.chu.designer.domain.DesignerPortfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DesignerPortfolioRepository extends JpaRepository<DesignerPortfolio, Integer> {

    List<DesignerPortfolio> findByDesignerSeq(Integer designerSeq);

    DesignerPortfolio findBySeq(Integer seq);

    // 랜덤으로 4개 조회하기
    @Query(value = "SELECT * FROM designer_portfolio WHERE designer_seq != :designerSeq ORDER BY RAND() LIMIT 4", nativeQuery = true)
    List<DesignerPortfolio> getRandom(int designerSeq);


}
