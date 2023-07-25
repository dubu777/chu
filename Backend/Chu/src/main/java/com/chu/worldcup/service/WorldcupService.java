package com.chu.worldcup.service;

import com.chu.worldcup.domain.ResponseImageWithHairInfoForWorldcupDto;
import com.chu.worldcup.domain.RequestWorldcupDto;
import com.chu.worldcup.domain.RequestWorldcupStatisticsDto;

import java.util.ArrayList;

public interface WorldcupService {

    // 월드컵 생성
    int createWorldcup(RequestWorldcupDto requestWorldcupDto);

    // 월드컵 정보 조회
    ArrayList<ResponseImageWithHairInfoForWorldcupDto> getWorldcup(int worldcupSeq);

    // 월드컵 통계 수정
    boolean updateWorldcupStatistics(RequestWorldcupStatisticsDto requestWorldcupStatisticsDto);
}
