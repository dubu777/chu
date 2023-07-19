package com.chu.designer.service;

import com.chu.designer.domain.DesignerDetailDto;
import com.chu.designer.domain.DesignerDto;
import com.chu.designer.repository.DesignerRepository;
import com.chu.global.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


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
    public int signUp(DesignerDto designerDto) {
        return designerRepository.signUp(designerDto);
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
}
