package com.chu.designer.domain;

import com.chu.global.domain.ImagePath;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
public class DesignerPortfolio {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seq;

    @Embedded
    private ImagePath imagePath;

    private Integer orders;

    private LocalDateTime createdDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "designer_seq")
    private Designer designer;

    public DesignerPortfolio(Designer designer, ImagePath imagePath) {
        this.designer = designer;
        this.imagePath = imagePath;
    }

    public DesignerPortfolio() {
        
    }
}
