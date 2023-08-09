package com.chu.designer.domain;

import lombok.Data;

import java.util.List;

@Data
public class RequestUpdatePossibleRsvTime {

    List<RsvDateAndTimes> dateAndTimes;

}
