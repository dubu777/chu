package com.chu.customer.repository;

import com.chu.customer.domain.CustomerDetailDto;
import com.chu.customer.domain.CustomerDto;
import com.chu.customer.domain.FaceInfoDto;
import com.chu.global.domain.*;
import com.chu.worldcup.domain.WorldcupStatisticsInfoDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Slf4j
@Repository
@Transactional
public class CustomerRepositoryImpl implements CustomerRepository {

    @Override
    public boolean checkId(String id) {
        // 로직
        // 아이디 중복이 있는지?

        // 존재하지 않으면 가능 -> true
        // 이미 존재하면 불가능 -> false
        return false;
    }

    @Override
    public boolean checkEmail(String email) {
        // 로직
        // 이메일 중복이 있는지?
        return false;
    }

    @Override
    public int signUp(CustomerDto customerDto) {
        // 로직
        // 정상 가입인지

        //성공시 isSuccess 1 아니면 0이나 -1
        return 0;
    }

    @Override
    public boolean signIn(SignInDto signInDto) {
        // 로직
        // 조건에 맞는 사용자 존재하는지?
        return false;
    }

    @Override
    public CustomerDetailDto getCustomerDetail(String id) {
        // 고객 정보
        // 고객 테이블에서 정보 다 끌어오기

        // 베스트 디자이너
        // 디자이너 평점 limit 6
        // 초기에 값이 없을 수도 있음 null 조심, 미리 dump 파일로 어느정도 데이터 삽입해놓기
        // 베스트 디자이너 갖고 와서 채우고 -> customerDetailDto에 넣기
        ArrayList<BestDesignerDto> bestDesignerDtoList = new ArrayList<>();

        // 얼굴형에 잘 어울리는 스타일들 사진
        // 위에서 갖고 온 얼굴형 정보 토대로 검색
        ArrayList<FaceInfoDto> faceInfoDtoList = new ArrayList<FaceInfoDto>();

        // 월드컵 우승 데이터 사진들
        ArrayList<WorldcupStatisticsInfoDto> worldcupStatisticsInfoDtoList = new ArrayList<>();

        // 알림 데이터
        // 고객 idx로 알림 접근
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
        // 고객 시퀀스넘버, 바꿀 비밀번호
        return false;
    }
}
