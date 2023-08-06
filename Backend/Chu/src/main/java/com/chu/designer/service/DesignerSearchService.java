package com.chu.designer.service;

import com.chu.designer.domain.*;

import java.util.ArrayList;
import java.util.List;

public interface DesignerSearchService {
    // 디자이너 조회시 상단 필터 데이터 불러오기
    List<HairStyleDto> showCategoryView(int categorySeq);

    // 디자이너 조회 - 조건 없이 기본 정렬(디자이너 seq 오름차순)
    List<DesignerSearchDto> searchList(int customerSeq);

//    // 디자이너 조회 - 이름
//    List<DesignerSearchDto> search2Name(int customerSeq, String name);
//
    // 디자이너 조회 - 필터
    List<DesignerSearchDto> search2Filter(int customerSeq, Integer[] hairStyleSeqs);
//
//    // 디자이너 조회 - 좋아요순
//    List<DesignerSearchDto> search2LikeCount(int customerSeq);
//
//    // 디자이너 조회 - 리뷰순
//    List<DesignerSearchDto> search2ReviewScore(int customerSeq);
//
//    // 디자이너 조회 전체(차후 프론트에서 지역으로 정렬)
//    List<ResponseDesignerSearchAreaDto> search2AllArea();

    // 디자이너 상세 정보 조회
    ResponseDesignerDetailInfoDto getDesignerDetailInfo(Integer designerSeq, Integer customerSeq);

//    // 디자이너 좋아요 여부 조회
//    List<DesignerSearchDto> search2Like(int customerSeq);
}
