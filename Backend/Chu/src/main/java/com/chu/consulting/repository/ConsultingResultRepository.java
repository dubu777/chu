package com.chu.consulting.repository;

import com.chu.consulting.domain.ConsultingResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsultingResultRepository extends JpaRepository<ConsultingResult, Integer> {
     //고객 로그인 4-2 (6개)
    List<ConsultingResult> findTop6BySeq(Integer faceSeq);
}
