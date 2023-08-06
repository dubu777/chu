package com.chu.designer.service;

import com.chu.consulting.repository.ConsultingRepository;
import com.chu.designer.domain.*;
import com.chu.designer.repository.DesignerSearchRepository;
import com.chu.global.domain.HairStyleDict;
import com.chu.global.repository.DesignerTagInfoRepository;
import com.chu.global.repository.HairStyleDictRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

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

    // 1. 헤어스타일 목록 가져오기
    @Override
    public List<HairStyleDto> showCategoryView(int categorySeq) {
        
        List<HairStyleDict> allCutHairStyle = hairStyleDictRepository.findByHairStyleCategorySeq(categorySeq);
        List<HairStyleDto> tmpResult = new ArrayList<>();
        for(HairStyleDict hs : allCutHairStyle) {
            tmpResult.add(new HairStyleDto(hs));
        }
        return tmpResult;
    }

    //2. 디자이너 seq 오름차순 (필터 없는 리스트)
    @Override
    public List<DesignerSearchDto> searchList(int customerSeq) {

        // 한번에 담아서 보낼 dto 리스트
        List<DesignerSearchDto> result = new ArrayList<>();

        List<Designer> designers = designerSearchRepository.findAll();
        // 디자이너별 리뷰 평균 점수 가져오기(Integer,Double) [[1, 4.5], [2, 3.8], [3, 4.2] ...]
        List<Object[]> reviewScore = consultingRepository.getReviewScoreByDesigner();
        int reviewScoreSeq = 0;

        for (Designer designer : designers) {
            // 좋아요 수
            Integer likeCnt = designerLikeRepository.countByDesignerSeq(designer.getSeq());
            // 리뷰 수
            Integer reviewCnt = consultingRepository.countByDesignerSeq(designer.getSeq());
            // 헤어스타일 라벨링
            List<DesignerTagInfo> hairStyleTagSeqs = designerTagInfoRepository.findByDesignerSeq(designer.getSeq());
            List<String> hairStyleLabels = new ArrayList<>();
            for (DesignerTagInfo tag : hairStyleTagSeqs) {
                Integer seq = tag.getSeq();
                HairStyleDict hairStyleDict = hairStyleDictRepository.findBySeq(seq);
                hairStyleLabels.add(hairStyleDict.getHairStyleLabel());
            }
            // 평점
            Double reviewScoreByDesigner = (reviewScoreSeq < reviewScore.size() && (reviewScore.get(reviewScoreSeq)[1] != null)) ? (Double) reviewScore.get(reviewScoreSeq)[1] : 0.0;
            // 고객 로그인시, 해당 디자이너의 좋아요 상태. 로그인 하지 않았으면 false를 입력.
            Optional<DesignerLike> designerLikeOptional = Optional
                    .ofNullable(designerLikeRepository.findByCustomerSeqAndDesignerSeq(customerSeq, designer.getSeq()));
            Boolean isLike = designerLikeOptional.map(DesignerLike::getLikeStatus).orElse(false);
            // dto 객체에 감싸서 보낸다
            DesignerSearchDto dto = new DesignerSearchDto(designer, likeCnt, reviewCnt, hairStyleLabels, reviewScoreByDesigner, isLike);
            result.add(dto);
            reviewScoreSeq++;
        }
        return result;
    }

//    @Override
//    public List<DesignerSearchDto> search2Name(int customerSeq, String name) {
//        return designerSearchRepository.search2Name(customerSeq, name);
//    }

    @Override
    public List<DesignerSearchDto> search2Filter(int customerSeq, Integer[] hairStyleSeqs) {
        // 디자이너 헤어스타일 태그정보에서 해당 태그가 있는 디자이너 seq를 찾아서 저장. 중복없기 위해 Set 사용
        Set<Integer> designerList = new HashSet<>();
        for (Integer seq : hairStyleSeqs) {
            designerList.addAll(designerTagInfoRepository.findDesignerSeqByHairStyleSeq(seq));
        }

        // 여기 코드 중복 너무 많음. 수정 일단 다음에 .....

        // 한번에 담아서 보낼 dto 리스트
        List<DesignerSearchDto> result = new ArrayList<>();

        List<Designer> designers = designerSearchRepository.findBySeqIn(designerList);
        // 디자이너별 리뷰 평균 점수 가져오기(Integer,Double) [[1, 4.5], [2, 3.8], [3, 4.2] ...]
        List<Object[]> reviewScore = consultingRepository.getReviewScoreByDesigner();

        int reviewScoreSeq = 0;

        for (Designer designer : designers) {
            // 좋아요 수
            Integer likeCnt = designerLikeRepository.countByDesignerSeq(designer.getSeq());
            // 리뷰 수
            Integer reviewCnt = consultingRepository.countByDesignerSeq(designer.getSeq());
            // 헤어스타일 라벨링
            List<DesignerTagInfo> hairStyleTagSeqs = designerTagInfoRepository.findByDesignerSeq(designer.getSeq());
            List<String> hairStyleLabels = new ArrayList<>();
            for (DesignerTagInfo tag : hairStyleTagSeqs) {
                Integer seq = tag.getSeq();
                HairStyleDict hairStyleDict = hairStyleDictRepository.findBySeq(seq);
                hairStyleLabels.add(hairStyleDict.getHairStyleLabel());
            }
            // 평점
            Double reviewScoreByDesigner = (reviewScoreSeq < reviewScore.size() && (reviewScore.get(reviewScoreSeq)[1] != null)) ? (Double) reviewScore.get(reviewScoreSeq)[1] : 0.0;
            // 고객 로그인시, 해당 디자이너의 좋아요 상태. 로그인 하지 않았으면 false를 입력.
            Optional<DesignerLike> designerLikeOptional = Optional
                    .ofNullable(designerLikeRepository.findByCustomerSeqAndDesignerSeq(customerSeq, designer.getSeq()));
            Boolean isLike = designerLikeOptional.map(DesignerLike::getLikeStatus).orElse(false);
            // dto 객체에 감싸서 보낸다
            DesignerSearchDto dto = new DesignerSearchDto(designer, likeCnt, reviewCnt, hairStyleLabels, reviewScoreByDesigner, isLike);
            result.add(dto);
            reviewScoreSeq++;
        }

        //List<DesignerSearchDto> result =
        return result;
    }

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
