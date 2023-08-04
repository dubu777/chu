package com.chu.customer.domain;

import lombok.Data;

import java.util.Date;

@Data
public class AlertCustomerOnLoginDto {
    int alertSeq;
    int consultingSeq;
    int check;
    Date pushDate;
    String designerName;
}
