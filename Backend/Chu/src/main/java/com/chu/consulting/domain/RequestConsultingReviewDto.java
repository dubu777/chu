package com.chu.consulting.domain;

import lombok.Data;

@Data
public class RequestConsultingReviewDto {

    int consultingSeq;
    Boolean isLike;
    double reviewScore;
    String reviewContent;
}
