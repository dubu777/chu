package com.chu.customer.domain;

import lombok.Data;

@Data
public class RequestCustomerSignUpDto {

    String name;
    String id;
    String email;
    char gender;
    String pwd;

    public Customer toCustomerEntity(){
        Customer customer = new Customer();

        customer.setName(this.getName());
        customer.setId(this.getId());
        customer.setEmail(this.getEmail());
        customer.setGender(this.getGender());
        customer.setPwd(this.getPwd());

        return customer;
    }

}
