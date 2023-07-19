package com.chu.designer.service;

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
}
