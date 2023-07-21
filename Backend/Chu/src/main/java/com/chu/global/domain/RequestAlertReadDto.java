package com.chu.global.domain;

import lombok.Data;

@Data
public class RequestAlertReadDto {
    int alertSeq;
    String userType;
    int userSeq;
//        "alertSeq" : 1,
//                "userType" : "designer",
//                "userSeq" : 20
}
