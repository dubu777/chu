package com.chu.designer.domain;

import com.chu.consulting.domain.Consulting;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class DesignerAlert {

    @Id @GeneratedValue
    private Integer seq;

    private boolean isCheck;

    private LocalDateTime createdDate;

    private LocalDateTime checkedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seq")
    private Designer designer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seq")
    private Consulting consulting;

}
