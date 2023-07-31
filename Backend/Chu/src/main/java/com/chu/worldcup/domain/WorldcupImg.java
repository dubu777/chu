package com.chu.worldcup.domain;

import com.chu.global.domain.HairStyleDict;
import com.chu.global.domain.ImagePath;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class WorldcupImg {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    @Embedded
    private ImagePath imagePath;

    private LocalDateTime createdDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worldcup_seq")
    private Worldcup worldcup;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hair_style_seq")
    private HairStyleDict hairStyleDict;

}
