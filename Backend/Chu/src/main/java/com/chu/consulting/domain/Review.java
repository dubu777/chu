package com.chu.consulting.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Embeddable;

@Embeddable
@Getter @Setter @ToString
public class Review {

    private Float reviewScore;
    private String reviewContent;

    protected Review() {

    }

    public Review(Float reviewScore, String reviewContent) {
        this.reviewScore = reviewScore;
        this.reviewContent = reviewContent;
    }

}
