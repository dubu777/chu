package com.chu.consulting.domain;

import com.chu.customer.domain.Customer;
import com.chu.designer.domain.Designer;
import com.chu.global.domain.ImagePath;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.PriorityQueue;

@Entity
@Getter @Setter
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
    @JoinColumn(name = "seq")
    private Designer designer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seq")
    private Customer customer;


}
