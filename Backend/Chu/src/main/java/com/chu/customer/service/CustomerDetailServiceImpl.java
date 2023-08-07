package com.chu.customer.service;

import com.chu.customer.domain.Customer;
import com.chu.customer.domain.RequestCustomerDetailChangeDto;
import com.chu.customer.domain.ResponseCustomerDetailDto;
import com.chu.customer.domain.ResponseCustomerDetailInfoDto;
import com.chu.customer.repository.CustomerDetailRepository;
import com.chu.customer.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomerDetailServiceImpl implements CustomerDetailService {

    private final CustomerDetailRepository customerDetailRepository;

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


    @Override
    public ResponseCustomerDetailDto getCustomerDetail(int customerSeq) {
        ResponseCustomerDetailDto responseCustomerDetailDto = new ResponseCustomerDetailDto();
        //responseCustomerDetailDto.setCustomer(customerDetailRepository.getCustomerInfo(customerSeq));

        // 마이페이지 들어갈때 고객 프로필 사진컬럼에 값이 있으면 서버에서 가져온다
        String originImgName = "img1.png";      //디비가서 찾아온 값


        //responseCustomerDetailDto.setCustomerHairConditionList(customerDetailRepository.getCustomerHairCondition(customerSeq));

        //responseCustomerDetailDto.setResponsePastConsultingDtoList(customerDetailRepository.getPastConsultingList(customerSeq));
        //responseCustomerDetailDto.setResponseFutureConsultingDtoList(customerDetailRepository.getFutureConsultingList(customerSeq));

        return responseCustomerDetailDto;
    }

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
