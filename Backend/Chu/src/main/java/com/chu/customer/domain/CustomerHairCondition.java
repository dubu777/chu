package com.chu.customer.domain;

import com.chu.global.domain.HairConditionDict;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

//@Entity
@Getter @Setter
public class CustomerHairCondition {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seq")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="seq")
    private HairConditionDict hairConditionDict;
}
