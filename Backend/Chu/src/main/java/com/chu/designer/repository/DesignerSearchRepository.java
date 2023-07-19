package com.chu.designer.repository;

import com.chu.designer.domain.DesignerSearchDto;
import com.chu.designer.domain.DesignerSearchResponseDto;

import java.util.ArrayList;

public interface DesignerSearchRepository {
    ArrayList<DesignerSearchDto> search2Name(int customerSeq, String name);

    ArrayList<DesignerSearchDto> search2Filter(int customerSeq, String[] hairStyle);
}
