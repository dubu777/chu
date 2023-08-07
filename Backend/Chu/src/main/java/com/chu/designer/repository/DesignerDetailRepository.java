package com.chu.designer.repository;

import com.chu.consulting.domain.ResponseConsultingDto;
import com.chu.designer.domain.*;
import com.chu.global.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public interface DesignerDetailRepository extends JpaRepository<DesignerPortfolio, Integer> {
    //
//    Designer getDesignerInfo(int designerSeq);
//
//    ArrayList<ResponseHairStyleLabelDto> getHairStyleTag(int designerSeq);
//
//    ArrayList<TimeDto> getPossibleTimeList(int designerSeq);
//
//    boolean patchIntroduction(int designerSeq, String introduction);
//
//    boolean patchImg(int designerSeq, String img);
//
//    ResponseDesignerAreaInfo getDesignerAreaInfo(int designerSeq);
//
//    ArrayList<ResponseHairStyleDto> getAllCutHairStyle();
//
//    ArrayList<ResponsePermHairStyleDto> getAllPermHairStyle();
//
//    ArrayList<ResponseHairStyleDto> getMyCutHairStyle(int designerSeq);
//
//    ArrayList<ResponsePermHairStyleDto> getMyPermHairStyle(int designerSeq);
//
//    boolean updateDesignerInfo(int designerSeq, RequestDesignerInfoUpdateDto requestDesignerInfoUpdateDto);
//
//    boolean deleteAlreadyPossibleTime(int designerSeq, RequestReservationPossibleDateAndTimeDto requestReservationPossibleDateAndTimeDto);
//
//    boolean postPossibleTime(int designerSeq, RequestReservationPossibleDateAndTimeDto requestReservationPossibleDateAndTimeDto);
//
//    ArrayList<TimeDto> getPossibleReservationTime(int designerSeq, Date date);
//
//    ArrayList<ResponseConsultingDto> getReservationList(int designerSeq);
//
//    ArrayList<ImageDto> getConfusionImages(int consultinSeq);
//

    @Query(value = "SELECT seq, imagePath.savedImgName FROM DesignerPortfolio WHERE designer.seq = :designerSeq")
    List<ImageDto> getPortfolioByDesignerPortfolio(int designerSeq);

    void deleteBySeq(int imageSeq);
}
