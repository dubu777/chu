package com.chu.consulting.domain;

import com.chu.customer.domain.Customer;
import com.chu.designer.domain.DesignerPortfolio;
import com.chu.global.domain.HairConditionDict;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter @Setter @ToString
public class ConsultingTargetInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consulting_seq")
    private Consulting consulting;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="portfolio_seq")
    private DesignerPortfolio designerPortfolio;

}
