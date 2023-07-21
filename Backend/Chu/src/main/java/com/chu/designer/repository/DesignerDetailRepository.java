package com.chu.designer.repository;

import com.chu.designer.domain.DesignerDto;
import com.chu.designer.domain.RequestDesignerInfoUpdateDto;
import com.chu.designer.domain.ResponseDesignerAreaInfo;
import com.chu.global.domain.ResponseHairStyleDto;
import com.chu.global.domain.ResponseHairStyleLabelDto;
import com.chu.global.domain.ResponsePermHairStyleDto;
import com.chu.global.domain.TimeDto;

import java.util.ArrayList;

public interface DesignerDetailRepository {

    DesignerDto getDesignerInfo(int designerSeq);

    ArrayList<ResponseHairStyleLabelDto> getHairStyleTag(int designerSeq);

    ArrayList<TimeDto> getPossibleTimeList(int designerSeq);

    boolean patchIntroduction(int designerSeq, String introduction);

    boolean patchImg(int designerSeq, String img);

    ResponseDesignerAreaInfo getDesignerAreaInfo(int designerSeq);

    ArrayList<ResponseHairStyleDto> getAllCutHairStyle();

    ArrayList<ResponsePermHairStyleDto> getAllPermHairStyle();

    ArrayList<ResponseHairStyleDto> getMyCutHairStyle(int designerSeq);

    ArrayList<ResponsePermHairStyleDto> getMyPermHairStyle(int designerSeq);

    boolean updateDesignerInfo(int designerSeq, RequestDesignerInfoUpdateDto requestDesignerInfoUpdateDto);

}
