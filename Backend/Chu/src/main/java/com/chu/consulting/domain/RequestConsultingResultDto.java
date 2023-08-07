package com.chu.consulting.domain;

import lombok.Data;

@Data
public class RequestConsultingResultDto {
    int consultingSeq;
    int[] selectedHairStyle;
    int[] selectedImgs;
    String reviewResult;
}
