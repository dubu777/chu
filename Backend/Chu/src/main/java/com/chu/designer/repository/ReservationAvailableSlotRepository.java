package com.chu.designer.repository;

import com.chu.designer.domain.ReservationAvailableSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface ReservationAvailableSlotRepository extends JpaRepository<ReservationAvailableSlot, Integer> {
    @Query("SELECT ras FROM ReservationAvailableSlot ras WHERE ras.designer.seq = :designerSeq AND ras.date = :time")
    List<ReservationAvailableSlot> availableSlot(int designerSeq, String time);
}
