package com.chu.customer.service;

import com.chu.consulting.domain.Consulting;
import com.chu.consulting.domain.ConsultingResult;
import com.chu.consulting.repository.ConsultingRepository;
import com.chu.consulting.repository.ConsultingResultRepository;
import com.chu.customer.domain.*;
import com.chu.customer.repository.CustomerAlertRepository;
import com.chu.customer.repository.CustomerRepository;
import com.chu.designer.domain.Designer;
import com.chu.designer.domain.DesignerLike;
import com.chu.designer.repository.DesignerLikeRepository;
import com.chu.designer.repository.DesignerRepository;
import com.chu.designer.repository.DesignerSearchRepository;
import com.chu.global.domain.*;
import com.chu.global.exception.Exception;
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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{

    private final CustomerRepository customerRepository;
    private final DesignerRepository designerRepository;
    private final DesignerSearchRepository designerSearchRepository;
    private final WorldcupRepository worldcupRepository;
    private final CustomerAlertRepository customerAlertRepository;
    private final ConsultingResultRepository consultingResultRepository;
    private final ConsultingRepository consultingRepository;
    private final HairStyleDictRepository hairStyleDictRepository;
    private final HairStyleImgRepository hairStyleImgRepository;
    private final DesignerLikeRepository designerLikeRepository;
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
        // createDate 세팅
        newCustomer.setCreatedDate(LocalDateTime.now());
        newCustomer.getFaceDict().setSeq(1);
        customerRepository.save(customer);
    }

    // 비밀번호 찾기
    @Override
    public ResponseFindPwdDto findPwd(String name, String email, String id) {

        ResponseFindPwdDto response = new ResponseFindPwdDto();
        Customer customer = new Customer();

        try{
            customer = customerRepository.findByNameAndEmailAndId(name, email, id);

            // 일치하는 사용자 존재 X
            if(customer == null){
                response.setExists(false);
                response.setSeq(0);
            }
            // 일치하는 사용자 존재
            else{
                response.setExists(true);
                response.setSeq(customer.getSeq());
            }
        } catch(Exception e){
            e.printStackTrace();
        }

        return response;
    }

    // 고객 비밀번호 변경
    @Override
    @Transactional
    public void changePwd(RequestCustomerChangePwdDto param) {
        Customer c = new Customer();
        c.setPwd(param.getPwd());
        c.hashPassword(bCryptPasswordEncoder);
        String pwd = c.getPwd();

        customerRepository.changePwd(param.getCustomerSeq(), pwd);
    }

    // 고객 알림 조회
    @Override
    public List<AlertCustomerOnLoginDto> getAlert(int customerSeq) {

        List<AlertCustomerOnLoginDto> list = new ArrayList<>();

        // 고객 번호로 알림 가져오기
        List<CustomerAlert> alertList = new ArrayList<>();
        alertList = customerAlertRepository.getCustomerAlertByCustomerSeq(customerSeq);

        for(CustomerAlert c : alertList){
            // 상담 번호로 consulting - designer seq 받아오기
            Consulting consulting = consultingRepository.getConsultingBySeq(c.getSeq());

            // 받아온 designer seq로 디자이너 정보 받아오기
            consulting.setDesigner(designerRepository.getDesignerBySeq(consulting.getDesigner().getSeq()));

            // AlertCustomerOnLoginDto 객체 생성
            AlertCustomerOnLoginDto dto = new AlertCustomerOnLoginDto();
            dto.setAlertSeq(c.getSeq());
            dto.setConsultingSeq(consulting.getSeq());
            dto.setCheck(c.getIsCheck());
            dto.setPushDate(consulting.getCancelDate());
            dto.setDesignerName(consulting.getDesigner().getName());

            list.add(dto);
        }

        return list;
    }


    /*
    @Override
    public boolean signIn(RequestSignInDto requestSignInDto) {
        return customerRepository.signIn(requestSignInDto);
    }
*/

    // customer 로그인
    @Override
    @Transactional  // faceDict LazyInitializationException
    public ResponseUserLoginToken signIn(RequestSignInDto requestSignInDto) {

        ResponseUserLoginToken responseCustomerLoginToken = new ResponseUserLoginToken();

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

//            // Redis 저장 : 만료 시간 설정으로 자동 삭제 처리
//            redisTemplate.opsForValue().set(
//                    authentication.getName(),
//                    refreshToken,
//                    refreshTokenExpire,
//                    TimeUnit.MILLISECONDS
//            );
            Customer customer = customerRepository.findById(requestSignInDto.getId());

            // refresh token MySQL에 저장하기
            customerRepository.updateRefreshToken(customer.getSeq() ,refreshToken);

            // HTTP 요청 헤더에 "Authorization" 헤더를 추가하는 코드
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Authorization", "Bearer "+tokenDto.getAccessToken());

            responseCustomerLoginToken.setToken(tokenDto);

            responseCustomerLoginToken.setUserSeq(customer.getSeq());

        } catch(Exception e){
            e.printStackTrace();
        }

        return responseCustomerLoginToken;
    }


    // customer 로그인 후 메인페이지
    @Override
    @Transactional  // faceDict LazyInitializationException
    public ResponseCustomerLoginDetailDto getMainPageInfo(int customerSeq) {

        ResponseCustomerLoginDetailDto responseCustomerLoginDetailDto = new ResponseCustomerLoginDetailDto();

        try{

            // 2) customerInfo setting
            Customer customer = customerRepository.findBySeq(customerSeq);
            if(customer == null)
                return null;
            ResponseCustomerLoginInfoDto responseCustomerLoginInfoDto = new ResponseCustomerLoginInfoDto().entityToDto(customer);

            responseCustomerLoginDetailDto.setCustomerInfo(responseCustomerLoginInfoDto);



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

            responseCustomerLoginDetailDto.setBestDesigner(list);



            // 4) recommendImg setting
            List<FaceImageNameDto> list4 = new ArrayList<>();

            // 4-1) 고객 얼굴형 받아오기
            int faceSeq = customer.getFaceDict().getSeq();

            // 4-2) cunsulting result 테이블에서 얼굴형 일치하는 데이터 6개 가져오기
            List<ConsultingResult> conResultList= consultingResultRepository.findTop6BySeq(faceSeq);

            // conResultList에서 헤어스타일 seq로 hairStyleDict 테이블에서 데이터 뽑아내기
            List<HairStyleDict> hairStyleDictList = new ArrayList<>();
            for(int i=0; i<conResultList.size(); i++){
                ConsultingResult c = conResultList.get(i);

                HairStyleDict h = hairStyleDictRepository.findBySeq(c.getSeq());

                // 헤어스타일 seq 받기
                int hairStyleSeq = h.getSeq();
                // 받은 seq로 헤어스타일 이미지 테이블에서 이미지 받아오기
                HairStyleImg hairStyleImg = new HairStyleImg();
                hairStyleImg = hairStyleImgRepository.findBySeq(hairStyleSeq);

                // hairStyleImg 가 null이 아닌 경우에만
                if(hairStyleImg != null){
                    // 리스트에 넣기
                    FaceImageNameDto  dto = new FaceImageNameDto();
                    dto.setSeq(hairStyleSeq);
                    dto.setLabel(h.getHairStyleLabel());

                    if(hairStyleImg.getImagePath() == null)
                        dto.setImg(null);
                    else
                        dto.setImg(hairStyleImg.getImagePath().getUploadImgName());
                    //list4.add(new FaceImageNameDto(hairStyleSeq, hairStyleImg.getImagePath().getUploadImgName(), h.getHairStyleLabel()));
                    list4.add(dto);
                }

            }

            responseCustomerLoginDetailDto.setRecommendImg(list4);



            // 5. statisticsImg setting
            List<FaceImageNameDto> list5 = new ArrayList<>();

            // 5-1) hairStyleImg 테이블에서 이미지 5개 가져오기
            List<HairStyleImg> hairStyleImgList = hairStyleImgRepository.findTop5ByOrderBySeq();

            for(HairStyleImg i : hairStyleImgList){
                int seq = i.getSeq();

                // 헤어스타일 라벨 가져오기
                HairStyleDict hairStyleDict= hairStyleDictRepository.findBySeq(seq);

                list5.add(new FaceImageNameDto(seq, i.getImagePath().getSavedImgName(), hairStyleDict.getHairStyleLabel()));
            }

            responseCustomerLoginDetailDto.setStatisticsImg(list5);



            // 6. alert setting
            List<AlertCustomerOnLoginDto> list6 = new ArrayList<>();

            // 고객 번호로 알림 가져오기
            List<CustomerAlert> alertList = new ArrayList<>();
            alertList = customerAlertRepository.getCustomerAlertByCustomerSeq(customerSeq);

            for(CustomerAlert c : alertList){
                // 상담 번호로 consulting - designer seq 받아오기
                Consulting consulting = consultingRepository.getConsultingBySeq(c.getSeq());

                // 받아온 designer seq로 디자이너 정보 받아오기
                consulting.setDesigner(designerRepository.getDesignerBySeq(consulting.getDesigner().getSeq()));

                // AlertCustomerOnLoginDto 객체 생성
                AlertCustomerOnLoginDto dto = new AlertCustomerOnLoginDto();
                dto.setAlertSeq(c.getSeq());
                dto.setConsultingSeq(consulting.getSeq());
                dto.setCheck(c.getIsCheck());
                dto.setPushDate(consulting.getCancelDate());
                dto.setDesignerName(consulting.getDesigner().getName());

                list6.add(dto);
            }

            responseCustomerLoginDetailDto.setAlert(list6);

        } catch(Exception e){
            e.printStackTrace();
        }

        return responseCustomerLoginDetailDto;
    }

    @Override
    @Transactional
    public void checkAlert(int alertSeq) {
        try{
            customerAlertRepository.checkAlert(alertSeq);
        } catch(Exception e){
            e.printStackTrace();
        }
    }

    // 아이디 찾기
    @Override
    public ResponseFindIdDto findId(String name, String email) {

        ResponseFindIdDto response = new ResponseFindIdDto();
        Customer customer = new Customer();

        try{
            customer = customerRepository.findByNameAndEmail(name, email);

            // 일치하는 사용자 존재X
            if(customer == null){
                response.setExists(false);
                response.setId(null);
            }
            // 일치하는 사용자 존재
            else{
                response.setExists(true);
                response.setId(customer.getId());
            }
        } catch(Exception e){
            e.printStackTrace();
        }

        return response;
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
    @Override
    @Transactional
    public ResponseLikeDto changeLikeInfo(RequestLikeDto requestLikeDto) {

        // 디자이너 혹은 고객이 없는 시퀀스가 들어오면 null 반환
        if(!designerRepository.existsBySeq(requestLikeDto.getDesignerSeq()) || !customerRepository.existsBySeq(requestLikeDto.getCustomerSeq())) return null;

        if(requestLikeDto.getIsLike()) {    // 좋아요
            // 쌍이 존재하는지 확인
            int likeCnt = designerLikeRepository.countByCustomerSeqAndDesignerSeq(requestLikeDto.getCustomerSeq(), requestLikeDto.getDesignerSeq());
            log.info("likeCnt "+ likeCnt);
            if(likeCnt == 1) {
                // like_status 를 true로 update
                DesignerLike designerLike = designerLikeRepository.findByCustomerSeqAndDesignerSeq(requestLikeDto.getCustomerSeq(), requestLikeDto.getDesignerSeq());
                designerLike.setLikeStatus(true);

            } else if(likeCnt == 0) {
                // insert
                Designer designer = designerRepository.findBySeq(requestLikeDto.getDesignerSeq());
                Customer customer = customerRepository.findBySeq(requestLikeDto.getCustomerSeq());

                DesignerLike designerLike = new DesignerLike(customer, designer,true, LocalDateTime.now());
                designerLikeRepository.save(designerLike);
            }
        } else {    //좋아요 취소
            DesignerLike designerLike = designerLikeRepository.findByCustomerSeqAndDesignerSeq(requestLikeDto.getCustomerSeq(), requestLikeDto.getDesignerSeq());
            designerLike.setLikeStatus(false);
        }
        // 갱신된 좋아요 수 구하기
        Integer likeCnt = designerLikeRepository.countByDesignerSeq(requestLikeDto.getDesignerSeq());

        ResponseLikeDto responseLikeDto = new ResponseLikeDto();
        responseLikeDto.setLikeCnt(likeCnt);
        responseLikeDto.setIsLike(designerLikeRepository.findByCustomerSeqAndDesignerSeq(requestLikeDto.getCustomerSeq(), requestLikeDto.getDesignerSeq()).getLikeStatus());

        return responseLikeDto;
    }

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
