package com.chu.customer.domain;

import com.chu.consulting.domain.FutureConsultingDto;
import com.chu.consulting.domain.PastConsultingDto;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Data
public class ResponseCustomerDetailDto {
    CustomerDto customerDto;
    ArrayList<CustomerHairConditionDto> customerHairConditionDtoList;
    ArrayList<FutureConsultingDto> futureConsultingDtoList;
    ArrayList<PastConsultingDto> pastConsultingDtoList;
}
