package com.chu.designer.repository;

import com.chu.designer.domain.DesignerDetailInfoDto;
import com.chu.designer.domain.DesignerSearchAreaDto;
import com.chu.designer.domain.DesignerSearchDto;
import com.chu.designer.domain.DesignerSearchResponseDto;

import java.util.ArrayList;

public interface DesignerSearchRepository {
    ArrayList<DesignerSearchDto> search2Name(int customerSeq, String name);

    ArrayList<DesignerSearchDto> search2Filter(int customerSeq, String[] hairStyle);

    ArrayList<DesignerSearchDto> search2LikeCount(int customerSeq);

    ArrayList<DesignerSearchAreaDto> search2AllArea();

    DesignerDetailInfoDto getDesignerDetailInfo(int designerSeq, int customerSeq);

    ArrayList<DesignerSearchDto> search2Like(int customerSeq);
}
