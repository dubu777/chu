package com.chu.designer.domain;

import com.chu.global.domain.ResponseHairStyleLabelDto;
import com.chu.global.domain.TimeDto;

import java.util.ArrayList;

public class ResponseDesignerMyPageDto {
//        "name" : "재현",
//                "cost" : "5000",
//                "email" : "ssafy@ssafy.com",
//                "introduction" : " 남자 펌 전문 !",
//                "img" : "img1.png",
    ArrayList<ResponseHairStyleLabelDto> hairStyleTag;
//                "hairStyleTag" : [
//                "시스루펌",
//                "아이롱펌",
//                "레이어드"
//                ],
    ArrayList<TimeDto> selectTime;
//                // 본인이 오늘 상담 가능하다고 선택했던 시간들
//                "selectTime" : [
//                "10:00",
//                "10:30",
//                "14:00"
//                ]
}
