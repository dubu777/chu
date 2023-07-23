package com.chu.designer.service;

import com.chu.designer.domain.RequestDesignerInfoUpdateDto;
import com.chu.designer.domain.RequestReservationPossibleDateAndTimeDto;
import com.chu.designer.domain.ResponseDesignerMyPageUpdateShowDto;
import com.chu.designer.domain.ResponseDesignerMyPageDto;

public interface DesignerDetailService {

    ResponseDesignerMyPageDto getMyPageInfo(int designerSeq);

    boolean patchIntroduction(int designerSeq, String introduction);

    boolean patchImg(int designerSeq, String img);

    ResponseDesignerMyPageUpdateShowDto getDesignerMyPageUpdateInfo(int designerSeq);

    boolean updateDesignerInfo(int designerSeq, RequestDesignerInfoUpdateDto requestDesignerInfoUpdateDto);

    boolean updatePossibleReservationTime(int designerSeq, RequestReservationPossibleDateAndTimeDto requestReservationPossibleDateAndTimeDto);
}
