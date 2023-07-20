package com.chu.designer.service;

import com.chu.designer.domain.DesignerDetailDto;
import com.chu.designer.domain.DesignerDto;
import com.chu.designer.domain.DesignerMyPageDto;
import com.chu.designer.domain.DesignerSignUpDto;
import com.chu.designer.repository.DesignerRepository;
import com.chu.global.domain.*;
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
    
    @Override
    public boolean checkId(String id) {
        return designerRepository.checkId(id);
    }

    @Override
    public boolean checkEmail(String email) {
        return designerRepository.checkEmail(email);
    }

    @Override
    public int signUp(DesignerSignUpDto designerSignUpDto) {
        return designerRepository.signUp(designerSignUpDto);
    }
    
    @Override
    public boolean signIn(SignInDto signInDto) {
        return designerRepository.signIn(signInDto);
    }

    @Override
    public DesignerDetailDto getDesignerDetail(String id) {
        // 서비스에서 여러번 디비 접근할지 정해야함
        return designerRepository.getDesignerDetail(id);
    }

    @Override
    public String findId(FindIdDto findIdDto) {
        return designerRepository.findId(findIdDto);
    }

    @Override
    public int isValidUser(FindPwdDto findPwdDto) {
        return designerRepository.isValidUser(findPwdDto);
    }

    @Override
    public boolean changePwd(ChangePwdDto changePwdDto) {
        return designerRepository.changePwd(changePwdDto);
    }

    @Override
    public ArrayList<TimeStateDto> getTimeStateList(int designerSeq, Date date) {
        return designerRepository.getTimeStateList(designerSeq, date);
    }

    @Override
    public ArrayList<AlertDesignerDto> getAlertList(int designerSeq) {
        return designerRepository.getAlertList(designerSeq);
    }

    @Override
    public boolean createAlert(AlertCreateDto alertCreateDto) {
        return designerRepository.createAlert(alertCreateDto);
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

}
