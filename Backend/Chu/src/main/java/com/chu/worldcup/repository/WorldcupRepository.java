package com.chu.worldcup.repository;

import com.chu.global.domain.ImageDto;
import com.chu.global.domain.ImageWithHairInfoDto;
import com.chu.worldcup.domain.WorldcupRequestDto;
import com.chu.worldcup.domain.WorldcupStatisticsRequestDto;

import java.util.ArrayList;

public interface WorldcupRepository {

    ArrayList<ImageDto> getTopWorldcupImages();

    int createWorldcup(WorldcupRequestDto worldcupRequestDto);

    ArrayList<ImageWithHairInfoDto> getWorldcup(int worldcupSeq);

    boolean updateWorldcupStatistics(WorldcupStatisticsRequestDto worldcupStatisticsRequestDto);
}
