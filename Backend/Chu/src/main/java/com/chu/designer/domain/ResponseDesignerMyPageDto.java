package com.chu.designer.domain;

import com.chu.global.domain.ResponseHairStyleLabelDto;
import com.chu.global.domain.TimeDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter @Setter @ToString
public class ResponseDesignerMyPageDto {

    private String name;
    private Integer cost;
    private String email;
    private String introduction;
    private String img;     //저장이미지명
    private List<String> hairStyleTag;
    private List<String> selectTime;

}
