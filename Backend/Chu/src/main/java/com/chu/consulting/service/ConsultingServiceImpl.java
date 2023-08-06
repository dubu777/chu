package com.chu.consulting.service;

import com.chu.consulting.domain.*;
import com.chu.consulting.repository.ConsultingRepository;
import com.chu.designer.repository.ReservationAvailableSlotRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConsultingServiceImpl implements ConsultingService {

    private final ConsultingRepository consultingRepository;
    private final ReservationAvailableSlotRepository reservationAvailableSlotRepository;

    // 상담 예약하기
    @Override
    @Transactional
    public void postConsulting(Consulting consulting) {

        try{
            consulting.setCreatedDate(LocalDateTime.now());
            // 상담 예약하기
            consultingRepository.save(consulting);

            // 예약 완료 후 ‘reservation_available_slot’ 테이블 ‘state’ 컬럼 ‘R’로 바꾸기
            String date = consulting.getConsultingDate().getDate();
            String time = consulting.getConsultingDate().getTime();
            int designerSeq = consulting.getDesigner().getSeq();
            reservationAvailableSlotRepository.updateReserveSlotState(date, time, designerSeq);

        } catch(Exception e){
            e.printStackTrace();
        }
    }

//    @Override
//    public String participantConsulting(int consultingSeq) {
//        return consultingRepository.participantConsulting(consultingSeq);
//    }
//
//    @Override
//    public boolean createConsulting(RequestConsultingDto requestConsultingDto) {
//        // 상담 가능 상태 테이블 상태 변경
//        boolean updateImpossibleConsulting = consultingRepository.updateImpossibleConsulting(requestConsultingDto);
//        // 상담 테이블 행 추가
//        boolean createConsultingState = consultingRepository.createConsulting(requestConsultingDto);
//
//        if (updateImpossibleConsulting && createConsultingState) {
//            return true;
//        }
//        else{
//            return false;
//        }
//    }
//
//    @Override
//    public boolean deleteConsulting(int consultingSeq) {
//        // 상담 가능 상태 테이블 상태 변경
//        boolean updatePossibleConsulting = consultingRepository.updatePossibleConsulting(consultingSeq);
//        // 상담 테이블 삭제 혹은 상태 변경 ERD 변화 필요 가능성 대화 필요
//        boolean deleteConsultingState = consultingRepository.deleteConsulting(consultingSeq);
//
//        if (updatePossibleConsulting && deleteConsultingState) {
//            return true;
//        }
//        else{
//            return false;
//        }
//    }
//
//    @Override
//    public ResponseConsultingResultDto getConsultingResult(int consultingSeq) {
//        return consultingRepository.getConsultingResult(consultingSeq);
//    }
//
//    @Override
//    public boolean updateConsultingUrl(int consultingSeq, String url) {
//        return consultingRepository.updateConsultingUrl(consultingSeq, url);
//    }
//
//    @Override
//    public boolean updateConsultingReview(RequestConsultingReviewDto requestConsultingReviewDto) {
//
//        boolean isSuccess = true;
//        // 로직
//
//        // 해당 상담 번호로 리뷰 등록
//        consultingRepository.updateReviewContent(requestConsultingReviewDto);
//
//        // 고객 정보 뽑아서 좋아요 테이블에 관계 없다면 추가
//        consultingRepository.updateLikeInfo(requestConsultingReviewDto);
//
//        // 디자이너 평점 수정
//        consultingRepository.updateDesignerReviewScore(requestConsultingReviewDto);
//
//        return isSuccess;
//    }
//
//    @Override
//    public ResponseConsultingReviewInfoDto getConsultingResultDetailInfo(int consultingSeq) {
//        return consultingRepository.getConsultingResultDetailInfo(consultingSeq);
//    }
//
//    @Override
//    public boolean updateConsultingResult(RequestConsultingUpdateDto requestConsultingUpdateDto) {
//
//        boolean isSuccess = true;
//
//        // 상담 결과 헤어스타일 등록
//        consultingRepository.updateConsultingResultStyle(requestConsultingUpdateDto);
//
//        // 상담 결과 이미지 등록
//        consultingRepository.updateSelectedConsultingResultImage(requestConsultingUpdateDto);
//
//        return isSuccess;
//    }
}
