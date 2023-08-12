package com.chu.event.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter @Setter
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    private Integer customerSeq;

    private String inputImgPath;

    private String targetImgPath;

    private String confusionImgPath;

    private Integer state;
}
