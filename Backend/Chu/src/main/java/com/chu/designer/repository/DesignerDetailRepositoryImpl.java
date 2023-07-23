package com.chu.designer.repository;

import com.chu.designer.domain.DesignerDto;
import com.chu.designer.domain.RequestDesignerInfoUpdateDto;
import com.chu.designer.domain.RequestReservationPossibleDateAndTimeDto;
import com.chu.designer.domain.ResponseDesignerAreaInfo;
import com.chu.global.domain.ResponseHairStyleDto;
import com.chu.global.domain.ResponseHairStyleLabelDto;
import com.chu.global.domain.ResponsePermHairStyleDto;
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
    public ArrayList<ResponseHairStyleLabelDto> getHairStyleTag(int designerSeq) {
        ArrayList<ResponseHairStyleLabelDto> list = new ArrayList<>();
        
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

    @Override
    public boolean patchImg(int designerSeq, String img) {
        boolean isSuccess = true;

        // 로직

        // 디자이너 대표 사진 변경

        return isSuccess;
    }

    @Override
    public ResponseDesignerAreaInfo getDesignerAreaInfo(int designerSeq) {
        ResponseDesignerAreaInfo responseDesignerAreaInfo = new ResponseDesignerAreaInfo();

        // 로직
        
        // 디자이너 지역 정보 조회
        
        return responseDesignerAreaInfo;
    }

    @Override
    public ArrayList<ResponseHairStyleDto> getAllCutHairStyle() {
        ArrayList<ResponseHairStyleDto> allCutHairStyle = new ArrayList<>();

        // 전체 컷스타일 조회

        return allCutHairStyle;
    }

    @Override
    public ArrayList<ResponsePermHairStyleDto> getAllPermHairStyle() {
        ArrayList<ResponsePermHairStyleDto> allPermHairStyle = new ArrayList<>();

        // 전체 펌스타일 조회
        
        return allPermHairStyle;
    }

    @Override
    public ArrayList<ResponseHairStyleDto> getMyCutHairStyle(int designerSeq) {
        ArrayList<ResponseHairStyleDto> myCutHairStyle = new ArrayList<>();

        // 디자니어의 컷스타일 조회

        return myCutHairStyle;
    }

    @Override
    public ArrayList<ResponsePermHairStyleDto> getMyPermHairStyle(int designerSeq) {
        ArrayList<ResponsePermHairStyleDto> myPermHairStyle = new ArrayList<>();

        // 디자이너의 펌스타일 조회

        return myPermHairStyle;
    }

    @Override
    public boolean updateDesignerInfo(int designerSeq, RequestDesignerInfoUpdateDto requestDesignerInfoUpdateDto) {
        boolean isSuccess = true;

        // 로직

        // 디자이너 정보 수정

        return isSuccess;
    }

    @Override
    public boolean deleteAlreadyPossibleTime(int designerSeq, RequestReservationPossibleDateAndTimeDto requestReservationPossibleDateAndTimeDto) {
        boolean isSuccess = true;

        // 로직

        // 디자이너 날짜 가능 시간 전체 삭제

        return isSuccess;
    }

    @Override
    public boolean postPossibleTime(int designerSeq, RequestReservationPossibleDateAndTimeDto requestReservationPossibleDateAndTimeDto) {
        boolean isSuccess = true;

        // 로직

        // 디자이너 날짜 가능 시간 전체 삽입

        return isSuccess;
    }
}
