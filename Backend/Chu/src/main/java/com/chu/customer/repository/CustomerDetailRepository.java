package com.chu.customer.repository;

import com.chu.consulting.domain.FutureConsultingDto;
import com.chu.consulting.domain.PastConsultingDto;
import com.chu.customer.domain.*;
import com.chu.global.domain.HairStyleDto;

import java.util.ArrayList;

public interface CustomerDetailRepository {
    CustomerDto getCustomerInfo(int customerSeq);

    boolean patchImage(String imgName);

    ArrayList<CustomerHairConditionDto> getCustomerHairCondition(int customerSeq);

    ArrayList<PastConsultingDto> getPastConsultingList(int customerSeq);

    ArrayList<FutureConsultingDto> getFutureConsultingList(int customerSeq);

    ArrayList<FaceTypeDto> getALLFaceTypeList();

    ArrayList<HairStyleDto> getAllHairStyleList();

    boolean updateCustomerInfo(int customerSeq, RequestCustomerDetailChangeDto requestCustomerDetailChangeDto);

    boolean updateHairStyleInfo(int customerSeq, RequestCustomerDetailChangeDto requestCustomerDetailChangeDto);
}
