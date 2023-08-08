package com.chu.designer.repository;

import com.chu.designer.domain.Designer;
import com.chu.designer.domain.ResponseDesignerDetailInfoDto;
import com.chu.designer.domain.ResponseDesignerSearchAreaDto;
import com.chu.designer.domain.DesignerSearchDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public interface DesignerSearchRepository extends JpaRepository<Designer, Integer> {

    @Query("SELECT d FROM Designer d WHERE d.seq IN :seqs")
    List<Designer> findBySeqIn(@Param("seqs") Collection<Integer> seqs);

    Designer findBySeq(Integer designerSeq);

    // 이 주의 인기 디자이너
    List<Designer> findTop6ByOrderByReviewScoreDesc();

    // 디자이너 이름으로 검색하기
    List<Designer> findByName(@Param("name") String name);
//    List<DesignerSearchDto> search2Filter(int customerSeq, String[] hairStyle);
//
//    List<DesignerSearchDto> search2LikeCount(int customerSeq);

//    List<ResponseDesignerSearchAreaDto> search2AllArea();
//
//    ResponseDesignerDetailInfoDto getDesignerDetailInfo(int designerSeq, int customerSeq);
//
//    List<DesignerSearchDto> search2Like(int customerSeq);


}
