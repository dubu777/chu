package com.chu.customer.domain;

import com.chu.global.domain.ImagePath;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter
public class FaceDict {

    @Id @GeneratedValue
    private Integer seq;

    private String faceLabel;

    @Embedded
    private ImagePath imagePath;

}
