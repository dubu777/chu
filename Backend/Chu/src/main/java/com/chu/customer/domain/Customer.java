package com.chu.customer.domain;

import com.chu.global.domain.FaceDict;
import com.chu.global.domain.ImagePath;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.crypto.password.PasswordEncoder;

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

   @Enumerated(EnumType.STRING)
   private Role role;

   @Embedded
   private ImagePath imagePath;

   @OneToOne(fetch = FetchType.LAZY)
   @JoinColumn(name="face_seq")
   private FaceDict faceDict;

   public Customer() {
      this.faceDict = new FaceDict();
//      this.faceDict.setSeq(1);
      this.imagePath = new ImagePath();
   }

   public Customer hashPassword(PasswordEncoder passwordEncoder){
      this.pwd = passwordEncoder.encode(this.pwd);

      return this;
   }
}
