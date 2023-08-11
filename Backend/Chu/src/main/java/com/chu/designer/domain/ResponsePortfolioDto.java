package com.chu.designer.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
@NoArgsConstructor
public class ResponsePortfolioDto {

    private Integer imgSeq;
    private String imgName;
    private Integer orders;

    public ResponsePortfolioDto(Integer imgSeq, String imgName, Integer orders) {
        this.imgSeq = imgSeq;
        this.imgName = imgName;
        this.orders = orders;
    }
}
