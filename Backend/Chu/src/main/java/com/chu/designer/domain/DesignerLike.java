package com.chu.designer.domain;

import com.chu.customer.domain.Customer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class DesignerLike {

    @Id
    @GeneratedValue
    private int seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seq")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seq")
    private DesignerDto designerDto;

    private boolean likeStatus;

    private LocalDateTime createDate;

}
