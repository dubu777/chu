package com.chu.designer.service;

import com.chu.consulting.domain.ConsultingDto;
import com.chu.designer.domain.*;
import com.chu.designer.repository.DesignerAlertRepository;
import com.chu.designer.repository.DesignerRepository;
import com.chu.global.domain.*;
import com.chu.worldcup.repository.WorldcupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;


@Slf4j
@Service
@RequiredArgsConstructor
public class DesignerServiceImpl implements DesignerService{

    // repo 주입
    private final DesignerRepository designerRepository;
    private final WorldcupRepository worldcupRepository;
    private final DesignerAlertRepository designerAlertRepository;
    
    @Override
    public boolean checkId(String id) {
        return designerRepository.checkId(id);
    }

    @Override
    public boolean checkEmail(String email) {
        return designerRepository.checkEmail(email);
    }

    @Override
    public boolean signUp(RequestDesignerSignUpDto requestDesignerSignUpDto) {
        return designerRepository.signUp(requestDesignerSignUpDto);
    }
    
    @Override
    public boolean signIn(RequestSignInDto requestSignInDto) {
        return designerRepository.signIn(requestSignInDto);
    }

    @Override
    public DesignerDto getDesignerInfo(String id) {
        return designerRepository.getDesignerInfo(id);
    }

    @Override
    public ResponseDesignerLoginDetailDto getLoginDesignerDetail(String id) {

        ResponseDesignerLoginDetailDto responseDesignerLoginDetailDto = new ResponseDesignerLoginDetailDto();

        // 디자니어 정보 다 가져와서 필요한거 채우기
        designerRepository.getDesignerInfo(id);

        // 베스트 디자이너 정보 채우기
        ArrayList<BestDesignerDto> bestDesignerList = designerRepository.getBestDesigners();

        ArrayList<ImageDto> worldcupTopImageList = worldcupRepository.getTopWorldcupImages();

        // 알림 데이터
        // 디자이너 idx로 알림 접근
        // 상담 IDX 토대로 APi 명세에 따른 로직 추가

//        ArrayList<AlertToDesignerDto> alertDtoList = designerAlertRepository.getAlertToDesigner(designerSeq);

        // 여기에 알람에 따른 고객 정보가 추가하면 될거같은데 이쪽 로직은 다시 고려해봐야겠다,,
        ArrayList<AlertDesignerOnLoginDto> alertDetailList = new ArrayList<>();

        return responseDesignerLoginDetailDto;
    }

    @Override
    public String findId(RequestFindIdDto requestFindIdDto) {
        return designerRepository.findId(requestFindIdDto);
    }

    @Override
    public int isValidUser(RequestFindPwdDto requestFindPwdDto) {
        return designerRepository.isValidUser(requestFindPwdDto);
    }

    @Override
    public boolean changePwd(RequestChangePwdDto requestChangePwdDto) {
        return designerRepository.changePwd(requestChangePwdDto);
    }

    @Override
    public ArrayList<ResponseTimeStateDto> getTimeStateList(int designerSeq, Date date) {
        return designerRepository.getTimeStateList(designerSeq, date);
    }

    @Override
    public ArrayList<ResponseAlertDesignerDto> getAlertList(int designerSeq) {
        return designerRepository.getAlertList(designerSeq);
    }

    @Override
    public boolean createAlert(RequestAlertCreateDto requestAlertCreateDto) {
        return designerRepository.createAlert(requestAlertCreateDto);
    }

    @Override
    public boolean readAlert(AlertReadDto alertReadDto) {
        return designerRepository.readAlert(alertReadDto);
    }

    @Override
    public DesignerMyPageDto getMyPageInfo(int designerSeq) {
        return designerRepository.getMyPageInfo(designerSeq);
    }

    @Override
    public boolean patchIntroduction(int designerSeq, String introduction) {
        return designerRepository.patchIntroduction(designerSeq, introduction);
    }

    @Override
    public boolean patchImg(int designerSeq, String img) {
        return designerRepository.patchImg(designerSeq, img);
    }

    @Override
    public DesignerMyPageUpdateShowDto getDesignerMyPageUpdateInfo(int designerSeq) {
        return designerRepository.getDesignerMyPageUpdateInfo(designerSeq);
    }

    @Override
    public boolean updateDesignerInfo(int designerSeq, DesignerInfoUpdateDto designerInfoUpdateDto) {
        return designerRepository.updateDesignerInfo(designerSeq, designerInfoUpdateDto);
    }

    @Override
    public ArrayList<TimeDto> getPossibleReservationTime(int designerSeq, Date date) {
        return designerRepository.getPossibleReservationTime(designerSeq, date);
    }

    @Override
    public boolean updatePossibleReservationTime(int designerSeq, ReservationTimeDto reservationTimeDto) {
        return designerRepository.updatePossibleReservationTime(designerSeq, reservationTimeDto);
    }

    @Override
    public ArrayList<ConsultingDto> getReservationList(int designerSeq) {
        return designerRepository.getReservationList(designerSeq);
    }

    @Override
    public ArrayList<ImageDto> getPortfolio(int designerSeq) {
        return designerRepository.getPortfolio(designerSeq);
    }

    @Override
    public boolean deletePortfolioImage(int designerSeq, int imageSeq) {
        return designerRepository.deletePortfolioImage(designerSeq, imageSeq);
    }

    @Override
    public boolean postPortfolioImage(int designerSeq, String img) {
        return designerRepository.postPortfolioImage(designerSeq, img);
    }

    @Override
    public ArrayList<BestDesignerDto> getBestDesignerInfo() {
        ArrayList<BestDesignerDto> bestDesignerInfoList = new ArrayList<>();

        designerRepository.getBestDesigners();
        return bestDesignerInfoList;
    }
}
