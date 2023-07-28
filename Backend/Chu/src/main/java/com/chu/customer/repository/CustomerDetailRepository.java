package com.chu.customer.repository;

import com.chu.consulting.domain.ResponseFutureConsultingDto;
import com.chu.consulting.domain.ResponsePastConsultingDto;
import com.chu.customer.domain.*;
import com.chu.global.domain.ResponseHairStyleDto;

import java.util.ArrayList;

public interface CustomerDetailRepository {
    CustomerDto getCustomerInfo(int customerSeq);

    boolean patchImage(String imgName);

    ArrayList<CustomerHairConditionDto> getCustomerHairCondition(int customerSeq);

    ArrayList<ResponsePastConsultingDto> getPastConsultingList(int customerSeq);

    ArrayList<ResponseFutureConsultingDto> getFutureConsultingList(int customerSeq);

    ArrayList<FaceType> getALLFaceTypeList();

    ArrayList<ResponseHairStyleDto> getAllHairStyleList();

    boolean updateCustomerInfo(int customerSeq, RequestCustomerDetailChangeDto requestCustomerDetailChangeDto);

    boolean updateHairStyleInfo(int customerSeq, RequestCustomerDetailChangeDto requestCustomerDetailChangeDto);
}
