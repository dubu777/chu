package com.chu.designer.service;

import com.chu.designer.domain.DesignerDetailDto;
import com.chu.designer.domain.DesignerDto;
import com.chu.global.domain.AlertDto;
import com.chu.global.domain.BestDesignerDto;
import com.chu.global.domain.FindIdDto;
import com.chu.global.domain.SignInDto;
import com.chu.worldcup.domain.WorldcupStatisticsInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
public class DesignerServiceImpl implements DesignerService{
    // repo 주입
    @Override
    public boolean checkId(String id) {
        boolean isSuccess = true;
        // 로직

        // 존재하지 않으면 가능 -> true
        // 이미 존재하면 불가능 -> false
        return isSuccess;
    }

    @Override
    public boolean checkEmail(String email) {
        boolean isSuccess = true;
        // 로직

        return isSuccess;
    }

    @Override
    public int signUp(DesignerDto designerDto) {
        int isSuccess = 1;

        // 로직

        // 성공 시 row 1 반환

        return isSuccess;
    }

    // 로그인 실패는 0, 로그인
    @Override
    public boolean signIn(SignInDto signInDto) {
        boolean isSuccess = true;

        // 로직

        return isSuccess;
    }

    @Override
    public DesignerDetailDto getDesignerDetail(String id) {
        DesignerDetailDto designerDetailDto = new DesignerDetailDto();

        // 디자니어 정보
        // 디자이너 테이블에서 정보 다 끌어오기

        // 베스트 디자이너
        // 디자이너 평점 limit 6
        // 초기에 값이 없을 수도 있음 null 조심, 미리 dump 파일로 어느정도 데이터 삽입해놓기
        ArrayList<BestDesignerDto> bestDesignerDtoList = new ArrayList<>();

        // 월드컵 우승 데이터 사진들
        ArrayList<WorldcupStatisticsInfoDto> worldcupStatisticsInfoDtoList = new ArrayList<>();

        // 알림 데이터
        // 디자이너 idx로 알림 접근
        // 상담 IDX 토대로 APi 명세에 따른 로직 추가
        ArrayList<AlertDto> alertDtoList = new ArrayList<>();


        return designerDetailDto;
    }

    @Override
    public String findId(FindIdDto findIdDto) {
        String id = null;
        // 로직

        // 이름, 이메일로 아이디 찾기
        return id;
    }
}
