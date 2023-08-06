package com.chu.designer.service;

import com.chu.consulting.domain.Consulting;
import com.chu.consulting.repository.ConsultingRepository;
import com.chu.customer.repository.CustomerRepository;
import com.chu.designer.domain.*;
import com.chu.designer.repository.DesignerAlertRepository;
import com.chu.designer.repository.DesignerRepository;
import com.chu.designer.repository.DesignerSearchRepository;
import com.chu.global.domain.*;
import com.chu.global.jwt.JwtTokenProvider;
import com.chu.global.repository.HairStyleDictRepository;
import com.chu.global.repository.HairStyleImgRepository;
import com.chu.worldcup.repository.WorldcupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.concurrent.TimeUnit;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class DesignerServiceImpl implements DesignerService{

    private final DesignerRepository designerRepository;
    private final PasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final DesignerSearchRepository designerSearchRepository;
    private final HairStyleImgRepository hairStyleImgRepository;
    private final HairStyleDictRepository hairStyleDictRepository;
    private final DesignerAlertRepository designerAlertRepository;
    private final ConsultingRepository consultingRepository;
    private final CustomerRepository customerRepository;
    private final RedisTemplate<String, String> redisTemplate;

    private long refreshTokenExpire = 6000000;

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

    // 로그인
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
            redisTemplate.opsForValue().set(
                    authentication.getName(),
                    refreshToken,
                    refreshTokenExpire,
                    TimeUnit.MILLISECONDS
            );

            responseDesignerLoginDetailDto.setToken(tokenDto);



            // 2) DesignerInfo setting
            Designer designer = designerRepository.findById(requestSignInDto.getId());
            ResponseDesignerLoginInfoDto responseDesignerLoginInfoDto = new ResponseDesignerLoginInfoDto().entityToDto(designer);

            responseDesignerLoginDetailDto.setDesignerInfo(responseDesignerLoginInfoDto);



            // 3) bestDesigner setting
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

            responseDesignerLoginDetailDto.setBestDesigner(list);



            // 4) statisticsImg setting
            List<FaceImageNameDto> list4 = new ArrayList<>();

            // 4-1) hairStyleImg 테이블에서 이미지 5개 가져오기
            List<HairStyleImg> hairStyleImgList = hairStyleImgRepository.findTop5ByOrderBySeq();

            for(HairStyleImg i : hairStyleImgList){
                int seq = i.getSeq();

                // 헤어스타일 라벨 가져오기
                HairStyleDict hairStyleDict= hairStyleDictRepository.findBySeq(seq);

                list4.add(new FaceImageNameDto(seq, i.getImagePath().getSavedImgName(), hairStyleDict.getHairStyleLabel()));
            }

            responseDesignerLoginDetailDto.setStatisticsImg(list4);



            // 5. alert setting
            List<AlertDesignerOnLoginDto> list5 = new ArrayList<>();
            int designerSeq = responseDesignerLoginInfoDto.getDesignerSeq();

            // 디자이너 번호로 알림 가져오기
            List<DesignerAlert> alertList = new ArrayList<>();
            alertList = designerAlertRepository.getDesignerAlertBySeq(designerSeq);

            for(DesignerAlert c : alertList){
                // 상담 번호로 consulting - customer seq 받아오기
                Consulting consulting = consultingRepository.getConsultingBySeq(c.getSeq());

                // 받아온 customer seq로 고객 정보 받아오기
                consulting.setCustomer(customerRepository.getCustomerBySeq(consulting.getCustomer().getSeq()));

                // AlertDesignerOnLoginDto 객체 생성
                AlertDesignerOnLoginDto dto = new AlertDesignerOnLoginDto();
                dto.setAlertSeq(c.getSeq());
                dto.setConsultingSeq(consulting.getSeq());
                dto.setCheck(c.getIsCheck());
                dto.setPushDate(consulting.getCancelDate());
                dto.setCustomerName(consulting.getCustomer().getName());

                list5.add(dto);
            }

            responseDesignerLoginDetailDto.setAlert(list5);

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
