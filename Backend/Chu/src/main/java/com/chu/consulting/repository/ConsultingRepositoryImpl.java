package com.chu.consulting.repository;

import com.chu.consulting.domain.ConsultingResultDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Slf4j
@Repository
@Transactional
public class ConsultingRepositoryImpl implements ConsultingRepository {
    // DB CONN

    @Override
    public String participantConsulting(int consultingSeq) {
        String url = null;
        // 로직
        // 해당 상담 seq url 반환
        
        return url;
    }

    @Override
    public boolean deleteConsulting(int consultingSeq) {
        boolean isSuccess = true;

        // 로직
        // 상담 취소니까
        // 가능 시간 테이블에서 그 녀석 상태 변경
        // 상담 테이블에서 그 녀석 삭제 ( 삭제 하는게 맞는가 상태 컬럼 추가하는게 맞는가)

        return isSuccess;
    }

    @Override
    public ConsultingResultDto getConsultingResult(int consultingSeq) {
        ConsultingResultDto consultingResultDto = new ConsultingResultDto();

        // 로직

        // 상담 결과 반환

        // 상담 결과 헤어스타일 반환

        // 상담 결과 사진들 반환

        return consultingResultDto;
    }
}
