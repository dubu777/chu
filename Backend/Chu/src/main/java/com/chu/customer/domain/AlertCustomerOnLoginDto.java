package com.chu.customer.domain;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class AlertCustomerOnLoginDto {
    int alertSeq;
    int consultingSeq;
    boolean check;
    LocalDateTime pushDate;
    String designerName;
}
