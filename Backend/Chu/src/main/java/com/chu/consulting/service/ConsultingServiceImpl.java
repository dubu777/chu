package com.chu.consulting.service;

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
    public boolean deleteConsulting(int consultingSeq) {
        return consultingRepository.deleteConsulting(consultingSeq);
    }
}
