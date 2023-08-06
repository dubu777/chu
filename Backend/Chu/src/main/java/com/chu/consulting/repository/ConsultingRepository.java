package com.chu.consulting.repository;

import com.chu.consulting.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ConsultingRepository extends JpaRepository<Consulting, Integer> {
    Integer countByDesignerSeq(Integer seq);


    @Query(value = "SELECT c.designer.seq, AVG(c.review.reviewScore)" +
            " FROM Consulting c" +
            " GROUP BY c.designer.seq")
    List<Object[]> getReviewScoreByDesigner();

    @Query(value = "SELECT AVG(c.review.reviewScore) FROM Consulting c WHERE c.designer.seq = :designerSeq GROUP BY c.designer.seq")
    Double getReviewScoreByDesigner(@Param("designerSeq") Integer designerSeq);

    List<Consulting> findByDesignerSeq(Integer designerSeq);

    // 상담 번호로 상담 정보 받아오기
    Consulting getConsultingBySeq(int seq);




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
