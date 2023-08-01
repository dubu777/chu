package com.chu.designer.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

// 디자이너의 정보를 담고 있는 가장 많이 쓰이는 DTO
@Getter @Setter
public class DesignerSearchDto {

    private Integer seq;

    private String savedImgPath;

    private Float reviewScore;

    private String name;

    private String introduction;

//    private Integer reviewCnt;

//    private List<String> hairStyleLabel;

//    private Integer likeCnt;

//    private Integer cost;



//            "designerSeq" : 1,
//            "designerImg" : "Img1.png",
//            "reviewScore" : 4.9,
//            "designerName" : "재현",
//            "introduction" : "남자 펌, 아이롱펌 전문 디자이너 재현입니다. ",
//            "reviewCnt" : 132,
//            "hairStyleLabel" : [
//        "시스루펌",
//                "아이롱펌"
//                ],
//        "likeCnt" : 56,
//            "isLike" : true,
//            "cost" : 5000

}
