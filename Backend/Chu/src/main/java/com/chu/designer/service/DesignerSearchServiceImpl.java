package com.chu.designer.service;

import com.chu.designer.domain.ResponseDesignerDetailInfoDto;
import com.chu.designer.domain.ResponseDesignerSearchAreaDto;
import com.chu.designer.domain.DesignerSearchDto;
import com.chu.designer.repository.DesignerSearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DesignerSearchServiceImpl implements  DesignerSearchService{

    private final DesignerSearchRepository designerSearchRepository;

    @Override
    public List<DesignerSearchDto> search2Name(int customerSeq, String name) {
        return designerSearchRepository.search2Name(customerSeq, name);
    }

    @Override
    public List<DesignerSearchDto> search2Filter(int customerSeq, String[] hairStyle) {
        // 조인으로 처리할 수는 있을 것 같은데 힘들면 함수 빼서 스타일 태그번호 갖고 디자이너 상세로 갈 수 있게 짜면 될듯
        return designerSearchRepository.search2Filter(customerSeq, hairStyle);
    }

    @Override
    public List<DesignerSearchDto> search2LikeCount(int customerSeq) {
        return designerSearchRepository.search2LikeCount(customerSeq);
    }

    @Override
    public List<DesignerSearchDto> search2ReviewScore(int customerSeq) {
        return designerSearchRepository.search2ReviewScore(customerSeq);
    }

    @Override
    public List<ResponseDesignerSearchAreaDto> search2AllArea() {
        return designerSearchRepository.search2AllArea();
    }

    @Override
    public ResponseDesignerDetailInfoDto getDesignerDetailInfo(int designerSeq, int customerSeq) {
        return designerSearchRepository.getDesignerDetailInfo(designerSeq, customerSeq);
    }

    @Override
    public List<DesignerSearchDto> search2Like(int customerSeq) {
        return designerSearchRepository.search2Like(customerSeq);
    }
}
