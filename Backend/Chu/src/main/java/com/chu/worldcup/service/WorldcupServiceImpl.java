package com.chu.worldcup.service;

import com.chu.global.domain.ResponseImageWithHairInfoDto;
import com.chu.worldcup.domain.RequestWorldcupDto;
import com.chu.worldcup.domain.WorldcupStatisticsRequestDto;
import com.chu.worldcup.repository.WorldcupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
public class WorldcupServiceImpl implements WorldcupService {

    private final WorldcupRepository worldcupRepository;

    @Override
    public int createWorldcup(RequestWorldcupDto requestWorldcupDto) {
        return worldcupRepository.createWorldcup(requestWorldcupDto);
    }

    @Override
    public ArrayList<ResponseImageWithHairInfoDto> getWorldcup(int worldcupSeq) {
        return worldcupRepository.getWorldcup(worldcupSeq);
    }

    @Override
    public boolean updateWorldcupStatistics(WorldcupStatisticsRequestDto worldcupStatisticsRequestDto) {
        return worldcupRepository.updateWorldcupStatistics(worldcupStatisticsRequestDto);
    }
}
