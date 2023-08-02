package com.chu.designer.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

// 디자이너의 정보를 담고 있는 DTO
@Getter @Setter
public class DesignerSearchDto {

    private Integer seq;
    private String savedImgName;
//    private Float reviewScore;
    private String name;
    private String introduction;
    private Integer reviewCnt;
    private List<String> hairStyleLabel;
    private Integer likeCnt;
//    private Boolean isLike;
    private Integer cost;

    public DesignerSearchDto(Designer designer, Integer likeCnt, Integer reviewCnt) {
        this.seq = designer.getSeq();
        this.savedImgName = (designer.getImagePath() != null) ? designer.getImagePath().getSavedImgName() : null;
        //this.reviewScore = designer.getReviewScore();
        this.name = designer.getName();
        this.introduction = designer.getIntroduction();
        //this.hairStyleLabel = List.of();
        this.likeCnt = likeCnt;
        this.reviewCnt = reviewCnt;
        this.cost = designer.getCost();
    }

}
