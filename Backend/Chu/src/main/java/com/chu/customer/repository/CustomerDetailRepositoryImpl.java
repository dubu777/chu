package com.chu.customer.repository;

import com.chu.consulting.domain.ResponseFutureConsultingDto;
import com.chu.consulting.domain.ResponsePastConsultingDto;
import com.chu.customer.domain.Customer;
import com.chu.customer.domain.CustomerHairCondition;
import com.chu.customer.domain.FaceDict;
import com.chu.customer.domain.RequestCustomerDetailChangeDto;
import com.chu.global.domain.ResponseHairStyleDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Slf4j
@Repository
public class CustomerDetailRepositoryImpl implements CustomerDetailRepository {
    // DBCONN
    

    @Override
    public Customer getCustomerInfo(int customerSeq) {
        Customer customer = new Customer();

        // 로직
        
        // 고객 조회
        
        return customer;
    }

    @Override
    public boolean patchImage(String imgName) {
        boolean isSuccess = true;
        // 회원 이미지 정보 수정

        return isSuccess;
    }

    @Override
    public ArrayList<CustomerHairCondition> getCustomerHairCondition(int customerSeq) {
        ArrayList<CustomerHairCondition> list = new ArrayList<>();

        // 고객 모발 상태 조회

        return list;
    }

    @Override
    public ArrayList<ResponsePastConsultingDto> getPastConsultingList(int customerSeq) {
        ArrayList<ResponsePastConsultingDto> responsePastConsultingDtoList = new ArrayList<>();
        // 현재 시점 이전에 끝난 상담들 조회 / 디자이너 엮어서

        return responsePastConsultingDtoList;
    }

    @Override
    public ArrayList<ResponseFutureConsultingDto> getFutureConsultingList(int customerSeq) {
        ArrayList<ResponseFutureConsultingDto> responseFutureConsultingDtoList = new ArrayList<>();
        // 현재 시점 이후에 있을 상담들 조회 / 디자이너 엮어서

        return responseFutureConsultingDtoList;
    }

    @Override
    public ArrayList<FaceDict> getALLFaceTypeList() {
        ArrayList<FaceDict> faceDictList = new ArrayList<>();

        // 모든 얼굴형 타입 가져오기

        return faceDictList;
    }

    @Override
    public ArrayList<ResponseHairStyleDto> getAllHairStyleList() {
        ArrayList<ResponseHairStyleDto> hairStyleList = new ArrayList<>();

        // 모든 모발상태 가져오기

        return hairStyleList;
    }

    @Override
    public boolean updateCustomerInfo(int customerSeq, RequestCustomerDetailChangeDto requestCustomerDetailChangeDto) {
        // 고객정보, 얼굴형 수정
        
        return false;
    }

    @Override
    public boolean updateHairStyleInfo(int customerSeq, RequestCustomerDetailChangeDto requestCustomerDetailChangeDto) {
        // 고객 모발상태 수정
        
        return false;
    }
}
