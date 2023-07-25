package com.chu.worldcup.service;

import com.chu.worldcup.domain.ResponseImageWithHairInfoForWorldcupDto;
import com.chu.worldcup.domain.RequestWorldcupDto;
import com.chu.worldcup.domain.RequestWorldcupStatisticsDto;
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
    public ArrayList<ResponseImageWithHairInfoForWorldcupDto> getWorldcup(int worldcupSeq) {
        return worldcupRepository.getWorldcup(worldcupSeq);
    }

    @Override
    public boolean updateWorldcupStatistics(RequestWorldcupStatisticsDto requestWorldcupStatisticsDto) {
        return worldcupRepository.updateWorldcupStatistics(requestWorldcupStatisticsDto);
    }
}
