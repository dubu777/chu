package com.chu.designer.domain;

import lombok.Data;

import java.util.List;

// 지역으로 검색 시 핀 꽂는 용도로 사용
@Data
public class ResponseDesignerSearchAroundDto {
    int designerSeq;
    String designerImg;
    String name;
    Double reviewScore;
    List<String> hairStyleLabel;
    Double latitude;
    Double longitude;
}
