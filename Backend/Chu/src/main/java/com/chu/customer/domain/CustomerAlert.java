package com.chu.customer.domain;

import com.chu.consulting.domain.Consulting;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class CustomerAlert {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    private Boolean  isCheck;

    private LocalDateTime createdDate;

    private LocalDateTime checkedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_seq")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consulting_seq")
    private Consulting consulting;


}
