package com.chu.consulting.service;

import com.chu.consulting.domain.*;

public interface ConsultingService {
    String participantConsulting(int consultingSeq);

    int createConsulting(ConsultingRequestDto consultingRequestDto);

    boolean deleteConsulting(int consultingSeq);

    ConsultingResultDto getConsultingResult(int consultingSeq);

    boolean updateConsultingUrl(int consultingSeq, String url);

    boolean updateConsultingReview(ConsultingReviewDto consultingReviewDto);

    ConsultingReviewInfoDto getConsultingResultDetailInfo(int consultingSeq);

    boolean updateConsultingResult(ConsultingUpdateDto consultingUpdateDto);
}
