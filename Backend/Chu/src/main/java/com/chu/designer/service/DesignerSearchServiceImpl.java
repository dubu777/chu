package com.chu.designer.service;

import com.chu.designer.domain.Designer;
import com.chu.designer.domain.ResponseDesignerDetailInfoDto;
import com.chu.designer.domain.ResponseDesignerSearchAreaDto;
import com.chu.designer.domain.DesignerSearchDto;
import com.chu.designer.repository.DesignerSearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class DesignerSearchServiceImpl implements DesignerSearchService{

    private final DesignerSearchRepository designerSearchRepository;
    private final DesignerLikeRepository designerLikeRepository;


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

//        Member me = memberRepository.findByEmail(email).orElseThrow(() ->
//                new NoMemberException("없는 사용자입니다.")
//        );

        List<Designer> designers = designerSearchRepository.findAll();
        List<DesignerSearchDto> result = new ArrayList<>();

        for (Designer designer : designers) {
            Integer likeCnt = designerLikeRepository.countByDesignerSeq(designer.getSeq());
            DesignerSearchDto dto = new DesignerSearchDto(designer);
            dto.setLikeCnt(likeCnt);
            result.add(dto);
        }
        //System.out.println("entity>>>>>> "+designerSearch);



        //널값처리 어떻게 할지?????
//        List<DesignerSearchDto> result = designerSearch.stream()
//                .filter(Objects::nonNull)
//                .map(DesignerSearchDto::new)
//                .collect(Collectors.toList());
        System.out.println("dto>>>>>> "+result);

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
