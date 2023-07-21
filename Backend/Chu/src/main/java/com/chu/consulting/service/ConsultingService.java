package com.chu.consulting.service;

import com.chu.consulting.domain.ConsultingRequestDto;
import com.chu.consulting.domain.ConsultingResultDto;
import com.chu.consulting.domain.ConsultingReviewDto;
import com.chu.consulting.domain.ConsultingReviewInfoDto;

public interface ConsultingService {
    String participantConsulting(int consultingSeq);

    int createConsulting(ConsultingRequestDto consultingRequestDto);

    boolean deleteConsulting(int consultingSeq);

    ConsultingResultDto getConsultingResult(int consultingSeq);

    boolean updateConsultingUrl(int consultingSeq, String url);

    boolean updateConsultingReview(ConsultingReviewDto consultingReviewDto);

    ConsultingReviewInfoDto getConsultingResultDetailInfo(int consultingSeq);
}
