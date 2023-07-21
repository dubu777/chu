package com.chu.consulting.service;

import com.chu.consulting.domain.ConsultingRequestDto;
import com.chu.consulting.domain.ConsultingResultDto;

public interface ConsultingService {
    String participantConsulting(int consultingSeq);

    int createConsulting(ConsultingRequestDto consultingRequestDto);

    boolean deleteConsulting(int consultingSeq);

    ConsultingResultDto getConsultingResult(int consultingSeq);

    boolean updateConsultingUrl(int consultingSeq, String url);
}
