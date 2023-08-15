package com.chu.designer.domain;

import lombok.Data;

@Data
public class DesignerReview {
    private Double reviewScore;
    private String reviewContent;
    private String customerId;
    private String date;
}
