package com.chu.designer.repository;

import com.chu.designer.domain.DesignerPortfolio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DesignerPortfolioRepository extends JpaRepository<DesignerPortfolio, Integer> {

    List<DesignerPortfolio> findByDesignerSeq(Integer designerSeq);
}
