package com.chu.consulting.domain;

import lombok.Data;

import java.util.List;

@Data
public class ResponseParticipantConsulting {
    String url;
    List<String> targetHair;
    List<String> confusionHair;
}
