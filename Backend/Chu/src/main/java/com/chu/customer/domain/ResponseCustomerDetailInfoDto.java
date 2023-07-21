package com.chu.customer.domain;

import com.chu.global.domain.HairStyleDto;
import lombok.Data;

import java.util.ArrayList;

@Data
public class ResponseCustomerDetailInfoDto {
    CustomerDto customerDto;
    ArrayList<FaceTypeDto> faceTypeList;
    ArrayList<HairStyleDto> hairStyleList;
    ArrayList<CustomerHairConditionDto> hairConditionList;

}
