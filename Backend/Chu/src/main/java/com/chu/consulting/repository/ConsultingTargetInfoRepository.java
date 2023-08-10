package com.chu.consulting.repository;

import com.chu.consulting.domain.ConsultingTargetInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsultingTargetInfoRepository extends JpaRepository<ConsultingTargetInfo, Integer> {

    List<ConsultingTargetInfo> findAllByConsultingSeq(int consultingSeq);
}
