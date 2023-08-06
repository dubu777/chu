package com.chu.designer.domain;

import com.chu.global.domain.FaceImageNameDto;
import com.chu.global.domain.ResponseBestDesignerDto;
import lombok.Data;

import java.util.List;

@Data
public class ResponseMainPageDto {
    List<ResponseBestDesignerDto> bestDesigner;
    List<FaceImageNameDto> statisticsImg;
}
