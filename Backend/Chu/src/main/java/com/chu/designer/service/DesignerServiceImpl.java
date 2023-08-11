package com.chu.designer.service;

import com.chu.consulting.domain.Consulting;
import com.chu.consulting.repository.ConsultingRepository;
import com.chu.customer.domain.RequestCustomerChangePwdDto;
import com.chu.customer.repository.CustomerRepository;
import com.chu.designer.domain.*;
import com.chu.designer.repository.*;
import com.chu.global.domain.*;
import com.chu.global.jwt.JwtTokenProvider;
import com.chu.global.repository.HairStyleDictRepository;
import com.chu.global.repository.HairStyleImgRepository;
import com.chu.worldcup.repository.WorldcupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.util.*;
import java.util.concurrent.TimeUnit;

import java.time.LocalDateTime;


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
    private final ReservationAvailableSlotRepository reservationAvailableSlotRepository;
    private final DesignerPortfolioRepository designerPortfolioRepository;

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
    public void signUp(Designer designer, MultipartFile img) {
        Designer newDesigner = designer;
        // 비밀번호 암호화
        newDesigner.hashPassword(bCryptPasswordEncoder);
        // createDate 세팅
        newDesigner.setCreatedDate(LocalDateTime.now());
        // 기본 가격 세팅
        newDesigner.setCost(5000);

        String imgName = img.getOriginalFilename();
        ImagePath imagePath = new ImagePath();
        imagePath.setUploadImgName(imgName);

        newDesigner.setImagePath(imagePath);
        designerRepository.save(designer);

    }

    // 로그인
    @Override
    @Transactional
    public ResponseUserLoginToken signIn(RequestSignInDto requestSignInDto) {

        ResponseUserLoginToken responseDesignerLoginToken = new ResponseUserLoginToken();
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

//            // Redis 저장 : 만료 시간 설정으로 자동 삭제 처리
//            redisTemplate.opsForValue().set(
//                    authentication.getName(),
//                    refreshToken,
//                    refreshTokenExpire,
//                    TimeUnit.MILLISECONDS
//            );
            Designer designer = designerRepository.findById(requestSignInDto.getId());

            // refresh token MySQL에 저장하기
            designerRepository.updateRefreshToken(designer.getSeq(), refreshToken);

            // HTTP 요청 헤더에 "Authorization" 헤더를 추가하는 코드
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Authorization", "Bearer "+tokenDto.getAccessToken());

            responseDesignerLoginToken.setToken(tokenDto);

            responseDesignerLoginToken.setUserSeq(designer.getSeq());

        } catch(Exception e){
            e.printStackTrace();
        }

        return responseDesignerLoginToken;
    }

    // designer 로그인 후 메인페이지
    @Override
    public ResponseDesignerLoginDetailDto getMainPageInfo(int designerSeq) {
        ResponseDesignerLoginDetailDto responseDesignerLoginDetailDto = new ResponseDesignerLoginDetailDto();

        try{

            // 2) DesignerInfo setting
            Designer designer = designerRepository.findBySeq(designerSeq);
            ResponseDesignerLoginInfoDto responseDesignerLoginInfoDto = new ResponseDesignerLoginInfoDto().entityToDto(designer);

            responseDesignerLoginDetailDto.setDesignerInfo(responseDesignerLoginInfoDto);



            // 3) bestDesigner setting
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

            responseDesignerLoginDetailDto.setBestDesigner(list);



            // 4) statisticsImg setting
            List<FaceImageNameDto> list4 = new ArrayList<>();

            // 4-1) hairStyleImg 테이블에서 이미지 5개 가져오기
            List<HairStyleImg> hairStyleImgList = hairStyleImgRepository.findTop5ByOrderBySeq();

            for(HairStyleImg i : hairStyleImgList){
                int seq = i.getSeq();

                // 헤어스타일 라벨 가져오기
                HairStyleDict hairStyleDict= hairStyleDictRepository.findBySeq(seq);

                list4.add(new FaceImageNameDto(seq, i.getImagePath().getUploadImgName(), hairStyleDict.getHairStyleLabel()));
            }

            responseDesignerLoginDetailDto.setStatisticsImg(list4);



            // 5. alert setting
            List<AlertDesignerOnLoginDto> list5 = new ArrayList<>();

            // 디자이너 번호로 알림 가져오기
            List<DesignerAlert> alertList = new ArrayList<>();
            alertList = designerAlertRepository.getDesignerAlertByDesignerSeq(designerSeq);

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

    // 아이디 찾기
    @Override
    public ResponseFindIdDto findId(String name, String email) {

        ResponseFindIdDto response = new ResponseFindIdDto();
        Designer designer = new Designer();

        try{
            designer = designerRepository.findByNameAndEmail(name, email);

            // 일치하는 사용자 존재X
            if(designer == null){
                response.setExists(false);
                response.setId(null);
            }
            // 일치하는 사용자 존재
            else{
                response.setExists(true);
                response.setId(designer.getId());
            }
        } catch(Exception e){
            e.printStackTrace();
        }

        return response;
    }

    // 비밀번호 찾기
    @Override
    public ResponseFindPwdDto findPwd(String name, String email, String id) {

        ResponseFindPwdDto response = new ResponseFindPwdDto();
        Designer designer = new Designer();

        try{
            designer = designerRepository.findByNameAndEmailAndId(name, email, id);

            // 일치하는 사용자 존재 X
            if(designer == null){
                response.setExists(false);
                response.setSeq(0);
            }
            // 일치하는 사용자 존재
            else{
                response.setExists(true);
                response.setSeq(designer.getSeq());
            }
        } catch(Exception e){
            e.printStackTrace();
        }

        return response;
    }

    // 디자이너 비밀번호 변경
    @Override
    @Transactional
    public void changePwd(RequestCustomerChangePwdDto param) {
        if(param.getPwd() != null){
            Designer d = new Designer();
            d.setPwd(param.getPwd());
            d.hashPassword(bCryptPasswordEncoder);
            String pwd = d.getPwd();

            designerRepository.changePwd(param.getCustomerSeq(), pwd);
        }
    }


    @Override
    public List<ResponseTimeStateDto> getTimeStateList(int designerSeq, String date) {

        List<ResponseTimeStateDto> response = new ArrayList<>();
        List<ReservationAvailableSlot> list = new ArrayList<>();
        try{
            list = reservationAvailableSlotRepository.availableSlot(designerSeq, date);

            for(ReservationAvailableSlot r : list){
                ResponseTimeStateDto dto = new ResponseTimeStateDto();
                dto.setTime(r.getTime());
                dto.setState(r.getState());

                response.add(dto);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return response;
    }

    @Override
    public List<AlertDesignerOnLoginDto> getAlert(int designerSeq) {

        List<AlertDesignerOnLoginDto> list = new ArrayList<>();

        // 디자이너 번호로 알림 가져오기
        List<DesignerAlert> alertList = new ArrayList<>();

        alertList = designerAlertRepository.getDesignerAlertByDesignerSeq(designerSeq);

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
            dto.setConsultingDate(consulting.getConsultingDate().getDate());
            dto.setConsultingTime(consulting.getConsultingDate().getTime());

            list.add(dto);
        }

        return list;
    }

    @Override
    @Transactional
    public void checkAlert(int alertSeq) {
        try{
            designerAlertRepository.checkAlert(alertSeq);
        } catch(Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public ResponseRsvPageDto getReservationPage(int designerSeq) {

        ResponseRsvPageDto response = new ResponseRsvPageDto();

        try{
            // 디자이너 포트폴리오 setting
            List<ResponsePortfolioDto> designerPortfolio = new ArrayList<>();

            List<DesignerPortfolio> portfolios = designerPortfolioRepository.findByDesignerSeq(designerSeq);

            for(DesignerPortfolio dp : portfolios){
                ResponsePortfolioDto dto = new ResponsePortfolioDto();
                dto.setImgSeq(dp.getSeq());
                dto.setImgName(dp.getImagePath().getUploadImgName());
                designerPortfolio.add(dto);
            }

            response.setDesignerPortfolio(designerPortfolio);


            // 랜덤 포트폴리오 setting
            List<ResponsePortfolioDto> randomPortfolio = new ArrayList<>();

            List<DesignerPortfolio> randportfolios = new ArrayList<>();
            randportfolios = designerPortfolioRepository.getRandom();

            for(DesignerPortfolio dp : randportfolios){
                ResponsePortfolioDto dto = new ResponsePortfolioDto();
                dto.setImgSeq(dp.getSeq());
                dto.setImgName(dp.getImagePath().getUploadImgName());
                randomPortfolio.add(dto);
            }

            response.setRandomPortfolio(randomPortfolio);

        } catch(Exception e){
            e.printStackTrace();
        }

        return response;
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
