package com.chu.designer.domain;

import com.chu.customer.domain.Customer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@ToString
@NoArgsConstructor
public class DesignerLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_seq")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "designer_seq")
    private Designer designer;

    private Boolean likeStatus;
    private LocalDateTime createDate;


    public DesignerLike(Customer customer, Designer designer, Boolean likeStatus, LocalDateTime now) {
        this.customer = customer;
        this.designer = designer;
        this.likeStatus = likeStatus;
        this.createDate = now;
    }
}
