package com.chu.designer.service;

import com.chu.designer.domain.DesignerDetailInfoDto;
import com.chu.designer.domain.DesignerSearchAreaDto;
import com.chu.designer.domain.DesignerSearchDto;
import com.chu.designer.domain.DesignerSearchResponseDto;
import com.chu.designer.repository.DesignerSearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
public class DesignerSearchServiceImpl implements  DesignerSearchService{

    private final DesignerSearchRepository designerSearchRepository;

    @Override
    public ArrayList<DesignerSearchDto> search2Name(int customerSeq, String name) {
        return designerSearchRepository.search2Name(customerSeq, name);
    }

    @Override
    public ArrayList<DesignerSearchDto> search2Filter(int customerSeq, String[] hairStyle) {
        return designerSearchRepository.search2Filter(customerSeq, hairStyle);
    }

    @Override
    public ArrayList<DesignerSearchDto> search2LikeCount(int customerSeq) {
        return designerSearchRepository.search2LikeCount(customerSeq);
    }

    @Override
    public ArrayList<DesignerSearchAreaDto> search2AllArea() {
        return designerSearchRepository.search2AllArea();
    }

    @Override
    public DesignerDetailInfoDto getDesignerDetailInfo(int designerSeq, int customerSeq) {
        return designerSearchRepository.getDesignerDetailInfo(designerSeq, customerSeq);
    }
}
