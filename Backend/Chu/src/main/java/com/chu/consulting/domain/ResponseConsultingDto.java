package com.chu.consulting.domain;

import com.chu.global.domain.ImageNameDto;
import com.chu.global.domain.ResponseHairConditionLabelDto;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ResponseConsultingDto {
    int consultingSeq;
    String consultingDate;
    String consultingMemo;
    String originImg;
    String name;
    Character gender;
    String faceLabel;
    List<String> hairCondition;
    List<String> virtualImg;
    String time;
    String cancelDate;
}
