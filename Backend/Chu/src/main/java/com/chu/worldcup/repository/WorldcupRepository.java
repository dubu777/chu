package com.chu.worldcup.repository;

import com.chu.global.domain.ImageDto;
import com.chu.worldcup.domain.ResponseImageWithHairInfoForWorldcupDto;
import com.chu.worldcup.domain.RequestWorldcupDto;
import com.chu.worldcup.domain.WorldcupStatisticsRequestDto;

import java.util.ArrayList;

public interface WorldcupRepository {

    ArrayList<ImageDto> getTopWorldcupImages();

    int createWorldcup(RequestWorldcupDto requestWorldcupDto);

    ArrayList<ResponseImageWithHairInfoForWorldcupDto> getWorldcup(int worldcupSeq);

    boolean updateWorldcupStatistics(WorldcupStatisticsRequestDto worldcupStatisticsRequestDto);
}
