package com.chu.customer.service;

import com.chu.customer.domain.*;
import com.chu.customer.repository.CustomerAlertRepository;
import com.chu.customer.repository.CustomerRepository;
import com.chu.customer.repository.TestRepository;
import com.chu.designer.repository.DesignerRepository;
import com.chu.global.domain.*;
import com.chu.global.exception.Exception;
import com.chu.global.jwt.JwtTokenProvider;
import com.chu.worldcup.repository.WorldcupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.concurrent.TimeUnit;


@Slf4j
@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{

    private final CustomerRepository customerRepository;
    private final DesignerRepository designerRepository;
    private final WorldcupRepository worldcupRepository;
    private final CustomerAlertRepository customerAlertRepository;
    private final TestRepository testRepository;
    private final PasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate<String, String> redisTemplate;

    private long refreshTokenExpire = 6000000;

    @Override
    public boolean checkId(String id) {
        return customerRepository.existsById(id);
    }

    @Override
    public boolean checkEmail(String email) {
        return customerRepository.existsByEmail(email);
    }

    @Override
    public void signUp(Customer customer) {
        Customer newCustomer = customer;
        // 비밀번호 암호화
        newCustomer.hashPassword(bCryptPasswordEncoder);
        customerRepository.save(customer);
    }


    /*
    @Override
    public boolean signIn(RequestSignInDto requestSignInDto) {
        return customerRepository.signIn(requestSignInDto);
    }
*/

    // 로그인 테스트
    @Override
    public ResponseCustomerLoginDetailDto signIn(RequestSignInDto requestSignInDto) {

        ResponseCustomerLoginDetailDto responseCustomerLoginDetailDto = new ResponseCustomerLoginDetailDto();

        try{

            // 1) token setting
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            requestSignInDto.getId(),
                            requestSignInDto.getPwd()
                    )
            );

            String refreshToken = jwtTokenProvider.generateRefreshToken(authentication);
            String accessToken = jwtTokenProvider.generateAccessToken(authentication);

            TokenDto tokenDto = new TokenDto(accessToken,refreshToken);

            // Redis 저장 : 만료 시간 설정으로 자동 삭제 처리
            redisTemplate.opsForValue().set(
                    authentication.getName(),
                    refreshToken,
                    refreshTokenExpire,
                    TimeUnit.MILLISECONDS
            );

            //HttpHeaders httpHeaders = new HttpHeaders();
            //httpHeaders.add("Authorization", "Bearer "+tokenDto.getAccessToken());

            responseCustomerLoginDetailDto.setToken(tokenDto);



            // 2) customerInfo setting
            Customer customer = customerRepository.findById(requestSignInDto.getId());
            ResponseCustomerLoginInfoDto responseCustomerLoginInfoDto = new ResponseCustomerLoginInfoDto().entityToDto(customer);

            responseCustomerLoginDetailDto.setCustomerInfo(responseCustomerLoginInfoDto);



            // 3) bestDesigner setting


            return responseCustomerLoginDetailDto;

        } catch(AuthenticationException e){
            throw new Exception("Invalid credentials supplied", HttpStatus.BAD_REQUEST);
        }
    }

//    // 얘가 다 가져오는거야 고객 정보를 그 테이블에 있는건 전부
//    @Override
//    public Customer getCustomerInfo(String id) {
//        return customerRepository.getCustomerInfo(id);
//    }
//
//    @Override
//    public ResponseCustomerLoginDetailDto getLoginCustomerDetail(String id) {
//
//        ResponseCustomerLoginDetailDto responseCustomerLoginDetailDto = new ResponseCustomerLoginDetailDto();
//
//        // 고객 정보 다 가져와서 필요한거 채우기
//        customerRepository.getCustomerInfo(id);
//
//        // 베스트 디자이너 정보 채우기
//        ArrayList<ResponseBestDesignerDto> bestDesignerList = designerRepository.getBestDesigners();
//
//        // 얼굴형에 잘 어울리는 스타일들 사진
//        // 위에서 갖고 온 얼굴형 정보 토대로 검색
//
////        ArrayList<ImageDto> topStyleImageList = customerRepository.getTopStyleByFace("얼굴형시퀀스");
//
//        ArrayList<ImageDto> worldcupTopImageList = worldcupRepository.getTopWorldcupImages();
//
//        // 알림 데이터
//        // 고객 idx로 알림 접근
//        // 상담 IDX 토대로 APi 명세에 따른 로직 추가
//
////        ArrayList<AlertToCustomer> alertList = customerAlertRepository.getAlertToCustomer(customerSeq);
//
//        // 여기에 알람에 따른 디자이너 정보가 추가될꺼야
//        ArrayList<AlertCustomerOnLoginDto> alertDetailList = new ArrayList<>();
//
//        return responseCustomerLoginDetailDto;
//    }
//
//    @Override
//    public String findId(RequestFindIdDto requestFindIdDto) {
//        return customerRepository.findId(requestFindIdDto);
//    }
//
//    @Override
//    public int isValidUser(RequestFindPwdDto requestFindPwdDto) {
//        return customerRepository.isValidUser(requestFindPwdDto);
//    }
//
//    @Override
//    public boolean changePwd(RequestChangePwdDto requestChangePwdDto) {
//        return customerRepository.changePwd(requestChangePwdDto);
//    }
//
//    @Override
//    public int changeLikeInfo(RequestLikeDto requestLikeDto) {
//        return customerRepository.changeLikeInfo(requestLikeDto);
//    }
//
//    @Override
//    public ArrayList<ResponseAlertCustomerDto> getAlertList(int customerSeq) {
//        return customerRepository.getAlertList(customerSeq);
//    }
//
//    @Override
//    public boolean createAlert(RequestAlertCreateDto requestAlertCreateDto) {
//        return customerRepository.createAlert(requestAlertCreateDto);
//    }
//
//    @Override
//    public boolean readAlert(RequestAlertReadDto requestAlertReadDto) {
//        return customerRepository.readAlert(requestAlertReadDto);
//    }
}
