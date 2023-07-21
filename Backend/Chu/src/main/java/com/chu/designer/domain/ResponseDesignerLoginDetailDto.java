package com.chu.designer.domain;

import com.chu.global.domain.AlertDesignerOnLoginDto;
import com.chu.global.domain.BestDesignerDto;
import com.chu.global.domain.FaceImageNameDto;

import java.util.ArrayList;

public class ResponseDesignerLoginDetailDto {
    //        "designerSeq" : 1,

//            "name" : "김싸피",
    ArrayList<BestDesignerDto> bestDesigner;

    ArrayList<FaceImageNameDto> statistics;

    ArrayList<AlertDesignerOnLoginDto> alert;
//    "profileImg" : "profileImg1.png"
}
