package com.chu.consulting.service;

import com.chu.consulting.domain.*;

public interface ConsultingService {
    String participantConsulting(int consultingSeq);

    boolean createConsulting(RequestConsultingDto requestConsultingDto);

    boolean deleteConsulting(int consultingSeq);

    ResponseConsultingResultDto getConsultingResult(int consultingSeq);

    boolean updateConsultingUrl(int consultingSeq, String url);

    boolean updateConsultingReview(RequestConsultingReviewDto requestConsultingReviewDto);

    ResponseConsultingReviewInfoDto getConsultingResultDetailInfo(int consultingSeq);

    boolean updateConsultingResult(RequestConsultingUpdateDto requestConsultingUpdateDto);
}
