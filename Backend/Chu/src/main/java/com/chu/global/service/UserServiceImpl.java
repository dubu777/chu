package com.chu.global.service;

import com.chu.designer.domain.Designer;
import com.chu.designer.domain.ResponseMainPageDto;
import com.chu.designer.repository.DesignerSearchRepository;
import com.chu.global.domain.FaceImageNameDto;
import com.chu.global.domain.HairStyleDict;
import com.chu.global.domain.HairStyleImg;
import com.chu.global.domain.ResponseBestDesignerDto;
import com.chu.global.repository.HairStyleDictRepository;
import com.chu.global.repository.HairStyleImgRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final DesignerSearchRepository designerSearchRepository;
    private final HairStyleImgRepository hairStyleImgRepository;
    private final HairStyleDictRepository hairStyleDictRepository;
    @Override
    public ResponseMainPageDto getMain() {
        ResponseMainPageDto responseMainPageDto = new ResponseMainPageDto();

        try{

            // 1) bestDesigner setting
            List<Designer> designerList = designerSearchRepository.findTop6ByOrderByReviewScoreDesc();
            List<ResponseBestDesignerDto> list = new ArrayList<>();
            for(Designer d : designerList){
                ResponseBestDesignerDto dto = new ResponseBestDesignerDto();

                if(d.getImagePath() == null)
                    dto.setImg(null);
                else dto.setImg(d.getImagePath().getSavedImgName());

                dto.setName(d.getName());
                dto.setDesignerSeq(d.getSeq());

                list.add(dto);
            }

            responseMainPageDto.setBestDesigner(list);



            // 2) statisticsImg setting
            List<FaceImageNameDto> list2 = new ArrayList<>();

            // 2-1) hairStyleImg 테이블에서 이미지 5개 가져오기
            List<HairStyleImg> hairStyleImgList = hairStyleImgRepository.findTop5ByOrderBySeq();

            for(HairStyleImg i : hairStyleImgList){
                int seq = i.getSeq();

                // 헤어스타일 라벨 가져오기
                HairStyleDict hairStyleDict= hairStyleDictRepository.findBySeq(seq);

                list2.add(new FaceImageNameDto(seq, i.getImagePath().getSavedImgName(), hairStyleDict.getHairStyleLabel()));
            }

            responseMainPageDto.setStatisticsImg(list2);

        } catch(Exception e){
            e.printStackTrace();
        }

        return responseMainPageDto;
    }
}
