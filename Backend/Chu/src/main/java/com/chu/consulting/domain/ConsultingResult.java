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
    @JoinColumn(name = "consulting_seq")
    private Consulting consulting;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hair_style_seq")
    private HairStyleDict hairStyleDict;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "face_seq")
    private FaceDict faceDict;

}
