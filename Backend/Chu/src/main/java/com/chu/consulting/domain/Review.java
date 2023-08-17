package com.chu.consulting.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Embeddable;

@Embeddable
@Getter @Setter @ToString
@NoArgsConstructor
public class Review {

    private Double reviewScore;
    private String reviewContent;


    public Review(Double reviewScore, String reviewContent) {
        this.reviewScore = reviewScore;
        this.reviewContent = reviewContent;
    }

}
