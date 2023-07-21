package com.chu.customer.repository;

import com.chu.consulting.domain.FutureConsultingDto;
import com.chu.consulting.domain.PastConsultingDto;
import com.chu.customer.domain.CustomerDto;
import com.chu.customer.domain.CustomerHairConditionDto;
import com.chu.customer.domain.ResponseCustomerDetailDto;

import java.util.ArrayList;

public interface CustomerDetailRepository {
    CustomerDto getCustomerInfo(int customerSeq);

    boolean patchImage(String imgName);

    ArrayList<CustomerHairConditionDto> getCustomerHairCondition(int customerSeq);

    ArrayList<PastConsultingDto> getPastConsultingList(int customerSeq);

    ArrayList<FutureConsultingDto> getFutureConsultingList(int customerSeq);
}
