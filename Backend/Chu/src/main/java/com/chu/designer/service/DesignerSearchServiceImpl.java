package com.chu.designer.service;

import com.chu.consulting.repository.ConsultingRepository;
import com.chu.designer.domain.Designer;
import com.chu.designer.domain.DesignerSearchDto;
import com.chu.designer.domain.DesignerTagInfo;
import com.chu.designer.repository.DesignerSearchRepository;
import com.chu.global.domain.HairStyleDict;
import com.chu.global.repository.DesignerTagInfoRepository;
import com.chu.global.repository.HairStyleDictRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class DesignerSearchServiceImpl implements DesignerSearchService{

    private final DesignerSearchRepository designerSearchRepository;
    private final DesignerLikeRepository designerLikeRepository;
    private final ConsultingRepository consultingRepository;
    private final DesignerTagInfoRepository designerTagInfoRepository;
    private final HairStyleDictRepository hairStyleDictRepository;


//    @Override
//    public List<DesignerSearchDto> search2Name(int customerSeq, String name) {
//        return designerSearchRepository.search2Name(customerSeq, name);
//    }

//    @Override
//    public List<DesignerSearchDto> search2Filter(int customerSeq, String[] hairStyle) {
//        // 조인으로 처리할 수는 있을 것 같은데 힘들면 함수 빼서 스타일 태그번호 갖고 디자이너 상세로 갈 수 있게 짜면 될듯
//        return designerSearchRepository.search2Filter(customerSeq, hairStyle);
//    }
//
//    @Override
//    public List<DesignerSearchDto> search2LikeCount(int customerSeq) {
//        return designerSearchRepository.search2LikeCount(customerSeq);
//    }

    @Override
    public List<DesignerSearchDto> search2ReviewScore(int customerSeq) {

        List<DesignerSearchDto> result = new ArrayList<>();
        List<Designer> designers = designerSearchRepository.findAll();
        List<Object[]> reviewScore = consultingRepository.getReviewScoreByDesigner();   //디자이너별 리뷰 평균 점수 가져오기(Integer,Double) [[1, 4.5], [2, 3.8], [3, 4.2] ...]

//        for (Object[] o : reviewScore) {
//            System.out.println(o[0]+ " " + o[1]);
//        }
        int reviewScoreSeq = 0;
        for (Designer designer : designers) {
            Integer likeCnt = designerLikeRepository.countByDesignerSeq(designer.getSeq());
            Integer reviewCnt = consultingRepository.countByDesignerSeq(designer.getSeq());

            List<DesignerTagInfo> hairStyleTagSeqs = designerTagInfoRepository.findByDesignerSeq(designer.getSeq());
            List<String> hairStyleLabels = new ArrayList<>();
            for (DesignerTagInfo tag : hairStyleTagSeqs) {
                Integer seq = tag.getSeq();
                HairStyleDict hairStyleDict = hairStyleDictRepository.findBySeq(seq);
                hairStyleLabels.add(hairStyleDict.getHairStyleLabel());
            }
            //System.out.println(reviewScore.get(reviewScoreSeq)[0].getClass().getName());
            Double reviewScoreByDesigner = (reviewScoreSeq < reviewScore.size() && (reviewScore.get(reviewScoreSeq)[1] != null)) ? (Double) reviewScore.get(reviewScoreSeq)[1] : 0.0;
            DesignerSearchDto dto = new DesignerSearchDto(designer, likeCnt, reviewCnt, hairStyleLabels, reviewScoreByDesigner);
            result.add(dto);
            reviewScoreSeq++;
        }

        return result;
    }
//
//    @Override
//    public List<ResponseDesignerSearchAreaDto> search2AllArea() {
//        return designerSearchRepository.search2AllArea();
//    }
//
//    @Override
//    public ResponseDesignerDetailInfoDto getDesignerDetailInfo(int designerSeq, int customerSeq) {
//        return designerSearchRepository.getDesignerDetailInfo(designerSeq, customerSeq);
//    }
//
//    @Override
//    public List<DesignerSearchDto> search2Like(int customerSeq) {
//        return designerSearchRepository.search2Like(customerSeq);
//    }
}
