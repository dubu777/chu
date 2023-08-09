package com.chu.customer.domain;

import lombok.Data;

@Data
public class RequestLikeDto {

    Integer customerSeq;
    Integer designerSeq;
    Boolean isLike;

}
