package com.chu.customer.domain;

import lombok.Data;

@Data
public class RequestLikeDto {
    int customerSeq;
    int designerSeq;
    boolean isLike;
//    {
//        "customerSeq" : 1,
//            "designerSeq" : 1,
//            "isLike" : true
//    }
}
