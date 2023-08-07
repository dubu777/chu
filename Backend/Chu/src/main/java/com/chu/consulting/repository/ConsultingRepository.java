package com.chu.consulting.repository;

import com.chu.consulting.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ConsultingRepository extends JpaRepository<Consulting, Integer> {
    Integer countByDesignerSeq(Integer seq);

    @Query(value = "SELECT c.designer.seq, AVG(c.review.reviewScore)" +
            " FROM Consulting c" +
            " GROUP BY c.designer.seq")
    List<Object[]> getReviewScoreByDesigner();

    // 평점 구하기
    @Query(value = "SELECT AVG(c.review.reviewScore) FROM Consulting c WHERE c.designer.seq = :designerSeq GROUP BY c.designer.seq")
    Double getReviewScoreByDesigner(@Param("designerSeq") Integer designerSeq);

    List<Consulting> findByDesignerSeq(Integer designerSeq);

    // 상담 번호로 상담 정보 받아오기
    Consulting getConsultingBySeq(int seq);

    // 상담 취소하기 (cancel date update)
    @Modifying
    @Query("UPDATE Consulting c SET c.cancelDate = :now WHERE c.seq = :consultingSeq")
    void updateCancelDate(int consultingSeq, LocalDateTime now);

    // 세션ID를 url 컬럼에 기록
    @Modifying
    @Query("UPDATE Consulting c SET c.url = :url WHERE c.seq = :seq")
    void updateConsultingUrl(int seq, String url);

    // 상담 후기 등록 : 평점, reviewContent 업데이트
    @Modifying
    @Query("UPDATE Consulting c SET c.review.reviewScore = :score, c.review.reviewContent = :content WHERE c.seq = :seq")
    void updateScoreAndContent(double score, String content, int seq);



//    String participantConsulting(int consultingSeq);
//
//    boolean createConsulting(RequestConsultingDto requestConsultingDto);
//
//    boolean updatePossibleConsulting(int consultingSeq);
//
//    boolean deleteConsulting(int consultingSeq);
//
//    boolean updateImpossibleConsulting(RequestConsultingDto requestConsultingDto);
//
//    ResponseConsultingResultDto getConsultingResult(int consultingSeq);
//
//    boolean updateConsultingUrl(int consultingSeq, String url);
//
//    boolean updateReviewContent(RequestConsultingReviewDto requestConsultingReviewDto);
//
//    boolean updateLikeInfo(RequestConsultingReviewDto requestConsultingReviewDto);
//
//    boolean updateDesignerReviewScore(RequestConsultingReviewDto requestConsultingReviewDto);
//
//    ResponseConsultingReviewInfoDto getConsultingResultDetailInfo(int consultingSeq);
//
//    boolean updateConsultingResultStyle(RequestConsultingUpdateDto requestConsultingUpdateDto);
//
//    boolean updateSelectedConsultingResultImage(RequestConsultingUpdateDto requestConsultingUpdateDto);
}
