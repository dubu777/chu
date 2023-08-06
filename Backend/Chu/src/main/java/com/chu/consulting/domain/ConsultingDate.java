package com.chu.consulting.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.time.LocalDate;
import java.time.LocalTime;

@Embeddable
@Getter @Setter
public class ConsultingDate {

    private String date;
    private String time;

    protected ConsultingDate() {

    }

    public ConsultingDate(String date, String time) {
        this.date = date;
        this.time = time;
    }
}
