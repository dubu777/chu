package com.chu.designer.domain;

import com.chu.consulting.domain.Review;
import lombok.*;

import java.util.List;

// 디자이너 상세 (예약 ) 페이지 사용
@Getter @Setter @ToString @Builder
public class ResponseDesignerDetailInfoDto {

    private Integer designerSeq;
    private String name;
    private String introduction;
    private String address;
    private String salonName;
    private String designerImg;
    private Double allReviewScore;
    private Integer likeCnt;
    private Boolean isLike;
    private List<String> hairStyleLabel;
    private List<ResponsePortfolioDto> portfolio;
    private List<Review> review;
    private Integer cost;

//    @Builder
//    public ResponseDesignerDetailInfoDto(Designer designer, Double reviewScore, Integer likeCnt, Boolean isLike, List<String> hairStyleLabels, List<ResponsePortfolioDto> portfolio, List<Review> review) {
//        this.designerSeq = designer.getSeq();
//        this.name = designer.getName();
//        this.introduction = designer.getIntroduction();
//        this.address = designer.getAddress();
//        this.salonName = designer.getSalonName();
//        this.designerImg = (designer.getImagePath() != null) ? designer.getImagePath().getSavedImgName() : null;
//        this.allReviewScore = designer.getReviewScore();
//        this.likeCnt = likeCnt;
//        this.isLike = isLike;
//        this.hairStyleLabel = hairStyleLabels;
//        this.portfolio = portfolio;
//        this.review = review;
//        this.cost = designer.getCost();
//    }

}
