package com.chu.customer.domain;

import com.chu.global.domain.FaceDict;
import com.chu.global.domain.HairConditionDict;
import com.chu.global.domain.ResponseHairStyleDto;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ResponseCustomerDetailInfoDto {
    String name;
    String id;
    String email;
    Character gender;
    List<FaceDict> faceDict;
    int myFace;
    List<HairConditionDict> hairConditionDict;
    List<Integer> myHairCondition;

}
