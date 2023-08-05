package com.chu.designer.service;

import com.chu.designer.domain.*;
import com.chu.designer.repository.DesignerAlertRepository;
import com.chu.designer.repository.DesignerRepository;
import com.chu.global.domain.*;
import com.chu.global.jwt.JwtTokenProvider;
import com.chu.worldcup.repository.WorldcupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;


@Slf4j
@Service
@RequiredArgsConstructor
public class DesignerServiceImpl implements DesignerService{

    private final DesignerRepository designerRepository;
    private final PasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean checkId(String id) {
        return designerRepository.existsById(id);
    }

    @Override
    public boolean checkEmail(String email) {
        return designerRepository.existsByEmail(email);
    }

    // 회원가입
    @Override
    public void signUp(Designer designer) {
        Designer newDesigner = designer;
        // 비밀번호 암호화
        newDesigner.hashPassword(bCryptPasswordEncoder);
        // createDate 세팅
        newDesigner.setCreatedDate(LocalDateTime.now());
        // 기본 가격 세팅
        newDesigner.setCost(5000);
        designerRepository.save(designer);
    }

    @Override
    public ResponseDesignerLoginDetailDto signIn(RequestSignInDto requestSignInDto) {
        ResponseDesignerLoginDetailDto responseDesignerLoginDetailDto = new ResponseDesignerLoginDetailDto();

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

            TokenDto tokenDto = new TokenDto(accessToken, refreshToken);

            // Redis 저장 : 만료 시간 설정으로 자동 삭제 처리
//            redisTemplate.opsForValue().set(
//                    authentication.getName(),
//                    refreshToken,
//                    refreshTokenExpire,
//                    TimeUnit.MILLISECONDS
//            );

            responseDesignerLoginDetailDto.setToken(tokenDto);



            // 2) DesignerInfo setting


        } catch(Exception e){
            e.printStackTrace();
        }

        return responseDesignerLoginDetailDto;
    }

    // 로그인 테스트
//
//    // repo 주입
//    private final DesignerRepository designerRepository;
//    private final WorldcupRepository worldcupRepository;
//    private final DesignerAlertRepository designerAlertRepository;
//
//    @Override
//    public boolean checkId(String id) {
//        return designerRepository.checkId(id);
//    }
//
//    @Override
//    public boolean checkEmail(String email) {
//        return designerRepository.checkEmail(email);
//    }
//
//    @Override
//    public boolean signUp(RequestDesignerSignUpDto requestDesignerSignUpDto) {
//        return designerRepository.signUp(requestDesignerSignUpDto);
//    }
//
//    @Override
//    public boolean signIn(RequestSignInDto requestSignInDto) {
//        return designerRepository.signIn(requestSignInDto);
//    }
//
//    @Override
//    public Designer getDesignerInfo(String id) {
//        return designerRepository.getDesignerInfo(id);
//    }
//
//    @Override
//    public ResponseDesignerLoginDetailDto getLoginDesignerDetail(String id) {
//
//        ResponseDesignerLoginDetailDto responseDesignerLoginDetailDto = new ResponseDesignerLoginDetailDto();
//
//        // 디자니어 정보 다 가져와서 필요한거 채우기
//        designerRepository.getDesignerInfo(id);
//
//        // 베스트 디자이너 정보 채우기
//        ArrayList<ResponseBestDesignerDto> bestDesignerList = designerRepository.getBestDesigners();
//
//        ArrayList<ImageDto> worldcupTopImageList = worldcupRepository.getTopWorldcupImages();
//
//        // 알림 데이터
//        // 디자이너 idx로 알림 접근
//        // 상담 IDX 토대로 APi 명세에 따른 로직 추가
//
////        ArrayList<AlertToDesignerDto> alertDtoList = designerAlertRepository.getAlertToDesigner(designerSeq);
//
//        // 여기에 알람에 따른 고객 정보가 추가하면 될거같은데 이쪽 로직은 다시 고려해봐야겠다,,
//        ArrayList<AlertDesignerOnLoginDto> alertDetailList = new ArrayList<>();
//
//        return responseDesignerLoginDetailDto;
//    }
//
//    @Override
//    public String findId(RequestFindIdDto requestFindIdDto) {
//        return designerRepository.findId(requestFindIdDto);
//    }
//
//    @Override
//    public int isValidUser(RequestFindPwdDto requestFindPwdDto) {
//        return designerRepository.isValidUser(requestFindPwdDto);
//    }
//
//    @Override
//    public boolean changePwd(RequestChangePwdDto requestChangePwdDto) {
//        return designerRepository.changePwd(requestChangePwdDto);
//    }
//
//    @Override
//    public ArrayList<ResponseTimeStateDto> getTimeStateList(int designerSeq, Date date) {
//        return designerRepository.getTimeStateList(designerSeq, date);
//    }
//
//    @Override
//    public ArrayList<ResponseAlertDesignerDto> getAlertList(int designerSeq) {
//        return designerRepository.getAlertList(designerSeq);
//    }
//
//    @Override
//    public boolean createAlert(RequestAlertCreateDto requestAlertCreateDto) {
//        return designerRepository.createAlert(requestAlertCreateDto);
//    }
//
//    @Override
//    public boolean readAlert(RequestAlertReadDto requestAlertReadDto) {
//        return designerRepository.readAlert(requestAlertReadDto);
//    }
}
