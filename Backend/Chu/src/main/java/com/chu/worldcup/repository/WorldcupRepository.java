package com.chu.worldcup.repository;

import com.chu.worldcup.domain.WorldcupRequestDto;

public interface WorldcupRepository {

    int createWorldcup(WorldcupRequestDto worldcupRequestDto);
}
