package com.chu.designer.repository;

import com.chu.customer.domain.AlertToCustomerDto;
import com.chu.designer.domain.AlertToDesignerDto;

import java.util.ArrayList;

public interface DesignerAlertRepository {

    // 디자이너 알림 가져오기
    ArrayList<AlertToDesignerDto> getAlertToDesigner(int designerSeq);
}
