package com.chu.designer.service;

import com.chu.designer.domain.*;

import java.util.ArrayList;

public interface DesignerSearchService {
    ArrayList<DesignerSearchDto> search2Name(int customerSeq, String name);

    ArrayList<DesignerSearchDto> search2Filter(int customerSeq, String[] hairStyle);

    ArrayList<DesignerSearchDto> search2LikeCount(int customerSeq);

    ArrayList<DesignerSearchDto> search2ReviewScore(int customerSeq);

    ArrayList<ResponseDesignerSearchAreaDto> search2AllArea();

    ResponseDesignerDetailInfoDto getDesignerDetailInfo(int designerSeq, int customerSeq);

    ArrayList<DesignerSearchDto> search2Like(int customerSeq);
}
