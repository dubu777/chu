package com.chu.consulting.domain;

import lombok.Data;

@Data
public class ResponsePastConsultingDto {
    int consultingSeq;
    String designerImg;
    Double allReviewScore;
    String name;
    String consultingDate;
    String consultingStartTime;
    Double myReviewScore;
    String reviewContent;
}
