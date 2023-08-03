package com.chu.designer.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Objects;

// 디자이너의 정보를 담고 있는 DTO
@Getter @Setter
@ToString
public class DesignerSearchDto {

    private Integer seq;
    private String savedImgName;
    private Double reviewScore;
    private String name;
    private String introduction;
    private Integer reviewCnt;
    private List<String> hairStyleLabel;
    private Integer likeCnt;
//    private Boolean isLike;
    private Integer cost;

    public DesignerSearchDto(Designer designer, Integer likeCnt, Integer reviewCnt, List<String> hairStyleLabels, Double reviewScore) {
        this.seq = designer.getSeq();
        this.savedImgName = (designer.getImagePath() != null) ? designer.getImagePath().getSavedImgName() : null;
        this.reviewScore = (reviewScore==null) ? 0.0 : reviewScore;
        this.name = designer.getName();
        this.introduction = designer.getIntroduction();
        this.hairStyleLabel = hairStyleLabels;
        this.likeCnt = likeCnt;
        this.reviewCnt = reviewCnt;
        this.cost = designer.getCost();
    }

}
