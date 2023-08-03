package com.chu.designer.domain;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ResponseDesignerSearchDto {
    // 전체 커트 헤어스타일 리스트
    List<HairStyleDto> allCutHairStyle;
    // 전체 펌 헤어스타일 리스트
    List<HairStyleDto> allPermHairStyle;
    // 리스트 개수 size()
    Integer designerListCnt;
    // 디자이너 배열
    List<DesignerSearchDto> designerList;
}
