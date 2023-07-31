package com.chu.consulting.domain;

import com.chu.global.domain.FaceDict;
import com.chu.designer.domain.Designer;
import com.chu.global.domain.HairStyleDict;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class ConsultingResult {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seq")
    private Designer designer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seq")
    private HairStyleDict hairStyleDict;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seq")
    private FaceDict faceDict;

}
