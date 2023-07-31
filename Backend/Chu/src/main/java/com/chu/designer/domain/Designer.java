package com.chu.designer.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Designer {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    private String id;

    private String name;

    private String pwd;

    private String email;

    private Character gender;

    private String introduction;

    private String certificationNum;

    private String address;

    private Double latitude;

    private Double longitude;

    private String salonName;

    private String profileUploadImgName;

    private String profileSavedImgName;

    private float reviewScore;

    private Integer cost;

    private LocalDateTime createdDate;

}
