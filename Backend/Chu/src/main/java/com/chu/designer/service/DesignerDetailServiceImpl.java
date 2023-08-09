package com.chu.designer.service;

import com.chu.consulting.domain.ResponseConsultingDto;
import com.chu.customer.domain.Customer;
import com.chu.designer.domain.*;
import com.chu.designer.repository.DesignerRepository;
import com.chu.designer.repository.ReservationAvailableSlotRepository;
import com.chu.global.repository.DesignerTagInfoRepository;
import com.chu.designer.repository.DesignerDetailRepository;
import com.chu.designer.repository.DesignerRepository;
import com.chu.global.domain.*;
import com.chu.global.repository.HairStyleDictRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.*;
import java.util.List;


import static java.util.stream.IntStream.builder;

@Slf4j
@Service
@RequiredArgsConstructor
public class DesignerDetailServiceImpl implements DesignerDetailService {

    private final DesignerSearchService designerSearchService;
    private final DesignerDetailRepository designerDetailRepository;
    private final DesignerRepository designerRepository;
    private final DesignerTagInfoRepository designerTagInfoRepository;
    private final ReservationAvailableSlotRepository reservationAvailableSlotRepository;
    private final HairStyleDictRepository hairStyleDictRepository;
    private final PasswordEncoder bCryptPasswordEncoder;


    @Override
    public String getSavedImgFilePath(MultipartFile file) throws IOException {
        String uploadDir = "/chu/upload/images/designer/portfolio/";
        String fileName = file.getOriginalFilename();

        File directory = new File(uploadDir);
        String filePath = uploadDir + fileName;

        File destFile = new File(filePath);
        System.out.println(filePath);

        if (!directory.exists()) {
            boolean mkdirsResult = directory.mkdirs();
            if (mkdirsResult) {
                System.out.println("디렉토리 생성 성공");
            } else {
                System.out.println("디렉토리 생성 실패");
            }
        }

        file.transferTo(destFile);
        log.info("서비스 >>> 파일 저장 성공! filePath : " + filePath);
        return filePath;
    }

    @Override
    public String getUploadImgFilePath(MultipartFile file) throws IOException {
        String uploadName = file.getOriginalFilename();
        return uploadName;
    }

    @Override
    public int postPortfolioImage(int designerSeq, String img, String uploadName) {

        // 디자이너 정보 가져오기
        Designer designer = designerRepository.getDesignerBySeq(designerSeq);
        ImagePath imagePath = new ImagePath();
        imagePath.setSavedImgName(img);
        imagePath.setUploadImgName(uploadName);

        DesignerPortfolio designerPortfolio = new DesignerPortfolio(designer, imagePath);
        designerPortfolio.setCreatedDate(LocalDateTime.now());
        int imgSeq = -1;

        try{
            DesignerPortfolio designerPortfolioReturn = designerDetailRepository.save(designerPortfolio);
            imgSeq = designerPortfolioReturn.getSeq();
        } catch (Exception e){
            e.printStackTrace();
            return -1;
        }

        return imgSeq;
    }

    @Override
    public List<ImageDto> getPortfolio(int designerSeq) {

        List<ImageDto> imgList =new ArrayList<>();

        try{
            List<DesignerPortfolio> designerPortfolios = designerDetailRepository.getPortfolioByDesignerPortfolio(designerSeq);

            for (int i = 0; i < designerPortfolios.size(); i++) {
                ImageDto imgDto = new ImageDto();
                imgDto.setImgSeq(designerPortfolios.get(i).getSeq());
                imgDto.setImgName(designerPortfolios.get(i).getImagePath().getUploadImgName());
                imgList.add(imgDto);
            }

            return imgList;
        } catch (Exception e){

            e.printStackTrace();
            return null;
        }
    }

    @Override
    @Transactional
    public boolean deletePortfolioImage(int imageSeq) {
        try{
            designerDetailRepository.deleteBySeq(imageSeq);
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public ResponseDesignerMyPageDto getMyPageInfo(int designerSeq) {

        // 디자이너 정보
        Designer designer = designerRepository.getDesignerBySeq(designerSeq);
        if(designer == null) return null;

        // 디자이너가 잘하는 머리 스타일
        List<String> designerTags = new ArrayList<>();
        for( DesignerTagInfo dti : designerTagInfoRepository.findByDesignerSeqWithHairStyleDict(designerSeq)) {
            designerTags.add(dti.getHairStyleDict() != null ? dti.getHairStyleDict().getHairStyleLabel() : null);
        }

        // 디자이너가 그날 가능한 시간
        List<String> possibleTimes = reservationAvailableSlotRepository.findAvailableTimeByDesignerSeq(designerSeq);

        ResponseDesignerMyPageDto result = ResponseDesignerMyPageDto.builder()
                .name(designer.getName())
                .cost(designer.getCost())
                .email(designer.getEmail())
                .introduction(designer.getIntroduction())
                .img(designer.getImagePath() != null ? designer.getImagePath().getSavedImgName() : null)
                .hairStyleTag(designerTags)
                .selectTime(possibleTimes)
                .build();

        return result;
    }

    @Override
    @Transactional
    public boolean patchIntroduction(int designerSeq, String introduction) {
        Designer designer = designerRepository.getDesignerBySeq(designerSeq);
        if(designer==null) return false;
        designer.setIntroduction(introduction);

        return true;
    }

    //
//    @Override
//    public boolean patchImg(int designerSeq, String img) {
//        return designerDetailRepository.patchImg(designerSeq, img);
//    }
//
    @Override
    public ResponseDesignerMyPageUpdateShowDto getDesignerMyPageUpdateInfo(int designerSeq) {

        ResponseDesignerMyPageUpdateShowDto result = null;

        try {
            // 디자이너 관련 필드에 필요한 데이터
            Designer designer = designerRepository.getDesignerBySeq(designerSeq);

            // 전체 헤어스타일 태그 데이터
            List<HairStyleDto> allCutHairStyle = designerSearchService.showCategoryView(1);
            List<HairStyleDto> allPermHairStyle = designerSearchService.showCategoryView(2);

            // 해당 디자이너의 헤어스타일 태그 시퀀스
            List<Integer> myHairStyleSeq = new ArrayList<>();
            for (DesignerTagInfo dti : designerTagInfoRepository.findByDesignerSeq(designerSeq)) {
                myHairStyleSeq.add(dti.getHairStyleDict() != null ? dti.getHairStyleDict().getSeq() : null);   //1,2,5
            }

            // 해당 헤어스타일 시퀀스 하나와 헤어스타일 사전을 돌면서 해당 카테고리 데이터만 가져오기. 객체를 Map 변환
            Map<String, Object> myCutHairStyleMap = new HashMap<>();
            myCutHairStyleMap.put("hairStyleSeq", hairStyleDictRepository.findByMyHairStyleCategorySeq(1, myHairStyleSeq));

            Map<String, Object> myPermHairStyleMap = new HashMap<>();
            myPermHairStyleMap.put("hairStyleSeq", hairStyleDictRepository.findByMyHairStyleCategorySeq(2, myHairStyleSeq));

            result = ResponseDesignerMyPageUpdateShowDto.builder()
                    .name(designer.getName())
                    .id(designer.getId())
                    .email(designer.getEmail())
                    .price(designer.getCost())
                    .certificationNum(designer.getCertificationNum())
                    .salonName(designer.getSalonName())
                    .latitude(designer.getLatitude())
                    .longitude(designer.getLongitude())
                    .address(designer.getAddress())
                    .allCutHairStyle(allCutHairStyle)
                    .allPermHairStyle(allPermHairStyle)
                    .myCutHairStyle(myCutHairStyleMap)
                    .myPermHairStyle(myPermHairStyleMap)
                    .build();
        } catch (Exception e) {
            return null;
        }

        return result;
    }

    @Override
    @Transactional
    public boolean updateDesignerInfo(int designerSeq, RequestDesignerInfoUpdateDto updateDto) {

        try{
            Designer designer = designerRepository.getDesignerBySeq(designerSeq);
            designer.setName(updateDto.getName());
            designer.setEmail(updateDto.getEmail());
            designer.setCost(updateDto.getCost());
            designer.setPwd(updateDto.getPwd());
            designer.hashPassword(bCryptPasswordEncoder);    // 비밀번호 암호화
            designer.setSalonName(updateDto.getSalonName());
            designer.setLatitude(updateDto.getLatitude());
            designer.setLongitude(updateDto.getLongitude());
            designer.setAddress(updateDto.getAddress());

            // 해당 디자이너가 들어있는 데이터를 전부 삭제한다
            designerTagInfoRepository.deleteByDesignerSeq(designerSeq);

            // 새로 받은 값들을 해당 디자이너와 함께 데이터를 추가한다
            for(Integer tagSeq : updateDto.getMyHairStyleTag()) {
                DesignerTagInfo dti = new DesignerTagInfo();
                dti.setDesigner(designer);

                HairStyleDict hairStyleDict = hairStyleDictRepository.findBySeq(tagSeq);
                dti.setHairStyleDict(hairStyleDict);

                designerTagInfoRepository.save(dti);
            }
        } catch(Exception e) {
            return false;
        }
        return true;

    }
//
//    @Override
//    public boolean updatePossibleReservationTime(int designerSeq, RequestReservationPossibleDateAndTimeDto requestReservationPossibleDateAndTimeDto) {
////        1. 기존에 있던 해당 날짜 데이터 전부 삭제
//        boolean deleteSuccess = designerDetailRepository.deleteAlreadyPossibleTime(designerSeq, requestReservationPossibleDateAndTimeDto);
////        2. 새로 들어온 데이터 전부 삽입
//
//        boolean postSuccess = designerDetailRepository.postPossibleTime(designerSeq, requestReservationPossibleDateAndTimeDto);
//
//        if(deleteSuccess && postSuccess){
//            return true;
//        }
//        else{
//            return false;
//        }
//    }
//
//    @Override
//    public ArrayList<TimeDto> getPossibleReservationTime(int designerSeq, Date date) {
//        return designerDetailRepository.getPossibleReservationTime(designerSeq, date);
//    }
//
//    @Override
//    public ArrayList<ResponseConsultingDto> getReservationList(int designerSeq) {
//
//        ArrayList<ResponseConsultingDto> resultList = designerDetailRepository.getReservationList(designerSeq);
//
//        // 조인이 많아질 것 같으면 함수 나누기
//
//        // 갖고 온 데이터 기반으로 그 상담의 합성 얼굴 사진 뽑아오기
//
////        designerDetailRepository.getConfusionImages(consultingSeq);
//
//        return resultList;
//    }
//
//    @Override
//    public boolean postPortfolioImage(int designerSeq, String img) {
//        return designerDetailRepository.postPortfolioImage(designerSeq, img);
//    }
//
//    @Override
//    public boolean deletePortfolioImage(int designerSeq, int imageSeq) {
//        return designerDetailRepository.deletePortfolioImage(designerSeq, imageSeq);
//    }
}
