package com.chu.designer.repository;

import com.chu.designer.domain.ReservationAvailableSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface ReservationAvailableSlotRepository extends JpaRepository<ReservationAvailableSlot, Integer> {
    @Query("SELECT ras FROM ReservationAvailableSlot ras WHERE ras.designer.seq = :designerSeq AND ras.date = :time")
    List<ReservationAvailableSlot> availableSlot(int designerSeq, String time);

    // 상담 예약 완료 후 ‘reservation_available_slot’ 테이블 ‘state’ 컬럼 ‘R’로 바꾸기
    @Modifying
    @Query("UPDATE ReservationAvailableSlot r SET r.state = 'R' WHERE r.date = :date and r.time = :time and r.designer.seq = :designerSeq")
    void updateReserveSlotState(String date, String time, int designerSeq);
}
