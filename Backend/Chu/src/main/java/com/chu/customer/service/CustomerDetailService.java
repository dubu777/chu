package com.chu.customer.service;

import com.chu.customer.domain.RequestCustomerDetailChangeDto;
import com.chu.customer.domain.ResponseCustomerDetailInfoDto;
import com.chu.customer.domain.ResponseCustomerDetailDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CustomerDetailService {
    // 고객 이미지를 통해 파일 경로명을 받아옴
    String getSavedImgFilePath(MultipartFile file) throws IOException;
    // 고객 이미지 수정
    Boolean patchImage(Integer customerSeq, String fileName) ;

    // 마이페이지 들어갈때 가져올 것들
//    ResponseCustomerDetailDto getCustomerDetail(int customerSeq);
//
//    // 고객정보 수정 눌렀을때 가져올 것들
//    ResponseCustomerDetailInfoDto getCustomerUpdateDetailInfo(int customerSeq);
//
//    // 고객 상세 정보 수정
//    boolean putCustomerDetailInfo(int customerSeq, RequestCustomerDetailChangeDto requestCustomerDetailChangeDto);
}
