package com.chu.customer.domain;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RequestCustomerDetailChangeDto {
    String pwd;
    int myFace;
    List<Integer> myHairCondition;
}
