package com.chu.customer.domain;


import com.chu.global.domain.AlertCustomerOnLoginDto;
import com.chu.global.domain.BestDesignerDto;
import com.chu.global.domain.FaceImageNameDto;

import java.util.ArrayList;

public class ResponseCustomerLoginDetailDto {
    //        "customerSeq" : 1,

//            "name" : "김싸피",

    ArrayList<BestDesignerDto> bestDesigner;
    //        "faceSeq" : "둥근 얼굴형",
    ArrayList<FaceImageNameDto> faceImg;

    ArrayList<FaceImageNameDto> statistics;

    ArrayList<AlertCustomerOnLoginDto> alert;

//    "profileImg" : "profileImg1.png"
}
