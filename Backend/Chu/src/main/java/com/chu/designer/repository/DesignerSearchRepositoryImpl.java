package com.chu.designer.repository;

import com.chu.designer.domain.ResponseDesignerDetailInfoDto;
import com.chu.designer.domain.ResponseDesignerSearchAreaDto;
import com.chu.designer.domain.DesignerSearchDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class DesignerSearchRepositoryImpl implements DesignerSearchRepository {

    private final EntityManager em;

    @Override
    public List<DesignerSearchDto> search2Name(int customerSeq, String name) {
        List<DesignerSearchDto> list = new ArrayList<>();
        //필요 데이터 추출
        // 디자이너


        // 이름 조건 걸어서 검색

        // 좋아요 수

        // 고객이 좋아하는지
        return list;
    }

    @Override
    public List<DesignerSearchDto> search2Filter(int customerSeq, String[] hairStyle) {
        List<DesignerSearchDto> list = new ArrayList<>();
        //필요 데이터 추출
        // 디자이너

        // 디자이너 스타일 태그로 검색

        // 좋아요 수

        // 고객이 좋아하는지
        return list;
    }

    @Override
    public List<DesignerSearchDto> search2LikeCount(int customerSeq) {
        List<DesignerSearchDto> list = new ArrayList<>();
        //필요 데이터 추출
        // 디자이너

        // 좋아요 수

        // 고객이 좋아하는지
        
        // 좋아요 순으로 정렬
        return list;
    }

    @Override
    public List<DesignerSearchDto> search2ReviewScore(int customerSeq) {
        List<DesignerSearchDto> list = new ArrayList<>();

        list = em.createQuery(
                "select d.seq, d.saved_img_name, d.review_score, d.name, d.introduction" +
                        " from Designer d", DesignerSearchDto.class
//                        " join d.DesignerTagInfo t" +
//                        " join t.HairStyleDict h"
        ).getResultList();
//        list = em.createQuery(
//                "select d.seq, d.saved_img_name, d.review_score, d.name, d.introduction, h.hair_style_label" +
//                        " from Designer d" +
//                        " join d.DesignerTagInfo t" +
//                        " join t.HairStyleDict h"
//        ).getResultList();
        // 고객이 좋아하는지 여부도

        // 디자이너 리뷰순으로 정렬

        return list;
    }

    @Override
    public List<ResponseDesignerSearchAreaDto> search2AllArea() {
        List<ResponseDesignerSearchAreaDto> list = new ArrayList<>();
        //필요 데이터 추출
        // 디자이너

        // 지역정보
        return list;
    }

    @Override
    public ResponseDesignerDetailInfoDto getDesignerDetailInfo(int designerSeq, int customerSeq) {
        // 이거도 조인 너무 많으면 함수로 빼서 간단한거 여러개 해도 될듯
        
        ResponseDesignerDetailInfoDto responseDesignerDetailInfoDto = null;

        //    디자이너 정보
        //    좋아요 수
        //    고객이 좋아하는지
        //    포트폴리오 정보들
        //    리뷰들 정보
        return responseDesignerDetailInfoDto;
    }

    @Override
    public List<DesignerSearchDto> search2Like(int customerSeq) {
        List<DesignerSearchDto> list = new ArrayList<>();
        //필요 데이터 추출
        // 고객이 좋아하는 디자이너 idx

        // -> 디자이너 정보
        return list;
    }
}
