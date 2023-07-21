package com.chu.customer.service;

import com.chu.customer.domain.*;
import com.chu.customer.repository.CustomerAlertRepository;
import com.chu.customer.repository.CustomerRepository;
import com.chu.designer.repository.DesignerRepository;
import com.chu.global.domain.*;
import com.chu.worldcup.repository.WorldcupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Slf4j
@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{

    private final CustomerRepository customerRepository;
    private final DesignerRepository designerRepository;
    private final WorldcupRepository worldcupRepository;
    private final CustomerAlertRepository customerAlertRepository;

    @Override
    public boolean checkId(String id) {
        return customerRepository.checkId(id);
    }

    @Override
    public boolean checkEmail(String email) {
        return customerRepository.checkEmail(email);
    }

    @Override
    public boolean signUp(RequestCustomerSignUpDto requestCustomerSignUpDto) {
        return customerRepository.signUp(requestCustomerSignUpDto);
    }

    @Override
    public boolean signIn(RequestSignInDto requestSignInDto) {
        return customerRepository.signIn(requestSignInDto);
    }


    // 얘가 다 가져오는거야 고객 정보를 그 테이블에 있는건 전부
    @Override
    public CustomerDto getCustomerInfo(String id) {
        return customerRepository.getCustomerInfo(id);
    }

    @Override
    public ResponseCustomerLoginDetailDto getLoginCustomerDetail(String id) {

        ResponseCustomerLoginDetailDto responseCustomerLoginDetailDto = new ResponseCustomerLoginDetailDto();

        // 고객 정보 다 가져와서 필요한거 채우기
        customerRepository.getCustomerInfo(id);

        // 베스트 디자이너 정보 채우기
        ArrayList<BestDesignerDto> bestDesignerList = designerRepository.getBestDesigners();

        // 얼굴형에 잘 어울리는 스타일들 사진
        // 위에서 갖고 온 얼굴형 정보 토대로 검색
        ArrayList<ImageDto> topStyleImageList = customerRepository.getTopStyleByFace(얼굴형시퀀스);

        ArrayList<ImageDto> worldcupTopImageList = worldcupRepository.getTopWorldcupImages();

        // 알림 데이터
        // 고객 idx로 알림 접근
        // 상담 IDX 토대로 APi 명세에 따른 로직 추가
        ArrayList<AlertToCustomerDto> alertList = customerAlertRepository.getAlertToCustomer(customerSeq);

        // 여기에 알람에 따른 디자이너 정보가 추가될꺼야
        ArrayList<AlertCustomerOnLoginDto> alertDetailList = new ArrayList<>();

        return responseCustomerLoginDetailDto;
    }

    @Override
    public String findId(RequestFindIdDto requestFindIdDto) {
        return customerRepository.findId(requestFindIdDto);
    }

    @Override
    public int isValidUser(RequestFindPwdDto requestFindPwdDto) {
        return customerRepository.isValidUser(requestFindPwdDto);
    }

    @Override
    public boolean changePwd(RequestChangePwdDto requestChangePwdDto) {
        return customerRepository.changePwd(requestChangePwdDto);
    }

    @Override
    public int changeLikeInfo(RequestLikeDto requestLikeDto) {
        return customerRepository.changeLikeInfo(requestLikeDto);
    }

    @Override
    public CustomerDetailDto getCustomerDetail(int customerSeq) {
        return customerRepository.getCustomerDetail(customerSeq);
    }

    @Override
    public boolean patchImage(String imgName) {
        return customerRepository.patchImage(imgName);
    }

    @Override
    public CustomerDetailInfoDto getCustomerDetailInfo(int customerSeq) {
        return customerRepository.getCustomerDetailInfo(customerSeq);
    }

    @Override
    public boolean putCustomerDetailInfo(int customerSeq, CustomerDetailChangeDto customerDetailChangeDto) {
        return customerRepository.putCustomerDetailInfo(customerSeq, customerDetailChangeDto);
    }

    @Override
    public ArrayList<AlertCustomerDto> getAlertList(int customerSeq) {
        return customerRepository.getAlertList(customerSeq);
    }

    @Override
    public boolean createAlert(AlertCreateDto alertCreateDto) {
        return customerRepository.createAlert(alertCreateDto);
    }

    @Override
    public boolean readAlert(AlertReadDto alertReadDto) {
        return customerRepository.readAlert(alertReadDto);
    }
}
