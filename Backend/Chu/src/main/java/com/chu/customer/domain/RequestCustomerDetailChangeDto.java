package com.chu.customer.domain;

import lombok.Data;

import java.util.ArrayList;

@Data
public class RequestCustomerDetailChangeDto {
    String name;
    String email;
    String pwd;
    int myFace;
    ArrayList<Integer> myHairCondition;
}
