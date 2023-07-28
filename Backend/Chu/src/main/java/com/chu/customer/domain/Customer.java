package com.chu.customer.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Customer {

   @Id @GeneratedValue
   private int seq;

   private String id;

   private String pwd;

   private String name;

   private String email;

   private char gender;

   private LocalDateTime createdDate;

   private String uploadImgName;

   private String savedImgName;

   @OneToOne(fetch = FetchType.LAZY)
   @JoinColumn(name="seq")
   private FaceDict faceDict;

}
