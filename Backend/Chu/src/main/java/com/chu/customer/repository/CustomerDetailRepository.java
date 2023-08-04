package com.chu.customer.repository;

import com.chu.consulting.domain.ResponseFutureConsultingDto;
import com.chu.consulting.domain.ResponsePastConsultingDto;
import com.chu.customer.domain.*;
import com.chu.global.domain.FaceDict;
import com.chu.global.domain.ResponseHairStyleDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface CustomerDetailRepository extends JpaRepository<Customer, Integer> {
//    Customer getCustomerInfo(int customerSeq);
//
//    s
//    ArrayList<CustomerHairCondition> getCustomerHairCondition(int customerSeq);
//
//    ArrayList<ResponsePastConsultingDto> getPastConsultingList(int customerSeq);
//
//    ArrayList<ResponseFutureConsultingDto> getFutureConsultingList(int customerSeq);
//
//    ArrayList<FaceDict> getALLFaceTypeList();
//
//    ArrayList<ResponseHairStyleDto> getAllHairStyleList();
//
//    boolean updateCustomerInfo(int customerSeq, RequestCustomerDetailChangeDto requestCustomerDetailChangeDto);
//
//    boolean updateHairStyleInfo(int customerSeq, RequestCustomerDetailChangeDto requestCustomerDetailChangeDto);
}
