package com.chu.consulting.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;

@Embeddable
@Getter @Setter
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
