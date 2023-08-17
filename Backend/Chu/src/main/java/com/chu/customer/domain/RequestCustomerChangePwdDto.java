package com.chu.customer.domain;

import lombok.Data;

@Data
public class RequestCustomerChangePwdDto {
    int customerSeq;
    String pwd;
}
