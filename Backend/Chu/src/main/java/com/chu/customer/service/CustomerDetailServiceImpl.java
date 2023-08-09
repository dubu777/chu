package com.chu.customer.service;

import com.chu.consulting.domain.Consulting;
import com.chu.consulting.domain.ResponseFutureConsultingDto;
import com.chu.consulting.domain.ResponsePastConsultingDto;
import com.chu.consulting.repository.ConsultingRepository;
import com.chu.customer.domain.*;
import com.chu.customer.repository.CustomerDetailRepository;
import com.chu.customer.repository.CustomerHairConditionRepository;
import com.chu.customer.repository.CustomerRepository;
import com.chu.designer.domain.Designer;
import com.chu.designer.repository.DesignerRepository;
import com.chu.global.domain.FaceDict;
import com.chu.global.domain.HairConditionDict;
import com.chu.global.domain.HairStyleDict;
import com.chu.global.repository.FaceDictRepository;
import com.chu.global.repository.HairConditionDictRepository;
import com.chu.global.repository.HairStyleDictRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomerDetailServiceImpl implements CustomerDetailService {

    private final CustomerDetailRepository customerDetailRepository;
    private final CustomerRepository customerRepository;
    private final CustomerHairConditionRepository customerHairConditionRepository;
    private final HairStyleDictRepository hairStyleDictRepository;
    private final FaceDictRepository faceDictRepository;
    private final ConsultingRepository consultingRepository;
    private final DesignerRepository designerRepository;
    private final HairConditionDictRepository hairConditionDictRepository;
    private final PasswordEncoder bCryptPasswordEncoder;

    @Override
    public String getSavedImgFilePath(Integer customerSeq, MultipartFile file) throws IOException {

        // 우분투 서버 저장 경로
        String uploadDir = "/chu/upload/images/customer/";
        // 원본 파일명
        String originalFilename = file.getOriginalFilename();
        // 저장될 고유 파일명
        String fileName = customerSeq + "_" + originalFilename;

        // 저장될 경로로 디렉토리 객체 생성
        File directory = new File(uploadDir);
        // 저장될 경로 + 파일명
        String filePath = uploadDir + fileName;
        // 저장될 경로로 파일 객체 생성
        File destFile = new File(filePath);
        System.out.println(filePath);

        if (!directory.exists()) {
            boolean mkdirsResult = directory.mkdirs();
            if (mkdirsResult) {
                System.out.println("디렉토리 생성 성공");
            } else {
                System.out.println("디렉토리 생성 실패");
            }
        }

        try {
            // 파일 지정해놓은 경로에 저장
            file.transferTo(destFile);
            log.info("서비스 >>> 파일 저장 성공! filePath : " + filePath);
            // 저장된 파일 경로 리턴 -> 여기서 db에 저장해야되는 게 정확히 뭐와 뭔지 알아야할듯.
            return filePath;
        } catch (IOException e) {
            log.error("파일 저장 실패:", e);
            throw new IOException("파일 저장 실패: " + e.getMessage(), e);
        }
    }

    @Override
    @Transactional
    public Boolean patchImage(Integer customerSeq, String fileName) {

        // 현재 고객 엔티티 호출. 이거 이렇게 하면 고객 나오나? -> 찍어보기 암튼 저장되는듯
        Customer customer = customerDetailRepository.getById(customerSeq);

        // fileName 고유하게 변경
        String newFileName = customer.getSeq() + fileName;
        log.info("new File Name: "+ newFileName);

        // 저장
        customer.getImagePath().setUploadImgName(fileName);
        customer.getImagePath().setSavedImgName(fileName);

        return true;
    }

    @Override
    public ResponseCustomerDetailDto getCustomerDetail(int customerSeq) {

        ResponseCustomerDetailDto response = new ResponseCustomerDetailDto();


        // 1) customerSeq setting
        response.setCustomerSeq(customerSeq);

        Customer customer = customerRepository.findBySeq(customerSeq);


        // 2) name setting
        response.setName(customer.getName());


        // 3) id setting
        response.setId(customer.getId());


        // 4) email setting
        response.setEmail(customer.getEmail());


        // 5) img setting
        if(customer.getImagePath() != null){
            response.setImg(customer.getImagePath().getUploadImgName());
        }


        // 6) hairCondition setting : customer_hair_condition 테이블에서 customerIdx 로 받아오기
        List<String> list = new ArrayList<>();

        List<CustomerHairCondition> customerHairCondition = customerHairConditionRepository.findAllByCustomerSeq(customerSeq);

        for(CustomerHairCondition ch : customerHairCondition){
            // 모발 상태 번호 받아오기
            int s = ch.getHairConditionDict().getSeq();
            // 라벨링
            HairStyleDict dict = hairStyleDictRepository.findBySeq(s);

            String label = dict.getHairStyleLabel();

            list.add(label);
        }

        response.setHairCondition(list);


        // 7) faceLabel setting
        int faceSeq = customer.getFaceDict().getSeq();

        FaceDict faceDict = faceDictRepository.findBySeq(faceSeq);
        String faceLabel = faceDict.getFaceLabel();

        response.setFaceLabel(faceLabel);


        // 8) futureConsulting setting
        List<ResponseFutureConsultingDto> list8 = new ArrayList<>();

        List<Consulting> futureConsulting = consultingRepository.getFutureConsulting(LocalDate.now().toString(), customerSeq);

        for(Consulting c : futureConsulting){
            ResponseFutureConsultingDto dto = new ResponseFutureConsultingDto();

            dto.setConsultingSeq(c.getSeq());

            Designer designer = designerRepository.getDesignerBySeq(c.getDesigner().getSeq());

            if(designer.getImagePath() != null)
                dto.setDesignerImg(designer.getImagePath().getSavedImgName());
            else
                dto.setDesignerImg(null);
            dto.setReviewScore(designer.getReviewScore());
            dto.setName(designer.getName());
            dto.setConsultingDate(c.getConsultingDate().getDate().toString());
            dto.setConsultingStartTime(c.getConsultingDate().getTime().toString());
            dto.setUrl(c.getUrl());

            list8.add(dto);
        }

        response.setResponseFutureConsultingDtoList(list8);


        // 9) past consulting setting
        List<ResponsePastConsultingDto> list9 = new ArrayList<>();

        List<Consulting> pastConsulting = consultingRepository.getPastConsulting(LocalDate.now().toString(), customerSeq);

        for(Consulting c : pastConsulting){
            ResponsePastConsultingDto dto = new ResponsePastConsultingDto();

            dto.setConsultingSeq(c.getSeq());

            Designer designer = designerRepository.getDesignerBySeq(c.getDesigner().getSeq());

            if(designer.getImagePath() != null)
                dto.setDesignerImg(designer.getImagePath().getSavedImgName());
            else
                dto.setDesignerImg(null);

            dto.setAllReviewScore(designer.getReviewScore());
            dto.setName(designer.getName());
            dto.setConsultingDate(c.getConsultingDate().getDate());
            dto.setConsultingStartTime(c.getConsultingDate().getTime());


            if(c.getReview() == null){
                dto.setMyReviewScore(null);
                dto.setReviewContent(null);
            }
            else{
                dto.setMyReviewScore(c.getReview().getReviewScore());
                dto.setReviewContent(c.getReview().getReviewContent());
            }

            list9.add(dto);
        }

        response.setResponsePastConsultingDtoList(list9);

        return response;
    }

    @Override
    public ResponseCustomerDetailInfoDto getCustomerUpdateDetailInfo(int customerSeq) {

        ResponseCustomerDetailInfoDto response = new ResponseCustomerDetailInfoDto();

        try{
            Customer customer = customerRepository.getCustomerBySeq(customerSeq);

            // 1) name setting
            response.setName(customer.getName());


            // 2) id setting
            response.setId(customer.getId());


            // 3) email setting
            response.setEmail(customer.getEmail());


            // 4) gender setting
            response.setGender(customer.getGender());


            // 5) faceDict setting
            List<FaceDict> faceDictList = faceDictRepository.findAll();

            response.setFaceDict(faceDictList);


            // 6) myFace setting
            response.setMyFace(customer.getFaceDict().getSeq());


            // 7) hairConditionDict setting
            List<HairConditionDict> hairConditionDictList = hairConditionDictRepository.findAll();

            response.setHairConditionDict(hairConditionDictList);


            // 8) myHairCondition setting
            List<Integer> myList = new ArrayList<>();

            List<CustomerHairCondition> list = customerHairConditionRepository.findAllByCustomerSeq(customerSeq);

            for(CustomerHairCondition ch : list){
                myList.add(ch.getHairConditionDict().getSeq());
            }

            response.setMyHairCondition(myList);

        } catch(Exception e){
            e.printStackTrace();
        }

        return response;
    }

    @Override
    @Transactional
    public void putCustomerDetailInfo(int customerSeq, RequestCustomerDetailChangeDto requestCustomerDetailChangeDto) {

        try{
            Customer customer = customerRepository.getCustomerBySeq(customerSeq);

            // 1) pwd 업데이트 : null 이 아닐 때만
            if(requestCustomerDetailChangeDto.getPwd() != null){

                String pwd = requestCustomerDetailChangeDto.getPwd();
                customer.setPwd(pwd);
                customer.hashPassword(bCryptPasswordEncoder);
                pwd = customer.getPwd();

                customerRepository.changePwd(customerSeq, pwd);
            }


            // 2) myFace 업데이트
            int faceSeq = requestCustomerDetailChangeDto.getMyFace();

            customerRepository.updateFaceSeq(customerSeq, faceSeq);


            // 3) myHairCondition 업데이트
            // 3-1) 기존 데이터들 삭제하기
            customerHairConditionRepository.deleteAllByCustomerSeq(customerSeq);

            List<Integer> myHairCondition = requestCustomerDetailChangeDto.getMyHairCondition();

            for(int hc : myHairCondition){
                CustomerHairCondition dto = new CustomerHairCondition();

                dto.setCustomer(customer);

                HairConditionDict dict = hairConditionDictRepository.findBySeq(hc);

                dto.setHairConditionDict(dict);

                // db에 dto 넣기
                customerHairConditionRepository.save(dto);
            }

        } catch(Exception e){
            e.printStackTrace();
        }
    }

    /*
    @PutMapping("/api/v2/members/{id}")
    public UpdateMemberResponse updateMemberV2(@PathVariable("id") Long id,
                                               @RequestBody @Valid UpdateMemberRequest request) {
        //커맨드와 쿼리를 분리하는 스타일을 지향함.( 개인적인 코드 스타일. 유지보수에 용이)
        memberService.update(id, request.getName());    //트랜잭션 완료
        Member findMember = memberService.findOne(id);  //다시 조회

        return new UpdateMemberResponse(findMember.getId(), findMember.getName());
    }
    */

//
//    @Override
//    public ResponseCustomerDetailDto getCustomerDetail(int customerSeq) {
//        ResponseCustomerDetailDto responseCustomerDetailDto = new ResponseCustomerDetailDto();
//        //responseCustomerDetailDto.setCustomer(customerDetailRepository.getCustomerInfo(customerSeq));
//
//        // 마이페이지 들어갈때 고객 프로필 사진컬럼에 값이 있으면 서버에서 가져온다
//        String originImgName = "img1.png";      //디비가서 찾아온 값
//
//
//        //responseCustomerDetailDto.setCustomerHairConditionList(customerDetailRepository.getCustomerHairCondition(customerSeq));
//
//        //responseCustomerDetailDto.setResponsePastConsultingDtoList(customerDetailRepository.getPastConsultingList(customerSeq));
//        //responseCustomerDetailDto.setResponseFutureConsultingDtoList(customerDetailRepository.getFutureConsultingList(customerSeq));
//
//        return responseCustomerDetailDto;
//    }



//    public MultipartFile getCustomerDetailProfile(String originImgName) {
//
//
//
//
//    }
//
//    @Override
//    public ResponseCustomerDetailInfoDto getCustomerUpdateDetailInfo(int customerSeq) {
//        ResponseCustomerDetailInfoDto responseCustomerDetailInfoDto = new ResponseCustomerDetailInfoDto();
//
//        // 고객정보 가져와
//        responseCustomerDetailInfoDto.setCustomer(customerDetailRepository.getCustomerInfo(customerSeq));
//        responseCustomerDetailInfoDto.setFaceDictList(customerDetailRepository.getALLFaceTypeList());
//        responseCustomerDetailInfoDto.setHairStyleList(customerDetailRepository.getAllHairStyleList());
//
//        responseCustomerDetailInfoDto.setHairConditionList(customerDetailRepository.getCustomerHairCondition(customerSeq));
//
//
//        return responseCustomerDetailInfoDto;
//    }
//
//    @Override
//    public boolean putCustomerDetailInfo(int customerSeq, RequestCustomerDetailChangeDto requestCustomerDetailChangeDto) {
//        boolean isSuccess = true;
//
//        // 고객정보, 얼굴형 수정
//        boolean customerInfoFaceUpdateSuccess = customerDetailRepository.updateCustomerInfo(customerSeq, requestCustomerDetailChangeDto);
//        // 고객 모발상태 수정
//        boolean customerHairStatusUpdateSuccess = customerDetailRepository.updateHairStyleInfo(customerSeq, requestCustomerDetailChangeDto);
//
//        // 둘다 완료됐으면
//        if (customerHairStatusUpdateSuccess && customerInfoFaceUpdateSuccess) {
//            return true;
//        }
//        else {
//            return false;
//        }
//    }
}
