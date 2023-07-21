package com.chu.worldcup.repository;

import com.chu.global.domain.ImageDto;
import com.chu.worldcup.domain.ResponseImageWithHairInfoForWorldcupDto;
import com.chu.worldcup.domain.RequestWorldcupDto;
import com.chu.worldcup.domain.WorldcupStatisticsRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Slf4j
@Repository
@RequiredArgsConstructor
public class WorldcupRepositoryImpl implements WorldcupRepository {
    // DB CONN

    @Override
    public ArrayList<ImageDto> getTopWorldcupImages() {
        ArrayList<ImageDto> worldcupWinHairImageList = new ArrayList<>();
        // 로직

        // 월드컵 우승 데이터 사진들
        return worldcupWinHairImageList;
    }

    @Override
    public int createWorldcup(RequestWorldcupDto requestWorldcupDto) {
        int resultRow = 0;

        // 로직

        // 월드컵 생성 후 삽입행 PK 반환

        return resultRow;
    }

    @Override
    public ArrayList<ResponseImageWithHairInfoForWorldcupDto> getWorldcup(int worldcupSeq) {
        ArrayList<ResponseImageWithHairInfoForWorldcupDto> resultList = new ArrayList<>();

        // 로직

        // 월드컵 시퀀스로 이미지들 다 가져오기

        return resultList;
    }

    @Override
    public boolean updateWorldcupStatistics(WorldcupStatisticsRequestDto worldcupStatisticsRequestDto) {
        
        boolean isSuccess = true;
        
        // 로직
        
        // 월드컵 통계 정보 추가

        return isSuccess;
    }
}
