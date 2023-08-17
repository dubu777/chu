package com.chu.designer.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AlertDesignerOnLoginDto {
    int alertSeq;
    int consultingSeq;
    boolean check;
    LocalDateTime pushDate;
    String customerName;

    String consultingDate;

    String consultingTime;
}
