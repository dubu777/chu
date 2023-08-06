package com.chu.consulting.domain;

import com.chu.customer.domain.Customer;
import com.chu.designer.domain.Designer;
import com.chu.global.domain.ImagePath;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
public class Consulting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    @Embedded
    private ConsultingDate consultingDate;

    private String memo;

    @Embedded
    private Review review;

    private String result;

    @Embedded
    private ImagePath imagePath;

    private String url;

    private LocalDateTime createdDate;

    private LocalDateTime cancelDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "designer_seq")
    private Designer designer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_seq")
    private Customer customer;


}
