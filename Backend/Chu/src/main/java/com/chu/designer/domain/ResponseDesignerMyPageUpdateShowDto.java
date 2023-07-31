package com.chu.designer.domain;

import com.chu.global.domain.ResponseHairStyleDto;
import com.chu.global.domain.ResponsePermHairStyleDto;

import java.util.ArrayList;

public class ResponseDesignerMyPageUpdateShowDto {

    // 디자이너 정보
    Designer designer;
    // 지역도 있음
    ResponseDesignerAreaInfo responseDesignerAreaInfo;
    ArrayList<ResponseHairStyleDto> allCutResponseHairStyleDtoList;
    ArrayList<ResponsePermHairStyleDto> allResponsePermHairStyleDtoList;
    
    ArrayList<ResponseHairStyleDto> myCutResponseHairStyleDtoList;

    ArrayList<ResponsePermHairStyleDto> myResponsePermHairStyleDtoList;
}
