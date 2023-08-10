package com.chu.designer.service;

import com.chu.consulting.domain.Consulting;
import com.chu.consulting.domain.Review;
import com.chu.consulting.repository.ConsultingRepository;
import com.chu.designer.domain.*;
import com.chu.designer.repository.DesignerLikeRepository;
import com.chu.designer.repository.DesignerPortfolioRepository;
import com.chu.designer.repository.DesignerRepository;
import com.chu.designer.repository.DesignerSearchRepository;
import com.chu.global.domain.HairStyleDict;
import com.chu.global.domain.HairStyleDto;
import com.chu.global.repository.DesignerTagInfoRepository;
import com.chu.global.repository.HairStyleDictRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class DesignerSearchServiceImpl implements DesignerSearchService {

    private final DesignerSearchRepository designerSearchRepository;
    private final DesignerLikeRepository designerLikeRepository;
    private final ConsultingRepository consultingRepository;
    private final DesignerTagInfoRepository designerTagInfoRepository;
    private final HairStyleDictRepository hairStyleDictRepository;
    private final DesignerPortfolioRepository designerPortfolioRepository;
    private final DesignerRepository designerRepository;

    // 1. 헤어스타일 목록 가져오기
    @Override
    public List<HairStyleDto> showCategoryView(int categorySeq) {

        List<HairStyleDict> allCutHairStyle = hairStyleDictRepository.findByHairStyleCategorySeq(categorySeq);
        List<HairStyleDto> tmpResult = new ArrayList<>();
        for (HairStyleDict hs : allCutHairStyle) {
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

    @Override
    public List<DesignerSearchDto> search2Name(int customerSeq, String name) {

        List<DesignerSearchDto> result = new ArrayList<>();

        // 디자이너 이름에 검색어가 포함된 디자이너 리스트를 가져온다.
        List<Designer> designers = designerRepository.findByName(name);


        // 여기 코드 중복 너무 많음. 수정 일단 다음에 .....

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

        return result;
    }

    @Override
    public List<ResponseDesignerSearchAroundDto> search2AllArea() {
        List<ResponseDesignerSearchAroundDto> list = new ArrayList<>();

        try{
            List<Designer> designerList = designerRepository.findAll();

            for(Designer d : designerList){
                ResponseDesignerSearchAroundDto dto = new ResponseDesignerSearchAroundDto();

                dto.setDesignerSeq(d.getSeq());
                if(d.getImagePath() != null)
                    dto.setDesignerImg(d.getImagePath().getUploadImgName());
                else
                    dto.setDesignerImg(null);
                dto.setName(d.getName());
                dto.setReviewScore(d.getReviewScore());

                List<String> dtoTagList = new ArrayList<>();
                List<DesignerTagInfo> tagList = designerTagInfoRepository.findByDesignerSeq(d.getSeq());
                for(DesignerTagInfo dti : tagList){
                    dtoTagList.add(dti.getHairStyleDict().getHairStyleLabel());
                }
                dto.setHairStyleLabel(dtoTagList);

                dto.setLatitude(d.getLatitude());
                dto.setLongitude(d.getLongitude());


                list.add(dto);
            }

        } catch(Exception e){
            e.printStackTrace();
        }

        return list;
    }

    @Override
    public ResponseDesignerDetailInfoDto getDesignerDetailInfo(Integer designerSeq, Integer customerSeq) {

        ResponseDesignerDetailInfoDto result;

        // 디자이너 엔티티에 있는 정보 가져오기
        Designer designer = designerSearchRepository.findBySeq(designerSeq);
        // 결과:  Designer(seq=1, id=wonyoung, name=원영, pwd=1234, email=young@gmail.com, gender=F, introduction=여성 펌 전문 디자이너 원영입니다 ^_^, certificationNum=1234-5678, address=대전 유성구 덕명동 154-15, latitude=36.3472301, longitude=127.2957758539, salonName=공간 헤어, imagePath=com.chu.global.domain.ImagePath@6880d11d, reviewScore=4.9, cost=5000, createdDate=2023-07-22T00:44:28)

        // 다른 테이블에서 조인해서 가져올 정보

        Integer likeCnt = designerLikeRepository.countByDesignerSeq(designer.getSeq());
        // 고객이 해당 디자이너 좋아요 체크 여부
        Optional<DesignerLike> designerLikeOptional = Optional
                .ofNullable(designerLikeRepository.findByCustomerSeqAndDesignerSeq(customerSeq, designer.getSeq()));
        Boolean isLike = designerLikeOptional.map(DesignerLike::getLikeStatus).orElse(false);
        // 헤어스타일 라벨링
        List<DesignerTagInfo> hairStyleTagSeqs = designerTagInfoRepository.findByDesignerSeq(designer.getSeq());
        List<String> hairStyleLabels = new ArrayList<>();
        for (DesignerTagInfo tag : hairStyleTagSeqs) {
            Integer seq = tag.getSeq();
            HairStyleDict hairStyleDict = hairStyleDictRepository.findBySeq(seq);
            hairStyleLabels.add(hairStyleDict.getHairStyleLabel());
        }
        // 디자이너 포트폴리오 사진
        List<DesignerPortfolio> portfolios = designerPortfolioRepository.findByDesignerSeq(designer.getSeq());
        List<ResponsePortfolioDto> portfolioDto = new ArrayList<>();
        for (DesignerPortfolio p : portfolios) {
            ResponsePortfolioDto dto = new ResponsePortfolioDto(p.getSeq(), p.getImagePath().getUploadImgName(), p.getOrders());
            portfolioDto.add(dto);
        }
        // 디자이너 리뷰
        List<Consulting> consultings = consultingRepository.findByDesignerSeq(designerSeq);
        List<Review> reviews = new ArrayList<>();
        for(Consulting consulting : consultings) {
            if(consulting.getReview() == null) continue;
            reviews.add(new Review(consulting.getReview().getReviewScore(), consulting.getReview().getReviewContent()));
        }

        result = ResponseDesignerDetailInfoDto.builder()
                .designerSeq(designer.getSeq())
                .name(designer.getName())
                .introduction(designer.getIntroduction())
                .address(designer.getAddress())
                .salonName(designer.getSalonName())
                .designerImg((designer.getImagePath() != null) ? designer.getImagePath().getUploadImgName() : null)
                .allReviewScore(designer.getReviewScore())
                .likeCnt(likeCnt)
                .isLike(isLike)
                .hairStyleLabel(hairStyleLabels)
                .portfolio(portfolioDto)
                .review(reviews)
                .cost(designer.getCost())
                .build();

        return result;
    }

    @Override
    public ResponseDesignerSearchDto getLikeDesignerList(int customerSeq) {

        ResponseDesignerSearchDto responseDesignerSearchDto = new ResponseDesignerSearchDto();

        try{

            // 1. designerList 구하기
            List<DesignerSearchDto> list = new ArrayList<>();

            // 1-1) 고객 번호 일치하는 designerLikeDto 가져오기
            List<DesignerLike> designerLikes = new ArrayList<>();
            designerLikes = designerLikeRepository.findAllByCustomerSeq(customerSeq);

            for(DesignerLike dl : designerLikes){
                // 좋아요 상태 false 이면 continue
                if(!dl.getLikeStatus())
                    continue;

                DesignerSearchDto dto= new DesignerSearchDto();

                // 1-2) 디자이너 seq 구하기
                int designerSeq = dl.getDesigner().getSeq();

                // 1-3) Designer entity 구하기
                Designer designer = designerRepository.getDesignerBySeq(designerSeq);

                // DesignerSearchDto 채우기
                dto.setDesignerSeq(designerSeq);
                dto.setDesignerImg(designer.getImagePath().getUploadImgName());
                dto.setReviewScore(designer.getReviewScore());
                dto.setDesignerName(designer.getName());
                dto.setIntroduction(designer.getIntroduction());

                // 리뷰 수
                int reviewCnt = consultingRepository.countByDesignerSeq(designerSeq);
                dto.setReviewCnt(reviewCnt);

                // 헤어스타일 라벨링
                List<DesignerTagInfo> hairStyleTagSeqs = designerTagInfoRepository.findByDesignerSeq(designerSeq);
                List<String> hairStyleLabels = new ArrayList<>();
                for (DesignerTagInfo tag : hairStyleTagSeqs) {
                    Integer seq = tag.getSeq();
                    HairStyleDict hairStyleDict = hairStyleDictRepository.findBySeq(seq);
                    hairStyleLabels.add(hairStyleDict.getHairStyleLabel());
                }
                dto.setHairStyleLabel(hairStyleLabels);

                dto.setLikeCnt(designerLikeRepository.countByDesignerSeq(designerSeq));

                DesignerLike designerLike = designerLikeRepository.findByCustomerSeqAndDesignerSeq(customerSeq, designerSeq);
                if(designerLike == null)
                    dto.setIsLike(false);
                else{
                    if(designerLike.getLikeStatus())
                        dto.setIsLike(true);
                }

                dto.setCost(designer.getCost());

                list.add(dto);
            }

            responseDesignerSearchDto.setDesignerList(list);

            // 2. designerListCnt 구하기
            int listCnt = list.size();

            responseDesignerSearchDto.setDesignerListCnt(listCnt);

        } catch(Exception e){
            e.printStackTrace();
            return responseDesignerSearchDto;
        }

        return responseDesignerSearchDto;
    }
}


