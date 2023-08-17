package com.chu.global.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter @Setter
@ToString
public class HairStyleDict {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    private String hairStyleLabel;

    private Character gender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hair_style_category_seq")
    private HairStyleCategory hairStyleCategory;
}