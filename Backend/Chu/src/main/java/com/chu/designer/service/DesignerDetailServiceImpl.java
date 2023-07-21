package com.chu.designer.service;

import com.chu.designer.domain.*;
import com.chu.designer.repository.DesignerDetailRepository;
import com.chu.global.domain.ResponseHairStyleDto;
import com.chu.global.domain.ResponseHairStyleLabelDto;
import com.chu.global.domain.ResponsePermHairStyleDto;
import com.chu.global.domain.TimeDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
public class DesignerDetailServiceImpl implements DesignerDetailService {
    private final DesignerDetailRepository designerDetailRepository;

    @Override
    public ResponseDesignerMyPageDto getMyPageInfo(int designerSeq) {
        ResponseDesignerMyPageDto responseDesignerMyPageDto = new ResponseDesignerMyPageDto();
        // 디자이너 정보
        DesignerDto designerDto = designerDetailRepository.getDesignerInfo(designerSeq);
        
        // 여기서 필요한거 뽑아쓰기

        // 디자이너가 잘하는 머리 스타일
        ArrayList<ResponseHairStyleLabelDto> responseHairStyleLabelDtoArrayList = designerDetailRepository.getHairStyleTag(designerSeq);

        // 디자이너가 그날 가능한 시간
        ArrayList<TimeDto> possibleTimeList = designerDetailRepository.getPossibleTimeList(designerSeq);


        return responseDesignerMyPageDto;
    }

    @Override
    public boolean patchIntroduction(int designerSeq, String introduction) {
        return designerDetailRepository.patchIntroduction(designerSeq, introduction);
    }

    @Override
    public boolean patchImg(int designerSeq, String img) {
        return designerDetailRepository.patchImg(designerSeq, img);
    }

    @Override
    public ResponseDesignerMyPageUpdateShowDto getDesignerMyPageUpdateInfo(int designerSeq) {
        ResponseDesignerMyPageUpdateShowDto responseDesignerMyPageUpdateShowDto = new ResponseDesignerMyPageUpdateShowDto();

        DesignerDto designerDto = designerDetailRepository.getDesignerInfo(designerSeq);

        // 생각해보니 디자이너 지역이 디자이너 안에 있네.. 이거 한 번 고쳐주라.. 나 지금 0721 2256인데 너무 힘들거든,,

        ResponseDesignerAreaInfo designerAreaInfo = designerDetailRepository.getDesignerAreaInfo(designerSeq);

        ArrayList<ResponseHairStyleDto> allCutHairStyle = designerDetailRepository.getAllCutHairStyle();

        ArrayList<ResponsePermHairStyleDto> allPermHairStyle = designerDetailRepository.getAllPermHairStyle();

        ArrayList<ResponseHairStyleDto> myCutHairStyle = designerDetailRepository.getMyCutHairStyle(designerSeq);

        ArrayList<ResponsePermHairStyleDto> myPermHairStyle = designerDetailRepository.getMyPermHairStyle(designerSeq);

        return responseDesignerMyPageUpdateShowDto;
    }

    @Override
    public boolean updateDesignerInfo(int designerSeq, RequestDesignerInfoUpdateDto requestDesignerInfoUpdateDto) {
        
        // 디자이너 정보 수정
        boolean isSuccess = designerDetailRepository.updateDesignerInfo(designerSeq, requestDesignerInfoUpdateDto);

        // 디자이너 잘하는 헤어스타일 수정
        // 이게 전부 삭제하고 다시 전부 넣을지 고민해보고 해야할듯

        return true;
    }
}
