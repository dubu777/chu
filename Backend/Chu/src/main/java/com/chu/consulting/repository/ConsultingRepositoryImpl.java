package com.chu.consulting.repository;

import com.chu.consulting.domain.*;
import lombok.RequiredArgsConstructor;
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
    public int createConsulting(ConsultingRequestDto consultingRequestDto) {
        int row = 0;

        // 로직
        // 상담 등록 후 행 반환

        return row;
    }

    @Override
    public boolean deleteConsulting(int consultingSeq) {
        boolean isSuccess = true;

        // 로직
        // 상담 취소니까
        // 가능 시간 테이블에서 그 녀석 상태 변경
        // 상담 테이블에서 그 녀석 삭제 ( 삭제 하는게 맞는가 상태 컬럼 추가하는게 맞는가)

        return isSuccess;
    }

    @Override
    public ConsultingResultDto getConsultingResult(int consultingSeq) {
        ConsultingResultDto consultingResultDto = new ConsultingResultDto();

        // 로직

        // 상담 결과 반환

        // 상담 결과 헤어스타일 반환

        // 상담 결과 사진들 반환

        return consultingResultDto;
    }

    @Override
    public boolean updateConsultingUrl(int consultingSeq, String url) {
        
        boolean isSuccess = true;
        
        // 로직
        
        // 해당 상담 시퀀스에 url 삽입
        
        return isSuccess;
    }

    @Override
    public boolean updateConsultingReview(ConsultingReviewDto consultingReviewDto) {
        boolean isSuccess = true;

        // 로직

        // 해당 상담 번호로 리뷰 등록

        // 고객 정보 뽑아서 좋아요 테이블에 관계 없다면 추가

        return isSuccess;
    }

    @Override
    public ConsultingReviewInfoDto getConsultingResultDetailInfo(int consultingSeq) {
        ConsultingReviewInfoDto consultingReviewInfoDto = new ConsultingReviewInfoDto();

        // 로직

        // 머리스타일 전부 가져오기

        // 이미지 전부 가져오기

        return consultingReviewInfoDto;
    }

    @Override
    public boolean updateConsultingResult(ConsultingUpdateDto consultingUpdateDto) {

        boolean isSuccess = true;

        // 로직

        // 상담 리뷰 정보, 상세 정보 저장

        return isSuccess;
    }
}
