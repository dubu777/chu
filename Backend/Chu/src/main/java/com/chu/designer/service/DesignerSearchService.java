package com.chu.designer.service;

import com.chu.designer.domain.DesignerDto;
import com.chu.designer.domain.DesignerSearchAreaDto;
import com.chu.designer.domain.DesignerSearchDto;
import com.chu.designer.domain.DesignerSearchResponseDto;

import java.util.ArrayList;

public interface DesignerSearchService {
    ArrayList<DesignerSearchDto> search2Name(int customerSeq, String name);

    ArrayList<DesignerSearchDto> search2Filter(int customerSeq, String[] hairStyle);

    ArrayList<DesignerSearchDto> search2LikeCount(int customerSeq);

    ArrayList<DesignerSearchAreaDto> search2AllArea();
}
