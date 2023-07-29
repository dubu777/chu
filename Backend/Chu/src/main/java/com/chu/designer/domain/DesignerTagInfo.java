package com.chu.designer.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class DesignerTagInfo {

    private Integer seq;

    private LocalDateTime createdTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="seq")
    private HairStyleDict hairStyleDict;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="seq")
    private Designer designer;


}
