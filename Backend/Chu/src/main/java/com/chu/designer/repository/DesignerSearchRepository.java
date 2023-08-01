package com.chu.designer.repository;

import com.chu.designer.domain.ResponseDesignerDetailInfoDto;
import com.chu.designer.domain.ResponseDesignerSearchAreaDto;
import com.chu.designer.domain.DesignerSearchDto;

import java.util.ArrayList;
import java.util.List;

public interface DesignerSearchRepository {
    List<DesignerSearchDto> search2Name(int customerSeq, String name);

    List<DesignerSearchDto> search2Filter(int customerSeq, String[] hairStyle);

    List<DesignerSearchDto> search2LikeCount(int customerSeq);

    List<DesignerSearchDto> search2ReviewScore(int customerSeq);

    List<ResponseDesignerSearchAreaDto> search2AllArea();

    ResponseDesignerDetailInfoDto getDesignerDetailInfo(int designerSeq, int customerSeq);

    List<DesignerSearchDto> search2Like(int customerSeq);
}
