package com.chu.designer.domain;

import com.chu.global.domain.HairStyleDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

@Getter @Setter @ToString
public class RequestDesignerInfoUpdateDto {

    // 디자이너 정보
    private Integer cost;
    private String pwd;
    private String salonName;
    private String address;
    private Double latitude;
    private Double longitude;
    private String introduction;

    private List<Integer> myHairStyleTag;


}
