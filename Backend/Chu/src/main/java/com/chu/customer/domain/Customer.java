package com.chu.customer.domain;

import com.chu.global.domain.FaceDict;
import com.chu.global.domain.ImagePath;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Customer {

   @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer seq;

   private String id;

   private String pwd;

   private String name;

   private String email;

   private char gender;

   private LocalDateTime createdDate;

   private ImagePath imagePath;

   @OneToOne(fetch = FetchType.LAZY)
   @JoinColumn(name="face_seq")
   private FaceDict faceDict;

}
