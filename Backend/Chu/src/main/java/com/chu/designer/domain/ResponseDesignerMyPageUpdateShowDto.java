package com.chu.designer.domain;

import com.chu.global.domain.HairStyleDto;
import com.chu.global.domain.ResponseHairStyleDto;
import com.chu.global.domain.ResponsePermHairStyleDto;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@ToString @Getter @Setter
@Builder
public class ResponseDesignerMyPageUpdateShowDto {

    // 디자이너 정보
    private String name;
    private String id;
    private String email;
    private Integer cost;
    private String certificationNum;
    private String salonName;
    private String address;
    private Double latitude;
    private Double longitude;
    private String introduction;

    // 헤어스타일 리스트
    private List<HairStyleDto> allCutHairStyle;
    private List<HairStyleDto> allPermHairStyle;

    private Object myCutHairStyle;
    private Object myPermHairStyle;

}
