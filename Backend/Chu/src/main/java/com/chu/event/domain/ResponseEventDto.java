package com.chu.event.domain;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ResponseEventDto {
    private String inputImgPath;
    private String targetImgPath;
    private String confusionImgPath;
    int state;
}
