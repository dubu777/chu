package com.chu.consulting.domain;

import com.chu.global.domain.HairStyleLabelDto;
import com.chu.global.domain.ImageNameDto;

import java.util.ArrayList;

public class ConsultingResultDto {
//            "name" : "소희",
//                    "consultingDate" : "07/11"
//                    "consultingStartTime" : "22:00",

    ArrayList<HairStyleLabelDto> hairStyle;
//                    "hairStyle" : [
//                    "레이어드컷",
//                    "히피펌",
//                    "검정색"
//                    ],
//                    "reviewResult" : "전형적인 ~~",

    ArrayList<ImageNameDto> reviewImgs;
//                    "reviewImgs" : [
//                    "img1.png",
//                    "img2.png",
//                    "img3.png"
//                    ]
}
