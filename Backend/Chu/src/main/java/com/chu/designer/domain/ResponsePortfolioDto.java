package com.chu.designer.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class ResponsePortfolioDto {

    private Integer imgSeq;
    private String imaName;
    private Integer orders;

    public ResponsePortfolioDto(Integer imgSeq, String imaName, Integer orders) {
        this.imgSeq = imgSeq;
        this.imaName = imaName;
        this.orders = orders;
    }
}
