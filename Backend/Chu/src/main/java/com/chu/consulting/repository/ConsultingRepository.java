package com.chu.consulting.repository;

import com.chu.consulting.domain.*;

public interface ConsultingRepository {

    String participantConsulting(int consultingSeq);

    boolean createConsulting(RequestConsultingDto requestConsultingDto);

    boolean updatePossibleConsulting(int consultingSeq);

    boolean deleteConsulting(int consultingSeq);

    boolean updateImpossibleConsulting(RequestConsultingDto requestConsultingDto);

    ConsultingResultDto getConsultingResult(int consultingSeq);

    boolean updateConsultingUrl(int consultingSeq, String url);

    boolean updateReviewContent(RequestConsultingReviewDto requestConsultingReviewDto);

    boolean updateLikeInfo(RequestConsultingReviewDto requestConsultingReviewDto);

    boolean updateDesignerReviewScore(RequestConsultingReviewDto requestConsultingReviewDto);

    ConsultingReviewInfoDto getConsultingResultDetailInfo(int consultingSeq);

    boolean updateConsultingResult(ConsultingUpdateDto consultingUpdateDto);
}
