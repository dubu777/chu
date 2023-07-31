package com.chu.designer.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter @Getter
public class DesignerFixedSlot {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    private Integer day;

    private Integer time;

    private LocalDateTime createdDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "designer_seq")
    private Designer designer;


}
