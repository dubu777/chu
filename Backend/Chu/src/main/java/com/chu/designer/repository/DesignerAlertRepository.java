package com.chu.designer.repository;

import com.chu.designer.domain.DesignerAlert;

import java.util.ArrayList;

public interface DesignerAlertRepository {

    ArrayList<DesignerAlert> getAlertToDesigner(int designerSeq);
}
