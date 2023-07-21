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

    boolean updateConsultingReview(ConsultingReviewDto consultingReviewDto);

    ConsultingReviewInfoDto getConsultingResultDetailInfo(int consultingSeq);

    boolean updateConsultingResult(ConsultingUpdateDto consultingUpdateDto);
}
