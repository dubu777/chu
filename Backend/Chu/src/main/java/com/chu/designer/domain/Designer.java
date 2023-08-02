package com.chu.designer.domain;

import com.chu.global.domain.ImagePath;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@ToString
//@AllArgsConstructor
//@NoArgsConstructor(access = AccessLevel.PUBLIC) //@NoArgsConstructor AccessLevel.PROTECTED: 기본 생성자 막고 싶은데, JPA 스팩상 PROTECTED로 열어두어야 함
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
    @Embedded
    private ImagePath imagePath;

    private Float reviewScore;

    private Integer cost;
    private LocalDateTime createdDate;

//    public DesignerSearchDto showDesignerView() {
//        return DesignerSearchDto.builder()
//                .seq(seq)
//                .name(name)
//                .savedImgName(imagePath.getSavedImgName())
//                .introduction(introduction)
//                .cost(cost)
//                .build();
//    }

}
