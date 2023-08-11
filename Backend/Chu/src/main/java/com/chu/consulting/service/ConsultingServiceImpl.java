package com.chu.consulting.service;

import com.chu.consulting.domain.*;
import com.chu.consulting.repository.ConsultingRepository;
import com.chu.consulting.repository.ConsultingResultRepository;
import com.chu.consulting.repository.ConsultingTargetInfoRepository;
import com.chu.customer.domain.Customer;
import com.chu.customer.repository.CustomerRepository;
import com.chu.designer.domain.Designer;
import com.chu.designer.domain.DesignerLike;
import com.chu.designer.domain.DesignerPortfolio;
import com.chu.designer.repository.DesignerLikeRepository;
import com.chu.designer.repository.DesignerPortfolioRepository;
import com.chu.designer.repository.DesignerRepository;
import com.chu.designer.repository.ReservationAvailableSlotRepository;
import com.chu.global.domain.FaceDict;
import com.chu.global.domain.HairStyleDict;
import com.chu.global.repository.HairStyleDictRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import com.chu.consulting.repository.ConsultingVirtualImgRepository;
import com.chu.global.domain.ImageDto;
import com.chu.global.exception.Exception;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
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
    private final ConsultingResultRepository consultingResultRepository;
    private final HairStyleDictRepository hairStyleDictRepository;
    private final DesignerPortfolioRepository designerPortfolioRepository;
    private final ConsultingTargetInfoRepository consultingTargetInfoRepository;

    // 상담 예약하기
    @Override
    @Transactional
    public void postConsulting(RequestConsultingDto requestConsultingDto) {

        try{
            // requestConsultingDto -> entity 만들기
            Consulting consulting = requestConsultingDto.toConsultingEntity();

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

            // 고객이 선택한 포트폴리오 번호 consulting_target_info에 저장하기4
            List<Integer> portfolios = requestConsultingDto.getPortfolios();

            for(int p : portfolios){
                ConsultingTargetInfo cti = new ConsultingTargetInfo();

                cti.setConsulting(consulting);

                DesignerPortfolio designerPortfolio = designerPortfolioRepository.findBySeq(p);

                cti.setDesignerPortfolio(designerPortfolio);

                consultingTargetInfoRepository.save(cti);
            }


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

                    Customer customer = customerRepository.getCustomerBySeq(customerSeq);
                    Designer designer = designerRepository.getDesignerBySeq(designerSeq);
                    //designerLike.setCustomer(customer);
                    //designerLike.setDesigner(designer);
                    //designerLike.setLikeStatus(true);
                    //designerLike.setCreateDate(LocalDateTime.now());
                    DesignerLike designerLike = new DesignerLike(customer, designer,true, LocalDateTime.now());

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

    // 상담 결과 등록
    @Override
    @Transactional
    public void updateConsultingResult(RequestConsultingResultDto requestConsultingResultDto) {

        try{
            // 1) 상담 결과 내용 상담 테이블에 update 하기
            int consultingSeq = requestConsultingResultDto.getConsultingSeq();
            String result = requestConsultingResultDto.getReviewResult();

            consultingRepository.updateConsultingResult(consultingSeq, result);



            // 2) consulting_result 테이블에 헤어스타일 seq 추가하기

            // 2-1) 상담 seq로 Consulting 받아와서 얼굴형 받아오기
            Consulting consulting = consultingRepository.getConsultingBySeq(consultingSeq);

            // 2-2) Consulting으로 Customer 받아오기
            Customer customer = consulting.getCustomer();

            // 2-3) Customer로 얼굴형 받아오기
            int faceSeq = customer.getFaceDict().getSeq();

            // 2-4) 받아온 faceSeq + 헤어스타일Seq + 상담Seq : consulting_result 테이블에 저장하기
            int[] selectedHairStyle = requestConsultingResultDto.getSelectedHairStyle();
            for(int hairStyleSeq : selectedHairStyle){

                // consulting_seq 세팅
                ConsultingResult consultingResult = new ConsultingResult();
                consultingResult.setConsulting(consulting);

                // hair_style_seq 세팅
                HairStyleDict hd = new HairStyleDict();
                hd.setSeq(hairStyleSeq);
                consultingResult.setHairStyleDict(hd);

                // face_seq 세팅
                FaceDict fd = new FaceDict();
                fd.setSeq(faceSeq);
                consultingResult.setFaceDict(fd);

                // 저장
                consultingResultRepository.save(consultingResult);
            }



            // 3) consulting_virtual_img : isSelected 업데이트하기
            int[] selectedImgs = requestConsultingResultDto.getSelectedImgs();
            for(int imgSeq : selectedImgs){

                consultingVirtualImgRepository.updateIsSelected(imgSeq);

            }



        } catch(Exception e){
            e.printStackTrace();
        }
    }

    // 상담 결과 조회하기
    @Override
    public ResponseConsultingResultDto getConsultingResult(int consultingSeq) {

        ResponseConsultingResultDto  response = new ResponseConsultingResultDto();

        try{
            Consulting consulting = consultingRepository.findBySeq(consultingSeq);
            int designerSeq = consulting.getDesigner().getSeq();
            Designer designer = designerRepository.getDesignerBySeq(designerSeq);

            response.setName(designer.getName());
            response.setConsultingDate(consulting.getConsultingDate().getDate());
            response.setConsultingStartTime(consulting.getConsultingDate().getTime());


            // hairStyle setting
            List<String> list = new ArrayList<>();
            // consulting_result 테이블에서 상담 seq로 다 받아오기
            List<ConsultingResult> result = consultingResultRepository.findAllByConsultingSeq(consultingSeq);
            for(ConsultingResult cr : result){
                // hairStyleDict 받아오기
                HairStyleDict hd = hairStyleDictRepository.findBySeq(cr.getHairStyleDict().getSeq());

                list.add(hd.getHairStyleLabel());
            }
            response.setHairStyle(list);


            // reviewResult setting
            response.setReviewResult(consulting.getResult());


            // reviewImgs setting
            List<String> reviewImgs = new ArrayList<>();
            // consulting_virtual_img 테이블에서 consulting_seq로 다 받아오기
            List<ConsultingVirtualImg> imgs = consultingVirtualImgRepository.findAllByConsultingSeq(consultingSeq);

            for(ConsultingVirtualImg i : imgs){

                // 상담 결과로 선택된 사진이면
                if(i.getIsSelected()){

                    // 이미지 이름 받아오기
                    String img = i.getImagePath().getUploadImgName();

                    reviewImgs.add(img);
                }
            }

            response.setReviewImgs(reviewImgs);

        } catch(Exception e){
            e.printStackTrace();
        }
        return response;
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
    public ResponseParticipantConsulting participantConsulting(int consultingSeq) {

        ResponseParticipantConsulting response = new ResponseParticipantConsulting();

        try{
            Consulting consulting = consultingRepository.getConsultingBySeq(consultingSeq);

            response.setUrl(consulting.getUrl());


            // targetHair setting
            List<String> targetHair = new ArrayList<>();

            // 상담 타겟 이미지 정보 리스트
            List<ConsultingTargetInfo> targetInfos = consultingTargetInfoRepository.findAllByConsultingSeq(consultingSeq);

            for(ConsultingTargetInfo info : targetInfos){

                // 포트폴리오 사진 seq 구하기
                int portfolioSeq = info.getDesignerPortfolio().getSeq();

                // 포트폴리오 사진 seq로 타겟 이미지 이름(upload img name) 구하기
                DesignerPortfolio portfolio= designerPortfolioRepository.findBySeq(portfolioSeq);
                String uploadName = portfolio.getImagePath().getUploadImgName();

                targetHair.add(uploadName);
            }

            response.setTargetHair(targetHair);


            // confusionHair setting
            List<String> confusionHair = new ArrayList<>();

            // consultingSeq로 고객 상담 합성 사진 가져오기
            List<ConsultingVirtualImg> virtualImgs = consultingVirtualImgRepository.findAllByConsultingSeq(consultingSeq);

            for(ConsultingVirtualImg virtualImg : virtualImgs){

                String uploadName = virtualImg.getImagePath().getUploadImgName();

                confusionHair.add(uploadName);
            }

            response.setConfusionHair(confusionHair);

        } catch(Exception e){
            e.printStackTrace();
        }

        return response;
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


    // ============================== 민지: 이미지 파일 전송 테스트
    public void createVirtualImgFile(MultipartFile file) throws IOException {

        RestTemplate restTemplate = new RestTemplate();

        String url = "http://3.34.80.231:5000/save-img";
        // 파일 객체를 바이트 배열로 변환
        byte[] fileData = file.getBytes();
        log.info("파일 객체 바이트 배열로 변환 완료");

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // 요청 바디 설정
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", fileData); // 파일 데이터 추가

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // POST 요청 보내기
        ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);

        // 응답 처리
        if (response.getStatusCode().is2xxSuccessful()) {
            // 요청 성공
            String responseBody = response.getBody();
            // 파이썬 서버의 응답 처리 작업
        } else {
            // 요청 실패
            log.info("실패 왜 ,,");
            String errorMessage = response.getStatusCode().getReasonPhrase();
            // 에러 처리 작업
        }

    }
}