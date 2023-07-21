package com.chu.worldcup.repository;

import com.chu.global.domain.ImageDto;
import com.chu.global.domain.ResponseImageWithHairInfoDto;
import com.chu.worldcup.domain.WorldcupRequestDto;
import com.chu.worldcup.domain.WorldcupStatisticsRequestDto;

import java.util.ArrayList;

public interface WorldcupRepository {

    ArrayList<ImageDto> getTopWorldcupImages();

    int createWorldcup(WorldcupRequestDto worldcupRequestDto);

    ArrayList<ResponseImageWithHairInfoDto> getWorldcup(int worldcupSeq);

    boolean updateWorldcupStatistics(WorldcupStatisticsRequestDto worldcupStatisticsRequestDto);
}
