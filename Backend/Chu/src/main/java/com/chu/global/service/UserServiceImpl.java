package com.chu.global.service;

import com.chu.consulting.domain.Consulting;
import com.chu.consulting.repository.ConsultingRepository;
import com.chu.customer.domain.CustomerAlert;
import com.chu.customer.repository.CustomerAlertRepository;
import com.chu.designer.domain.Designer;
import com.chu.designer.domain.DesignerAlert;
import com.chu.designer.domain.ResponseMainPageDto;
import com.chu.designer.repository.DesignerAlertRepository;
import com.chu.designer.repository.DesignerSearchRepository;
import com.chu.global.domain.*;
import com.chu.global.repository.HairStyleDictRepository;
import com.chu.global.repository.HairStyleImgRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final DesignerSearchRepository designerSearchRepository;
    private final HairStyleImgRepository hairStyleImgRepository;
    private final HairStyleDictRepository hairStyleDictRepository;
    private final ConsultingRepository consultingRepository;
    private final DesignerAlertRepository designerAlertRepository;
    private final CustomerAlertRepository customerAlertRepository;

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
                else dto.setImg(d.getImagePath().getUploadImgName());

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

    @Override
    public void createAlert(RequestAlertCreateDto requestAlertCreateDto) {
        int consultingSeq = requestAlertCreateDto.getConsultingSeq();
        String userType = requestAlertCreateDto.getUserType();

        try{

            // 상담 받아오기
            Consulting consulting = consultingRepository.getConsultingBySeq(consultingSeq);

            // 고객이 취소한 경우 -> 디자이너에게 알림
            if(userType.equals("customer")) {
                DesignerAlert designerAlert = new DesignerAlert();
                designerAlert.setIsCheck(false);
                designerAlert.setCreatedDate(LocalDateTime.now());
                designerAlert.setDesigner(consulting.getDesigner());
                designerAlert.setConsulting(consulting);

                designerAlertRepository.save(designerAlert);
            }
            // 디자이너가 취소한 경우 -> 고객에게 알림
            else if(userType.equals("designer")){
                CustomerAlert customerAlert = new CustomerAlert();
                customerAlert.setIsCheck(false);
                customerAlert.setCreatedDate(LocalDateTime.now());
                customerAlert.setCustomer(consulting.getCustomer());
                customerAlert.setConsulting(consulting);

                customerAlertRepository.save(customerAlert);
            }

        } catch(Exception e){
            e.printStackTrace();
        }

    }
}
