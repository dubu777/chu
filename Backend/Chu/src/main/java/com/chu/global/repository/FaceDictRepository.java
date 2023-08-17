package com.chu.global.repository;

import com.chu.global.domain.FaceDict;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FaceDictRepository extends JpaRepository<FaceDict, Integer> {

    FaceDict findBySeq(int seq);
}
