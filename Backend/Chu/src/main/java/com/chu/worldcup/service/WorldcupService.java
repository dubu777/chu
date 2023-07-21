package com.chu.worldcup.service;

import com.chu.worldcup.domain.ResponseImageWithHairInfoForWorldcupDto;
import com.chu.worldcup.domain.RequestWorldcupDto;
import com.chu.worldcup.domain.RequestWorldcupStatisticsDto;

import java.util.ArrayList;

public interface WorldcupService {

    int createWorldcup(RequestWorldcupDto requestWorldcupDto);

    ArrayList<ResponseImageWithHairInfoForWorldcupDto> getWorldcup(int worldcupSeq);

    boolean updateWorldcupStatistics(RequestWorldcupStatisticsDto requestWorldcupStatisticsDto);
}
