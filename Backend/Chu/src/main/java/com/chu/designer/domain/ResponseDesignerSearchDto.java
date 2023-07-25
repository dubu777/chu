package com.chu.designer.domain;

import lombok.Data;

import java.util.ArrayList;

@Data
public class ResponseDesignerSearchDto {
    // 리스트 개수 size()
    int designerListCnt;
    // 디자이너 배열
    ArrayList<DesignerSearchDto> designerList;
}
