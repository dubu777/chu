package com.chu.worldcup.repository;

import com.chu.global.domain.ImageWithHairInfoDto;
import com.chu.worldcup.domain.WorldcupRequestDto;

import java.util.ArrayList;

public interface WorldcupRepository {

    int createWorldcup(WorldcupRequestDto worldcupRequestDto);

    ArrayList<ImageWithHairInfoDto> getWorldcup(int worldcupSeq);
}
