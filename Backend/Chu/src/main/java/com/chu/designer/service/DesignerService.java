package com.chu.designer.service;

import com.chu.designer.domain.DesignerDto;

public interface DesignerService {
    boolean checkId(String id);
    boolean checkEmail(String email);

    int signUp(DesignerDto designerDto);
}
