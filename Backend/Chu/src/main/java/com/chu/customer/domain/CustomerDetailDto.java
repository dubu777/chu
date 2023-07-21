package com.chu.customer.domain;

import com.chu.consulting.domain.FutureConsultingDto;
import com.chu.consulting.domain.PastConsultingDto;

import java.util.ArrayList;

public class CustomerDetailDto {
//    "customerSeq" : 1,
//            "name" : "김싸피",
//            "id" : "ssafy",
//            "email" : "ssafy@gmail.com",
//            "img" : "img1.png",
//            "hairCondition" : [
//            "얇은 모발",
//            "굵은 모발"
//            ],
//            "face" : "계란형",

    ArrayList<FutureConsultingDto> futureConsultingDtoList = new ArrayList<>();
    ArrayList<PastConsultingDto> pastConsultingDtoList = new ArrayList<>();
}
