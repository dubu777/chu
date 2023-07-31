package com.chu.global.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter @Getter
public class HairStyleImg {

    @Id @GeneratedValue
    private Integer seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seq")
    private HairStyleDict hairStyleDict;
}
