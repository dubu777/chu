package com.chu.designer.domain;

import com.chu.global.domain.ImagePath;
import com.chu.global.domain.TokenDto;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@ToString
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

    private Double reviewScore;

    private Integer cost;
    private LocalDateTime createdDate;
    private String RefreshToken;

//    public DesignerSearchDto showDesignerView() {
//        return DesignerSearchDto.builder()
//                .seq(seq)
//                .name(name)
//                .savedImgName(imagePath.getSavedImgName())
//                .introduction(introduction)
//                .cost(cost)
//                .build();
//    }

    public Designer hashPassword(PasswordEncoder passwordEncoder){
        this.pwd = passwordEncoder.encode(this.pwd);

        return this;
    }
}
