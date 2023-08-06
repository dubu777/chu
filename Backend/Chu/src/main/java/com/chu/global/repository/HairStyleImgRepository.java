package com.chu.global.repository;

import com.chu.global.domain.HairStyleImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HairStyleImgRepository extends JpaRepository<HairStyleImg, Integer> {
    // 헤어스타일seq로 찾기
    HairStyleImg findBySeq(int hairStyleSeq);

    // seq로 5개 가져오기
    List<HairStyleImg> findTop5ByOrderBySeq();

}
