package com.chu.consulting.domain;

import com.chu.global.domain.ImageNameDto;
import com.chu.global.domain.ResponseHairConditionLabelDto;

import java.util.ArrayList;

public class ResponseConsultingDto {
//                    "consultingSeq" : 1,
//                            "consultingDate" : "2023-07-19",
//                            "consultingMemo" : "상담 전달사항",
//                            "originImg" : "img1.png",
//                            "name" : "김싸피",
//                            "gender" : "남성",
//                            "faceLabel" : "계란형",

    ArrayList<ResponseHairConditionLabelDto> hairCondition;
//                            "hairCondition" : [
//                            "얇은 모발",
//                            "반곱슬"
//                            ],

    ArrayList<ImageNameDto> virtualImg;
//                            "virtualImg" : [
//                            "img1.png",
//                            "img2.png",
//                            "img3.png"
//                            ]
}
