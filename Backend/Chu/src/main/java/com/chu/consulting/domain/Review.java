package com.chu.consulting.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Embeddable;

@Embeddable
@Getter @Setter @ToString
public class Review {

    private Double reviewScore;
    private String reviewContent;

    protected Review() {

    }

    public Review(Double reviewScore, String reviewContent) {
        this.reviewScore = reviewScore;
        this.reviewContent = reviewContent;
    }

}
