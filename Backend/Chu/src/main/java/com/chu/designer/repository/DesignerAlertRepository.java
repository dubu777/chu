package com.chu.designer.repository;

import com.chu.customer.domain.AlertToCustomerDto;
import com.chu.designer.domain.AlertToDesignerDto;

import java.util.ArrayList;

public interface DesignerAlertRepository {

    ArrayList<AlertToDesignerDto> getAlertToDesigner(int designerSeq);
}
