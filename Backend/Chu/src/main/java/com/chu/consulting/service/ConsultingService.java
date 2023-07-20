package com.chu.consulting.service;

import com.chu.consulting.domain.ConsultingResultDto;

public interface ConsultingService {
    String participantConsulting(int consultingSeq);

    boolean deleteConsulting(int consultingSeq);

    ConsultingResultDto getConsultingResult(int consultingSeq);
}
