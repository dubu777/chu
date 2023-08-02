package com.chu.designer.domain;

import com.chu.global.domain.HairStyleDict;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@ToString
public class DesignerTagInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer seq;

    private LocalDateTime createdTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="hair_style_seq")
    private HairStyleDict hairStyleDict;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="designer_seq")
    private Designer designer;


}
