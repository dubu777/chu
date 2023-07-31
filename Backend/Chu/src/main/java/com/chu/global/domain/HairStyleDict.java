package com.chu.global.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class HairStyleDict {

    @Id
    @GeneratedValue
    private Integer seq;

    private String hairStyleLabel;

    private Character gender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seq")
    private HairStyleCategory hairStyleCategory;
}
