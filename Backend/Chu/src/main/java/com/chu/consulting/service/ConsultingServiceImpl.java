package com.chu.consulting.service;

import com.chu.consulting.domain.*;
import com.chu.consulting.repository.ConsultingRepository;
import com.chu.consulting.repository.ConsultingVirtualImgRepository;
import com.chu.global.domain.ImageDto;
import com.chu.global.exception.Exception;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConsultingServiceImpl implements ConsultingService {

    private final ConsultingRepository consultingRepository;
    private final ConsultingVirtualImgRepository consultingVirtualImgRepository;

    @Override
    public List<ImageDto> getConfusionImageList(int consultingSeq) {

        List<ImageDto> imageList = new ArrayList<>();
        try{
            imageList = consultingVirtualImgRepository.getVirtualImagesInfoBySeq(consultingSeq);
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
        return imageList;
    }

    @Override
    public String participantConsulting(int consultingSeq) {

        String sessionId = null;
        Consulting consulting = new Consulting();

        try{
            consulting = consultingRepository.getConsultingBySeq(consultingSeq);

            // 일치하는 상담이 없다면
            if(consulting == null){
                sessionId = null;
            }
            // 일치하는 사용자 존재
            else{
                sessionId = consulting.getUrl();
            }
        } catch(Exception e){
            e.printStackTrace();
        }

        return sessionId;
    }

    @Override
    @Transactional
    public void updateConsultingUrl(int consultingSeq, String url) {
        Consulting consulting = new Consulting();
        consulting.setUrl(url);
        String c_url = consulting.getUrl();
        consultingRepository.updateConsultingUrl(consultingSeq, c_url);
    }

    @Override
    public boolean createConsulting(RequestConsultingDto requestConsultingDto) {
        // 상담 가능 상태 테이블 상태 변경
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
        return true;
    }

    @Override
    public boolean deleteConsulting(int consultingSeq) {
        // 상담 가능 상태 테이블 상태 변경
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
        return true;
    }

    @Override
    public ResponseConsultingResultDto getConsultingResult(int consultingSeq) {
//        return consultingRepository.getConsultingResult(consultingSeq);
        return null;
    }

    @Override
    public boolean updateConsultingReview(RequestConsultingReviewDto requestConsultingReviewDto) {

        boolean isSuccess = true;
        // 로직

//        // 해당 상담 번호로 리뷰 등록
//        consultingRepository.updateReviewContent(requestConsultingReviewDto);
//
//        // 고객 정보 뽑아서 좋아요 테이블에 관계 없다면 추가
//        consultingRepository.updateLikeInfo(requestConsultingReviewDto);
//
//        // 디자이너 평점 수정
//        consultingRepository.updateDesignerReviewScore(requestConsultingReviewDto);
//
        return isSuccess;
    }

    @Override
    public ResponseConsultingReviewInfoDto getConsultingResultDetailInfo(int consultingSeq) {
//        return consultingRepository.getConsultingResultDetailInfo(consultingSeq);
        return null;
    }

    @Override
    public boolean updateConsultingResult(RequestConsultingUpdateDto requestConsultingUpdateDto) {

        boolean isSuccess = true;

        // 상담 결과 헤어스타일 등록
//        consultingRepository.updateConsultingResultStyle(requestConsultingUpdateDto);
//
//        // 상담 결과 이미지 등록
//        consultingRepository.updateSelectedConsultingResultImage(requestConsultingUpdateDto);

        return isSuccess;
    }
}
