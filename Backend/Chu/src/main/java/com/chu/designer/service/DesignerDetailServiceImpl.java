package com.chu.designer.service;

import com.chu.designer.domain.DesignerDto;
import com.chu.designer.domain.ResponseDesignerMyPageDto;
import com.chu.designer.repository.DesignerDetailRepository;
import com.chu.global.domain.HairStyleLabelDto;
import com.chu.global.domain.TimeDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
public class DesignerDetailServiceImpl implements DesignerDetailService {
    private final DesignerDetailRepository designerDetailRepository;

    @Override
    public ResponseDesignerMyPageDto getMyPageInfo(int designerSeq) {
        ResponseDesignerMyPageDto responseDesignerMyPageDto = new ResponseDesignerMyPageDto();
        // 디자이너 정보
        DesignerDto designerDto = designerDetailRepository.getDesignerInfo(designerSeq);
        
        // 여기서 필요한거 뽑아쓰기

        // 디자이너가 잘하는 머리 스타일
        ArrayList<HairStyleLabelDto> hairStyleLabelDtoArrayList = designerDetailRepository.getHairStyleTag(designerSeq);

        // 디자이너가 그날 가능한 시간
        ArrayList<TimeDto> possibleTimeList = designerDetailRepository.getPossibleTimeList(designerSeq);


        return responseDesignerMyPageDto;
    }
}
