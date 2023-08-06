package com.chu.customer.domain;

import com.chu.global.domain.ResponseBestDesignerDto;
import com.chu.global.domain.FaceImageNameDto;
import com.chu.global.domain.TokenDto;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ResponseCustomerLoginDetailDto {
    TokenDto token;
    String userType = "customer";
    ResponseCustomerLoginInfoDto customerInfo;
    List<ResponseBestDesignerDto> bestDesigner;
    List<FaceImageNameDto> recommendImg;
    List<FaceImageNameDto> statisticsImg;
    List<AlertCustomerOnLoginDto> alert;
}
