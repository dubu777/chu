package com.chu.global.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Setter @Getter
public class HairStyleCategory {

    @Id @GeneratedValue
    private Integer seq;

    private String name;

}
