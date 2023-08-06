package com.chu.designer.domain;

import com.chu.global.domain.ResponseBestDesignerDto;
import com.chu.global.domain.FaceImageNameDto;
import com.chu.global.domain.TokenDto;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ResponseDesignerLoginDetailDto {
    TokenDto token;
    String userType = "designer";
    ResponseDesignerLoginInfoDto designerInfo;
    List<ResponseBestDesignerDto> bestDesigner;
    List<FaceImageNameDto> statisticsImg;
    List<AlertDesignerOnLoginDto> alert;
}
