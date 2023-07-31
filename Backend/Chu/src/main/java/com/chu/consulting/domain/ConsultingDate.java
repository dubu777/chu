package com.chu.consulting.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.time.LocalDate;
import java.time.LocalTime;

@Embeddable
@Getter @Setter
public class ConsultingDate {

    private LocalDate date;
    private LocalTime time;

    protected ConsultingDate() {

    }

    public ConsultingDate(LocalDate date, LocalTime time) {
        this.date = date;
        this.time = time;
    }
}
