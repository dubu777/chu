package com.chu.consulting.service;

import com.chu.consulting.domain.ConsultingRequestDto;
import com.chu.consulting.domain.ConsultingResultDto;
import com.chu.consulting.repository.ConsultingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConsultingServiceImpl implements ConsultingService {

    private final ConsultingRepository consultingRepository;

    @Override
    public String participantConsulting(int consultingSeq) {
        return consultingRepository.participantConsulting(consultingSeq);
    }

    @Override
    public int createConsulting(ConsultingRequestDto consultingRequestDto) {
        return consultingRepository.createConsulting(consultingRequestDto);
    }

    @Override
    public boolean deleteConsulting(int consultingSeq) {
        return consultingRepository.deleteConsulting(consultingSeq);
    }

    @Override
    public ConsultingResultDto getConsultingResult(int consultingSeq) {
        return consultingRepository.getConsultingResult(consultingSeq);
    }
}
