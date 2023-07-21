package com.chu.consulting.repository;

import com.chu.consulting.domain.ConsultingRequestDto;
import com.chu.consulting.domain.ConsultingResultDto;
import com.chu.consulting.domain.ConsultingReviewDto;

public interface ConsultingRepository {

    String participantConsulting(int consultingSeq);

    int createConsulting(ConsultingRequestDto consultingRequestDto);

    boolean deleteConsulting(int consultingSeq);

    ConsultingResultDto getConsultingResult(int consultingSeq);

    boolean updateConsultingUrl(int consultingSeq, String url);

    boolean updateConsultingReview(ConsultingReviewDto consultingReviewDto);
}
