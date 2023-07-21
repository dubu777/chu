package com.chu.designer.repository;

import com.chu.consulting.domain.ConsultingDto;
import com.chu.customer.domain.CustomerDto;
import com.chu.designer.domain.*;
import com.chu.global.domain.*;

import java.sql.Date;
import java.util.ArrayList;

public interface DesignerRepository {
    // 아이디 중복체크
    boolean checkId(String id);
    
    // 이메일 중복체크
    boolean checkEmail(String email);

    // 디자이너 회원가입
    boolean signUp(DesignerSignUpDto designerSignUpDto);

    // 디자이너 로그인 여부 확인
    boolean signIn(SignInDto signInDto);

    // 디자이너 정보 조회
    DesignerDto getDesignerInfo(String id);

    String findId(FindIdDto findIdDto);

    int isValidUser(FindPwdDto findPwdDto);

    boolean changePwd(ChangePwdDto changePwdDto);

    ArrayList<TimeStateDto> getTimeStateList(int designerSeq, Date date);

    ArrayList<AlertDesignerDto> getAlertList(int designerSeq);

    boolean createAlert(AlertCreateDto alertCreateDto);

    boolean readAlert(AlertReadDto alertReadDto);

    DesignerMyPageDto getMyPageInfo(int designerSeq);

    boolean patchIntroduction(int designerSeq, String introduction);

    boolean patchImg(int designerSeq, String img);

    DesignerMyPageUpdateShowDto getDesignerMyPageUpdateInfo(int designerSeq);

    boolean updateDesignerInfo(int designerSeq, DesignerInfoUpdateDto designerInfoUpdateDto);

    ArrayList<TimeDto> getPossibleReservationTime(int designerSeq, Date date);

    boolean updatePossibleReservationTime(int designerSeq, ReservationTimeDto reservationTimeDto);

    ArrayList<ConsultingDto> getReservationList(int designerSeq);

    ArrayList<ImageDto> getPortfolio(int designerSeq);

    boolean deletePortfolioImage(int designerSeq, int imageSeq);

    boolean postPortfolioImage(int designerSeq, String img);

    ArrayList<BestDesignerDto> getBestDesigners();
}
