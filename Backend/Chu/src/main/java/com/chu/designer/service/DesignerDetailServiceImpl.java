package com.chu.designer.service;

import com.chu.consulting.domain.ResponseConsultingDto;
import com.chu.customer.domain.Customer;
import com.chu.designer.domain.*;
import com.chu.designer.repository.DesignerDetailRepository;
import com.chu.designer.repository.DesignerRepository;
import com.chu.global.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DesignerDetailServiceImpl implements DesignerDetailService {

    private final DesignerDetailRepository designerDetailRepository;
    private final DesignerRepository designerRepository;

    @Override
    public String getSavedImgFilePath(MultipartFile file) throws IOException {
        String uploadDir = "/chu/upload/images/designer/";
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
    public int postPortfolioImage(int designerSeq, String img) {

        // 디자이너 정보 가져오기
        Designer designer = designerRepository.getDesignerBySeq(designerSeq);
        ImagePath imagePath = new ImagePath();
        imagePath.setSavedImgName(img);

        DesignerPortfolio designerPortfolio = new DesignerPortfolio(designer, imagePath);

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
                imgDto.setImgName(designerPortfolios.get(i).getImagePath().getSavedImgName());
                imgList.add(imgDto);
            }

            return imgList;
        } catch (Exception e){

            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean deletePortfolioImage(int imageSeq) {
        try{
            designerDetailRepository.deleteBySeq(imageSeq);
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }
//    private final DesignerDetailRepository designerDetailRepository;
//
//    @Override
//    public ResponseDesignerMyPageDto getMyPageInfo(int designerSeq) {
//        ResponseDesignerMyPageDto responseDesignerMyPageDto = new ResponseDesignerMyPageDto();
//        // 디자이너 정보
//        Designer designer = designerDetailRepository.getDesignerInfo(designerSeq);
//
//        // 여기서 필요한거 뽑아쓰기
//
//        // 디자이너가 잘하는 머리 스타일
//        ArrayList<ResponseHairStyleLabelDto> responseHairStyleLabelDtoArrayList = designerDetailRepository.getHairStyleTag(designerSeq);
//
//        // 디자이너가 그날 가능한 시간
//        ArrayList<TimeDto> possibleTimeList = designerDetailRepository.getPossibleTimeList(designerSeq);
//
//
//        return responseDesignerMyPageDto;
//    }
//
//    @Override
//    public boolean patchIntroduction(int designerSeq, String introduction) {
//        return designerDetailRepository.patchIntroduction(designerSeq, introduction);
//    }
//
//    @Override
//    public boolean patchImg(int designerSeq, String img) {
//        return designerDetailRepository.patchImg(designerSeq, img);
//    }
//
//    @Override
//    public ResponseDesignerMyPageUpdateShowDto getDesignerMyPageUpdateInfo(int designerSeq) {
//        ResponseDesignerMyPageUpdateShowDto responseDesignerMyPageUpdateShowDto = new ResponseDesignerMyPageUpdateShowDto();
//
//        Designer designer = designerDetailRepository.getDesignerInfo(designerSeq);
//
//        // 생각해보니 디자이너 지역이 디자이너 안에 있네.. 이거 한 번 고쳐주라.. 나 지금 0721 2256인데 너무 힘들거든,,
//
//        ResponseDesignerAreaInfo designerAreaInfo = designerDetailRepository.getDesignerAreaInfo(designerSeq);
//
//        ArrayList<ResponseHairStyleDto> allCutHairStyle = designerDetailRepository.getAllCutHairStyle();
//
//        ArrayList<ResponsePermHairStyleDto> allPermHairStyle = designerDetailRepository.getAllPermHairStyle();
//
//        ArrayList<ResponseHairStyleDto> myCutHairStyle = designerDetailRepository.getMyCutHairStyle(designerSeq);
//
//        ArrayList<ResponsePermHairStyleDto> myPermHairStyle = designerDetailRepository.getMyPermHairStyle(designerSeq);
//
//        return responseDesignerMyPageUpdateShowDto;
//    }
//
//    @Override
//    public boolean updateDesignerInfo(int designerSeq, RequestDesignerInfoUpdateDto requestDesignerInfoUpdateDto) {
//
//        // 디자이너 정보 수정
//        boolean isSuccess = designerDetailRepository.updateDesignerInfo(designerSeq, requestDesignerInfoUpdateDto);
//
//        // 디자이너 잘하는 헤어스타일 수정
//        // 이게 전부 삭제하고 다시 전부 넣을지 고민해보고 해야할듯
//
//        return true;
//    }
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
//
}
