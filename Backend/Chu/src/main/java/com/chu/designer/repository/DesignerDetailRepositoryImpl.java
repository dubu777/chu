package com.chu.designer.repository;

import com.chu.consulting.domain.ResponseConsultingDto;
import com.chu.designer.domain.Designer;
import com.chu.designer.domain.RequestDesignerInfoUpdateDto;
import com.chu.designer.domain.RequestReservationPossibleDateAndTimeDto;
import com.chu.designer.domain.ResponseDesignerAreaInfo;
import com.chu.global.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.ArrayList;

@Slf4j
@Repository
@RequiredArgsConstructor
public class DesignerDetailRepositoryImpl implements DesignerDetailRepository {

    @Override
    public Designer getDesignerInfo(int designerSeq) {

        Designer designer = null;
        // 디자이너 정보 조회

        return designer;
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

    @Override
    public ArrayList<TimeDto> getPossibleReservationTime(int designerSeq, Date date) {
        ArrayList<TimeDto> possibleReservationTimeList = new ArrayList<>();

        // 디자이너 해당 날짜 가능 시간 조회

        return possibleReservationTimeList;
    }

    @Override
    public ArrayList<ResponseConsultingDto> getReservationList(int designerSeq) {
        ArrayList<ResponseConsultingDto> resultList = new ArrayList<>();

        // 디자어너가 갖고 있는 상담 정보, 그 고객의 모발상태까지 리턴

        return resultList;
    }

    @Override
    public ArrayList<ImageDto> getConfusionImages(int consultinSeq) {
        ArrayList<ImageDto> resultList = new ArrayList<>();
        
        // 합성 이미지 정보 반환

        return resultList;
    }

    @Override
    public ArrayList<ImageDto> getPortfolio(int designerSeq) {
        ArrayList<ImageDto> portfolioList = new ArrayList<>();

        // 로직

        // 디자이너 번호로 포트폴리오 다 가져오기

        return portfolioList;
    }

    @Override
    public boolean postPortfolioImage(int designerSeq, String img) {

        boolean isSuccess = true;

        // 로직

        // 해당 디자이너 번호에 해당 이미지 삽입

        return isSuccess;
    }

    @Override
    public boolean deletePortfolioImage(int designerSeq, int imageSeq) {

        boolean isSuccess = true;

        // 로직

        // 해당 디자이너의 이미지 하나 삭제

        return isSuccess;
    }
}
