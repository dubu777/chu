package com.chu.customer.domain;

import com.chu.global.domain.TokenDto;
import lombok.Data;

@Data
public class ResponseCustomerLoginToken {
    int customerSeq;
    TokenDto token;
}
