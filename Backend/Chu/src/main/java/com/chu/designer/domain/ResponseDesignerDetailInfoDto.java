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
    private List<DesignerReview> review;
    private Integer cost;

}
