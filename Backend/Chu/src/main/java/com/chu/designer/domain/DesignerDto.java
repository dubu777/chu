package com.chu.designer.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class DesignerDto {

    @Id @GeneratedValue
    private int seq;

    private String id;

    private String name;

    private String pwd;

    private String email;

    private char gender;

    private String introduction;

    private String certificationNum;

    private String address;

    private double latitude;

    private double longitude;

    private String salonName;

    private String profileUploadImgName;

    private String profileSavedImgName;

    private float reviewScore;

    private int cost;

    private LocalDateTime createdDate;

}
