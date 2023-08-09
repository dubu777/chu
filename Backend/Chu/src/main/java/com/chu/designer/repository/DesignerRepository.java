package com.chu.designer.repository;

import com.chu.designer.domain.*;
import com.chu.global.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public interface DesignerRepository extends JpaRepository<Designer, Integer> {

    Designer getDesignerBySeq(int seq);

    boolean existsBySeq(Integer designerSeq);

    // ID 중복검사
    boolean existsById(String Id);

    // email 중복검사
    boolean existsByEmail(String email);

    Designer findById(String Id);

    // 아이디 찾기
    Designer findByNameAndEmail(String name, String email);

    // 비밀번호 찾기
    Designer findByNameAndEmailAndId(String name, String email, String id);

    // 비밀번호 변경
    @Modifying
    @Query("UPDATE Designer d SET d.pwd = :pwd WHERE d.seq = :seq")
    void changePwd(int seq, String pwd);

    // 평점 업데이트
    @Modifying
    @Query("UPDATE Designer d SET d.reviewScore = :score WHERE d.seq = :seq")
    void updateReviewScore(double score, int seq);

    @Modifying
    @Query("UPDATE Designer d SET d.RefreshToken = :token WHERE d.seq = :seq")
    void updateRefreshToken(int seq, String token);

    Designer findBySeq(int seq);

    // 디자이너 뷰 - 이름으로 검색하기
    @Query("SELECT d FROM Designer d WHERE d.name LIKE %:name%")
    List<Designer> findByName(@Param("name") String name);


//    boolean signUp(RequestDesignerSignUpDto requestDesignerSignUpDto);
//
//    boolean signIn(RequestSignInDto requestSignInDto);
//
//    Designer getDesignerInfo(String id);
//
//    String findId(RequestFindIdDto requestFindIdDto);
//
//    int isValidUser(RequestFindPwdDto requestFindPwdDto);
//
//    boolean changePwd(RequestChangePwdDto requestChangePwdDto);
//
//    ArrayList<ResponseTimeStateDto> getTimeStateList(int designerSeq, Date date);
//
//    ArrayList<ResponseAlertDesignerDto> getAlertList(int designerSeq);
//
//    boolean createAlert(RequestAlertCreateDto requestAlertCreateDto);
//
//    boolean readAlert(RequestAlertReadDto requestAlertReadDto);
//
//    ArrayList<ResponseBestDesignerDto> getBestDesigners();
//

}
