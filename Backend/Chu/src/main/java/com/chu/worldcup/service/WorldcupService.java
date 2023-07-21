package com.chu.worldcup.service;

import com.chu.global.domain.ResponseImageWithHairInfoDto;
import com.chu.worldcup.domain.RequestWorldcupDto;
import com.chu.worldcup.domain.WorldcupStatisticsRequestDto;

import java.util.ArrayList;

public interface WorldcupService {

    int createWorldcup(RequestWorldcupDto requestWorldcupDto);

    ArrayList<ResponseImageWithHairInfoDto> getWorldcup(int worldcupSeq);

    boolean updateWorldcupStatistics(WorldcupStatisticsRequestDto worldcupStatisticsRequestDto);
}
