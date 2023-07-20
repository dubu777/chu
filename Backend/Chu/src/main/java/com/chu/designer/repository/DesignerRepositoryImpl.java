package com.chu.designer.repository;

import com.chu.designer.domain.DesignerDetailDto;
import com.chu.designer.domain.DesignerDto;
import com.chu.designer.domain.DesignerSignUpDto;
import com.chu.global.domain.*;
import com.chu.worldcup.domain.WorldcupStatisticsInfoDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.ArrayList;

@Slf4j
@Repository
@Transactional
public class DesignerRepositoryImpl implements DesignerRepository {

    // db connect

    @Override
    public boolean checkId(String id) {
        // 로직

        // 존재하지 않으면 가능 -> true
        // 이미 존재하면 불가능 -> false
        return false;
    }

    @Override
    public boolean checkEmail(String email) {
        return false;
    }

    @Override
    public int signUp(DesignerSignUpDto designerSignUpDto) {
        // 로직

        // 성공 시 row 1 반환
        return 0;
    }

    @Override
    public boolean signIn(SignInDto signInDto) {
        return false;
    }

    @Override
    public DesignerDetailDto getDesignerDetail(String id) {
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
        return null;
    }

    @Override
    public String findId(FindIdDto findIdDto) {
        // 로직

        // 이름, 이메일로 아이디 찾기
        return null;
    }

    @Override
    public int isValidUser(FindPwdDto findPwdDto) {
        // 로직
        // 이름, 아이디, 이메일로 존재하는 유저인지 확인
        return 0;
    }

    @Override
    public boolean changePwd(ChangePwdDto changePwdDto) {
        // 로직
        // 디자이너 시퀀스넘버, 바꿀 비밀번호
        return false;
    }

    @Override
    public ArrayList<TimeStateDto> getTimeStateList(int designerSeq, Date date) {
        ArrayList<TimeStateDto> result = new ArrayList<>();

        // 디자이너 번호, 시간으로 가능 날짜 조회

        // 상담 가능 시간에서 P, R 조회
        // 아니라면 I 겠지!

        return result;
    }

    @Override
    public ArrayList<AlertDesignerDto> getAlertList(int designerSeq) {
        ArrayList<AlertDesignerDto> alertList = new ArrayList<>();

        // 로직
        // 디자이너 번호로 알림 조회

        return alertList;
    }

    @Override
    public boolean createAlert(AlertCreateDto alertCreateDto) {
        boolean isSuccess = true;

        // 로직

        return isSuccess;
    }

    @Override
    public boolean readAlert(AlertReadDto alertReadDto) {
        boolean isSuccess = true;

        // 알림 읽기

        return isSuccess;
    }
}
