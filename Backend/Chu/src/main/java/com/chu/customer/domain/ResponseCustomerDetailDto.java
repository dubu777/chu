package com.chu.customer.domain;

import com.chu.consulting.domain.ResponseFutureConsultingDto;
import com.chu.consulting.domain.ResponsePastConsultingDto;
import lombok.Data;

import java.util.ArrayList;

@Data
public class ResponseCustomerDetailDto {
    Customer customer;
    ArrayList<CustomerHairCondition> customerHairConditionList;
    ArrayList<ResponseFutureConsultingDto> responseFutureConsultingDtoList;
    ArrayList<ResponsePastConsultingDto> responsePastConsultingDtoList;
}
