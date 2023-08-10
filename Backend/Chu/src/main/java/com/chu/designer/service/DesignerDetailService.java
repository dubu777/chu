package com.chu.designer.service;

import com.chu.consulting.domain.ResponseConsultingDto;
import com.chu.designer.domain.RequestDesignerInfoUpdateDto;
import com.chu.designer.domain.RequestUpdatePossibleRsvTime;
import com.chu.designer.domain.ResponseDesignerMyPageUpdateShowDto;
import com.chu.designer.domain.ResponseDesignerMyPageDto;
import com.chu.global.domain.ImageDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DesignerDetailService {

    // 디자이너 마이페이지 정보 조회
    ResponseDesignerMyPageDto getMyPageInfo(int designerSeq);

    // 디자이너 한줄평 수정
    boolean patchIntroduction(int designerSeq, String introduction);
//
    // 디자이너 대표 이미지 수정
    boolean patchImg(int designerSeq, String img);

    // 디자이너 마이페이지 수정페이지 정보 조회
    ResponseDesignerMyPageUpdateShowDto getDesignerMyPageUpdateInfo(int designerSeq);

    // 디자이너 정보 수정
    boolean updateDesignerInfo(int designerSeq, RequestDesignerInfoUpdateDto requestDesignerInfoUpdateDto);
//
    // 디자이너 상담 가능 시간 수정
    void updatePossibleRsvTime(int designerSeq, RequestUpdatePossibleRsvTime requestUpdatePossibleRsvTime);
//
//    // 디자이너 해당 날짜 상담 가능 시간 내역 조회
//    ArrayList<TimeDto> getPossibleReservationTime(int designerSeq, Date date);
//
    // 디자이너 상담 예약 내역 조회
    List<ResponseConsultingDto> getReservationList(int designerSeq);
//
    // 디자이너 포트폴리오 조회
    List<ImageDto> getPortfolio(int designerSeq);

    // 이미지 경로 가져오기
    String getSavedImgFilePath(MultipartFile file) throws IOException;

    String getSavedImgFilePathDesignerProfile(MultipartFile file) throws IOException;

    String getUploadImgFilePath(MultipartFile file) throws IOException;
    // 디자이너 포트폴리오 업데이트
    int postPortfolioImage(int designerSeq, String img, String uploadName);

    // 디자이너 포트폴리오 삭제
    boolean deletePortfolioImage(int imageSeq);
}
