package com.chu.designer.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

// 디자이너의 정보를 담고 있는 가장 많이 쓰이는 DTO
@Getter @Setter
public class DesignerSearchDto {

    private Integer seq;

//    private String savedImgName;
//
//    private Float reviewScore;
//
    private String name;
//
//    private String introduction;
//
    private Integer reviewCnt;  //계산해서 가져와야함
//
//    private List<String> hairStyleLabel;

    private Integer likeCnt;    //계산해서 가져와야함

//    private Boolean isLike;
//
//    private Integer cost;

    public DesignerSearchDto(Designer designer) {
        this.seq = designer.getSeq();
        //this.savedImgName = designer.getImagePath().getSavedImgName();
        //this.reviewScore = designer.getReviewScore();
        this.name = designer.getName();
        //this.introduction = designer.getIntroduction();
        //this.reviewCnt = ;
        //this.hairStyleLabel = ;
        //this.likeCnt = designer.;
        //this.cost = designer.getCost();
    }

}
