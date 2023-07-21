package com.chu.worldcup.service;

import com.chu.worldcup.domain.WorldcupRequestDto;
import com.chu.worldcup.repository.WorldcupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class WorldcupServiceImpl implements WorldcupService {

    private final WorldcupRepository worldcupRepository;

    @Override
    public int createWorldcup(WorldcupRequestDto worldcupRequestDto) {
        return worldcupRepository.createWorldcup(worldcupRequestDto);
    }
}
