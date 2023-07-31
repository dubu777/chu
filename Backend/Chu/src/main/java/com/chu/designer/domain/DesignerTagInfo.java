package com.chu.designer.domain;

import com.chu.global.domain.HairStyleDict;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class DesignerTagInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer seq;

    private LocalDateTime createdTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="seq")
    private HairStyleDict hairStyleDict;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="seq")
    private Designer designer;


}
