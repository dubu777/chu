package com.chu.customer.domain;

import com.chu.consulting.domain.ResponseFutureConsultingDto;
import com.chu.consulting.domain.ResponsePastConsultingDto;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ResponseCustomerDetailDto {

    Customer customer;
    List<CustomerHairCondition> customerHairConditionList;
    List<ResponseFutureConsultingDto> responseFutureConsultingDtoList;
    List<ResponsePastConsultingDto> responsePastConsultingDtoList;
}
