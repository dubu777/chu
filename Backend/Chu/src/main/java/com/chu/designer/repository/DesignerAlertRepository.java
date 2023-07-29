package com.chu.designer.repository;

import com.chu.designer.domain.AlertToDesigner;

import java.util.ArrayList;

public interface DesignerAlertRepository {

    ArrayList<AlertToDesigner> getAlertToDesigner(int designerSeq);
}
