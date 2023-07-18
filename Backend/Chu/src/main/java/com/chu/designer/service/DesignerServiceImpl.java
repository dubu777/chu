package com.chu.designer.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class DesignerServiceImpl implements DesignerService{

    // repo 주입

    @Override
    public boolean checkId(String id) {
        boolean isSuccess = true;

        // 로직

        if(isSuccess){
            return true;
        }
        else{
            return false;
        }
    }
}
