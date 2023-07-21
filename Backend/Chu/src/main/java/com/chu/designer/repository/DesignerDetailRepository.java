package com.chu.designer.repository;

import com.chu.designer.domain.DesignerDto;
import com.chu.global.domain.HairStyleLabelDto;
import com.chu.global.domain.TimeDto;

import java.util.ArrayList;

public interface DesignerDetailRepository {

    DesignerDto getDesignerInfo(int designerSeq);

    ArrayList<HairStyleLabelDto> getHairStyleTag(int designerSeq);

    ArrayList<TimeDto> getPossibleTimeList(int designerSeq);
}
