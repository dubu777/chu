package com.chu.designer.service;

import com.chu.consulting.domain.ResponseConsultingDto;
import com.chu.designer.domain.RequestDesignerInfoUpdateDto;
import com.chu.designer.domain.RequestReservationPossibleDateAndTimeDto;
import com.chu.designer.domain.ResponseDesignerMyPageUpdateShowDto;
import com.chu.designer.domain.ResponseDesignerMyPageDto;
import com.chu.global.domain.ImageDto;
import com.chu.global.domain.TimeDto;

import java.sql.Date;
import java.util.ArrayList;

public interface DesignerDetailService {

    ResponseDesignerMyPageDto getMyPageInfo(int designerSeq);

    boolean patchIntroduction(int designerSeq, String introduction);

    boolean patchImg(int designerSeq, String img);

    ResponseDesignerMyPageUpdateShowDto getDesignerMyPageUpdateInfo(int designerSeq);

    boolean updateDesignerInfo(int designerSeq, RequestDesignerInfoUpdateDto requestDesignerInfoUpdateDto);

    boolean updatePossibleReservationTime(int designerSeq, RequestReservationPossibleDateAndTimeDto requestReservationPossibleDateAndTimeDto);

    ArrayList<TimeDto> getPossibleReservationTime(int designerSeq, Date date);

    ArrayList<ResponseConsultingDto> getReservationList(int designerSeq);

    ArrayList<ImageDto> getPortfolio(int designerSeq);
}
