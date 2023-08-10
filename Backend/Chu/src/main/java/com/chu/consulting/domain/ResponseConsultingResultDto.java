package com.chu.consulting.domain;

import com.chu.global.domain.ResponseHairStyleLabelDto;
import com.chu.global.domain.ImageNameDto;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Data
public class ResponseConsultingResultDto {
    String name;
    String consultingDate;
    String consultingStartTime;
    List<String> hairStyle;
    String reviewResult;
    List<String> reviewImgs;
}
