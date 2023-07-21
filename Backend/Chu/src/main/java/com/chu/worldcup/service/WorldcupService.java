package com.chu.worldcup.service;

import com.chu.global.domain.ResponseImageWithHairInfoDto;
import com.chu.worldcup.domain.WorldcupRequestDto;
import com.chu.worldcup.domain.WorldcupStatisticsRequestDto;

import java.util.ArrayList;

public interface WorldcupService {

    int createWorldcup(WorldcupRequestDto worldcupRequestDto);

    ArrayList<ResponseImageWithHairInfoDto> getWorldcup(int worldcupSeq);

    boolean updateWorldcupStatistics(WorldcupStatisticsRequestDto worldcupStatisticsRequestDto);
}
