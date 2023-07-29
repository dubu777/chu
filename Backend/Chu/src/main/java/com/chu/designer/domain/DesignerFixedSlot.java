package com.chu.designer.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter @Getter
public class DesignerFixedSlot {

    @Id @GeneratedValue
    private int seq;

    private int day;

    private int time;

    private LocalDateTime createdDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seq")
    private Designer designer;


}
