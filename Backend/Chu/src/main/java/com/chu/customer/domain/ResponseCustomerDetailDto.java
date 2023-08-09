package com.chu.customer.domain;

import com.chu.consulting.domain.ResponseFutureConsultingDto;
import com.chu.consulting.domain.ResponsePastConsultingDto;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ResponseCustomerDetailDto {

//    Customer customer;
    int customerSeq;
    String name;
    String id;
    String email;
    String img;
//    List<CustomerHairCondition> customerHairConditionList;
    List<String> hairCondition;
    String faceLabel;
    List<ResponseFutureConsultingDto> responseFutureConsultingDtoList;
    List<ResponsePastConsultingDto> responsePastConsultingDtoList;
}
