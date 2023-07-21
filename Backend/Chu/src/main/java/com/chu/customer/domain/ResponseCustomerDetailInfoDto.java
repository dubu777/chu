package com.chu.customer.domain;

import com.chu.global.domain.ResponseHairStyleDto;
import lombok.Data;

import java.util.ArrayList;

@Data
public class ResponseCustomerDetailInfoDto {
    CustomerDto customerDto;
    ArrayList<FaceTypeDto> faceTypeList;
    ArrayList<ResponseHairStyleDto> hairStyleList;
    ArrayList<CustomerHairConditionDto> hairConditionList;

}
