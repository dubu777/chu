package com.chu.consulting.service;

import com.chu.consulting.domain.*;
import com.chu.global.domain.ImageDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;



public interface ConsultingService {
    // 상담 참여
    ResponseParticipantConsulting participantConsulting(int consultingSeq);

    // 상담 예약하기
    void postConsulting(RequestConsultingDto requestConsultingDto);

    // 상담 취소하기
    void cancelConsulting(int consultingSeq);

    // 상담 URL 업데이트
    void updateConsultingUrl(int consultingSeq, String url);

    // 상담 합성 사진 가져오기
    List<ImageDto> getConfusionImageList(int consultingSeq);

    // 상담 후기 등록
    void updateConsultingReview(RequestConsultingReviewDto requestConsultingReviewDto);

    // 상담 결과 등록
    void updateConsultingResult(RequestConsultingResultDto requestConsultingResultDto);

    // 상담 결과 조회
    ResponseConsultingResultDto getConsultingResult(int consultingSeq);

//    // 상담 신청, 내역 생성
//    boolean createConsulting(RequestConsultingDto requestConsultingDto);
//

//
//    // 상담 결과 조회
//    ResponseConsultingResultDto getConsultingResult(int consultingSeq);
//
//    // 상담 URL 업데이트
//    boolean updateConsultingUrl(int consultingSeq, String url);
//
//    // 상담 후기 수정
//    boolean updateConsultingReview(RequestConsultingReviewDto requestConsultingReviewDto);
//
//    // 상담 상세 결과 조회
//    ResponseConsultingReviewInfoDto getConsultingResultDetailInfo(int consultingSeq);
//
//    // 상담 결과 수정
//    boolean updateConsultingResult(RequestConsultingUpdateDto requestConsultingUpdateDto);




// ===================== 민지
    void createVirtualImgFile(MultipartFile file) throws IOException;

 

    
}
