package com.chu.consulting.service;

import com.chu.consulting.domain.*;
import com.chu.consulting.repository.ConsultingRepository;
import com.chu.customer.domain.Customer;
import com.chu.customer.repository.CustomerRepository;
import com.chu.designer.domain.Designer;
import com.chu.designer.domain.DesignerLike;
import com.chu.designer.repository.DesignerLikeRepository;
import com.chu.designer.repository.DesignerRepository;
import com.chu.designer.repository.ReservationAvailableSlotRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import com.chu.consulting.repository.ConsultingVirtualImgRepository;
import com.chu.global.domain.ImageDto;
import com.chu.global.exception.Exception;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConsultingServiceImpl implements ConsultingService {

    private final ConsultingRepository consultingRepository;
    private final ReservationAvailableSlotRepository reservationAvailableSlotRepository;
    private final ConsultingVirtualImgRepository consultingVirtualImgRepository;
    private final DesignerLikeRepository designerLikeRepository;
    private final CustomerRepository customerRepository;
    private final DesignerRepository designerRepository;

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
            reservationAvailableSlotRepository.updateReserveSlotStateToR(date, time, designerSeq);

            // 예약 완료 후 상담 idx 받기
            int seq = consulting.getSeq();

            // SessionId 설정
            String url = seq + "@" + consulting.getCustomer().getSeq() + "&" + consulting.getDesigner().getSeq();

            // 생성한 SessionId db에 업데이트하기
            consultingRepository.updateConsultingUrl(seq, url);


        } catch(Exception e){
            e.printStackTrace();
        }
    }

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

    // 상담 후기 등록
    @Override
    @Transactional
    public void updateConsultingReview(RequestConsultingReviewDto requestConsultingReviewDto) {

        try{
            // consulting seq
            int consultingSeq = requestConsultingReviewDto.getConsultingSeq();
            Consulting consulting = consultingRepository.getConsultingBySeq(consultingSeq);
            int customerSeq = consulting.getCustomer().getSeq();
            int designerSeq = consulting.getDesigner().getSeq();

            // 좋아요 눌렀으면 update
            if(requestConsultingReviewDto.getIsLike()){
                // designer_like 테이블에 (고객 seq, 디자이너 seq) 쌍 존재하는지 확인
                DesignerLike entity = null;
                entity = designerLikeRepository.findByCustomerSeqAndDesignerSeq(customerSeq, designerSeq);

                // 테이블에 데이터 존재하지 않으면 삽입
                if(entity == null){
                    DesignerLike designerLike = new DesignerLike();

                    Customer customer = customerRepository.getCustomerBySeq(customerSeq);
                    designerLike.setCustomer(customer);

                    Designer designer = designerRepository.getDesignerBySeq(designerSeq);
                    designerLike.setDesigner(designer);

                    designerLike.setLikeStatus(true);

                    designerLike.setCreateDate(LocalDateTime.now());

                    designerLikeRepository.save(designerLike);
                }
                // 데이터 존재하면 status만 바꾸기
                else{
                    designerLikeRepository.updateStatusTrue(customerSeq, designerSeq);
                }
            }

            // 평점, reviewContent 업데이트하기
            consultingRepository.updateScoreAndContent(requestConsultingReviewDto.getReviewScore(), requestConsultingReviewDto.getReviewContent(), consultingSeq);

            // 평점 등록 후 디자이너 평점 업데이트하기
            // 평점 구하기
            double reviewScore = consultingRepository.getReviewScoreByDesigner(designerSeq);
//            System.out.println(">>>>" + reviewScore);

            // 평점 업데이트하기
            designerRepository.updateReviewScore(reviewScore, designerSeq);

        } catch(Exception e){
            e.printStackTrace();
        }
    }


    // 상담 취소하기
    @Override
    @Transactional
    public void cancelConsulting(int consultingSeq) {

        try{
            // 1) consulting 테이블 cancel_date 컬럼 업데이트하기
            LocalDateTime now = LocalDateTime.now();
            consultingRepository.updateCancelDate(consultingSeq, now);


            // 2) reservation_available_slot 테이블 state 컬럼 P로 바꾸기
            // 2-1) 상담 번호로 상담 받아오기
            Consulting consulting = consultingRepository.getConsultingBySeq(consultingSeq);
            // 2-2) 상담에서 날짜, 시간, 디자이너 seq 뽑기
            String date = consulting.getConsultingDate().getDate();
            String time = consulting.getConsultingDate().getTime();
            int designerSeq = consulting.getDesigner().getSeq();
            // 2-3) reservation_available_slot 테이블 state 컬럼 P로 update
            reservationAvailableSlotRepository.updateReserveSlotStateToP(date, time, designerSeq);

        } catch(Exception e){
            e.printStackTrace();
        }
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
//        return true;
    

//    @Override
//    public ResponseConsultingResultDto getConsultingResult(int consultingSeq) {
////        return consultingRepository.getConsultingResult(consultingSeq);
//        return null;
//    }

//    @Override
//    public boolean updateConsultingReview(RequestConsultingReviewDto requestConsultingReviewDto) {
//
//        boolean isSuccess = true;
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
//        return isSuccess;
//    }
//
//    @Override
//    public ResponseConsultingReviewInfoDto getConsultingResultDetailInfo(int consultingSeq) {
////        return consultingRepository.getConsultingResultDetailInfo(consultingSeq);
//        return null;
//    }
//
//    @Override
//    public boolean updateConsultingResult(RequestConsultingUpdateDto requestConsultingUpdateDto) {
//
//        boolean isSuccess = true;
//
//        // 상담 결과 헤어스타일 등록
////        consultingRepository.updateConsultingResultStyle(requestConsultingUpdateDto);
////
////        // 상담 결과 이미지 등록
////        consultingRepository.updateSelectedConsultingResultImage(requestConsultingUpdateDto);
////
////        return isSuccess;
////    }
//    }
}