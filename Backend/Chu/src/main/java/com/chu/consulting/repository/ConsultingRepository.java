package com.chu.consulting.repository;

import com.chu.consulting.domain.ConsultingResultDto;

public interface ConsultingRepository {

    String participantConsulting(int consultingSeq);

    boolean deleteConsulting(int consultingSeq);

    ConsultingResultDto getConsultingResult(int consultingSeq);
}
