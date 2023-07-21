package com.chu.customer.repository;

import com.chu.consulting.domain.FutureConsultingDto;
import com.chu.consulting.domain.PastConsultingDto;
import com.chu.customer.domain.CustomerDto;
import com.chu.customer.domain.CustomerHairConditionDto;
import com.chu.customer.domain.ResponseCustomerDetailDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Slf4j
@Repository
public class CustomerDetailRepositoryImpl implements CustomerDetailRepository {
    // DBCONN
    

    @Override
    public CustomerDto getCustomerInfo(int customerSeq) {
        CustomerDto customerDto = new CustomerDto();

        // 로직
        
        // 고객 조회
        
        return customerDto;
    }

    @Override
    public boolean patchImage(String imgName) {
        boolean isSuccess = true;
        // 회원 이미지 정보 수정

        return isSuccess;
    }

    @Override
    public ArrayList<CustomerHairConditionDto> getCustomerHairCondition(int customerSeq) {
        ArrayList<CustomerHairConditionDto> list = new ArrayList<>();

        // 고객 모발 상태 조회

        return list;
    }

    @Override
    public ArrayList<PastConsultingDto> getPastConsultingList(int customerSeq) {
        ArrayList<PastConsultingDto> pastConsultingDtoList = new ArrayList<>();
        // 현재 시점 이전에 끝난 상담들 조회 / 디자이너 엮어서

        return pastConsultingDtoList;
    }

    @Override
    public ArrayList<FutureConsultingDto> getFutureConsultingList(int customerSeq) {
        ArrayList<FutureConsultingDto> futureConsultingDtoList = new ArrayList<>();
        // 현재 시점 이후에 있을 상담들 조회 / 디자이너 엮어서

        return futureConsultingDtoList;
    }
}
