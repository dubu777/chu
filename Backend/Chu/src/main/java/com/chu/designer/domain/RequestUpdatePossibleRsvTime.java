package com.chu.designer.domain;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class RequestUpdatePossibleRsvTime {

    List<RsvDateAndTimes> dateAndTimes;
}
