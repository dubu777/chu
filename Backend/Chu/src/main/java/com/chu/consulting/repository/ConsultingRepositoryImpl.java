package com.chu.consulting.repository;

import com.chu.consulting.domain.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Slf4j
@Repository
@Transactional
public class ConsultingRepositoryImpl implements ConsultingRepository {
    // DB CONN

    @Override
    public String participantConsulting(int consultingSeq) {
        String url = null;
        // 로직
        // 해당 상담 seq url 반환
        
        return url;
    }

    @Override
    public boolean createConsulting(RequestConsultingDto requestConsultingDto) {
        boolean isSuccess = true;

        // 로직
        // 상담 등록

        return isSuccess;
    }

    @Override
    public boolean updatePossibleConsulting(int consultingSeq) {
        boolean isSuccess = true;

        // 해당 시간 날짜 디자이너의 상담 가능 테이블 상태 변경 가능으로

        return isSuccess;
    }

    @Override
    public boolean deleteConsulting(int consultingSeq) {
        boolean isSuccess = true;

        // 로직
        // 상담 취소니까
        // 상담 테이블에서 그 녀석 삭제 ( 삭제 하는게 맞는가 상태 컬럼 추가하는게 맞는가)

        return isSuccess;
    }

    @Override
    public boolean updateImpossibleConsulting(RequestConsultingDto requestConsultingDto) {
        return false;
    }

    @Override
    public ResponseConsultingResultDto getConsultingResult(int consultingSeq) {
        ResponseConsultingResultDto responseConsultingResultDto = new ResponseConsultingResultDto();

        // 로직

        // 상담 결과 반환

        // 상담 결과 헤어스타일 반환

        // 상담 결과 사진들 반환

        return responseConsultingResultDto;
    }

    @Override
    public boolean updateConsultingUrl(int consultingSeq, String url) {
        
        boolean isSuccess = true;
        
        // 로직
        
        // 해당 상담 시퀀스에 url 삽입
        
        return isSuccess;
    }

    @Override
    public boolean updateReviewContent(RequestConsultingReviewDto requestConsultingReviewDto) {
        boolean isSuccess = true;
        
        // 로직
        
        // 상담 테이블 리뷰 상세 업데이트

        return isSuccess;
    }

    @Override
    public boolean updateLikeInfo(RequestConsultingReviewDto requestConsultingReviewDto) {
        boolean isSuccess = true;

        // 로직
        
        // 좋아요 정보 수정

        return isSuccess;
    }

    @Override
    public boolean updateDesignerReviewScore(RequestConsultingReviewDto requestConsultingReviewDto) {
        boolean isSuccess = true;

        // 로직
        
        // 디자이너 평점 수정

        return isSuccess;
    }

    @Override
    public ResponseConsultingReviewInfoDto getConsultingResultDetailInfo(int consultingSeq) {
        ResponseConsultingReviewInfoDto responseConsultingReviewInfoDto = new ResponseConsultingReviewInfoDto();

        // 로직

        // 머리스타일 전부 가져오기

        // 이미지 전부 가져오기

        return responseConsultingReviewInfoDto;
    }

    @Override
    public boolean updateConsultingResultStyle(RequestConsultingUpdateDto requestConsultingUpdateDto) {
        boolean isSuccess = true;
        // 상담 결과 상세 테이블 스타일 업데이트

        return isSuccess;
    }

    @Override
    public boolean updateSelectedConsultingResultImage(RequestConsultingUpdateDto requestConsultingUpdateDto) {
        boolean isSuccess = true;

        // 상담 결과 선택 합성 이미지 업데이트

        return isSuccess;
    }
}
