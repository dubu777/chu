package com.chu.designer.repository;

import com.chu.designer.domain.DesignerAlert;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Slf4j
@Repository
@RequiredArgsConstructor
public class DesignerAlertRepositoryImpl implements DesignerAlertRepository {

    @Override
    public ArrayList<DesignerAlert> getAlertToDesigner(int designerSeq) {
        ArrayList<DesignerAlert> alertsToDesigner = new ArrayList<>();
        // 로직

        // 고객 seq로 알람 가져오기

        return alertsToDesigner;
    }
}
