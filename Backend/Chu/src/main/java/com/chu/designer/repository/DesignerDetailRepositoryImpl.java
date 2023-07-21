package com.chu.designer.repository;

import com.chu.designer.domain.DesignerDto;
import com.chu.designer.domain.ResponseDesignerMyPageDto;
import com.chu.global.domain.HairStyleLabelDto;
import com.chu.global.domain.TimeDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Slf4j
@Repository
@RequiredArgsConstructor
public class DesignerDetailRepositoryImpl implements DesignerDetailRepository {

    @Override
    public DesignerDto getDesignerInfo(int designerSeq) {

        DesignerDto designerDto = null;
        // 디자이너 정보 조회

        return designerDto;
    }

    @Override
    public ArrayList<HairStyleLabelDto> getHairStyleTag(int designerSeq) {
        ArrayList<HairStyleLabelDto> list = new ArrayList<>();
        
        // 로직
        
        // 디자이너가 잘하는 머리 조회
        
        return list;
    }

    @Override
    public ArrayList<TimeDto> getPossibleTimeList(int designerSeq) {
        ArrayList<TimeDto> list = new ArrayList<>();
        
        // 오늘 디자이너 가능 시간 조회
        
        return list;
    }

    @Override
    public boolean patchIntroduction(int designerSeq, String introduction) {
        boolean isSuccess = true;

        // 로직
        // 디자이너 한줄 소개 변경

        return isSuccess;
    }
}
