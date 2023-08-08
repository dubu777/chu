package com.chu.designer.repository;

import com.chu.designer.domain.DesignerAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;

public interface DesignerAlertRepository extends JpaRepository<DesignerAlert, Integer>{

    List<DesignerAlert> getDesignerAlertByDesignerSeq(int designerSeq);

    // 알림 읽음 처리
    @Modifying
    @Query("UPDATE DesignerAlert a SET a.isCheck = true WHERE a.seq = :alertSeq")
    void checkAlert(int alertSeq);
}
