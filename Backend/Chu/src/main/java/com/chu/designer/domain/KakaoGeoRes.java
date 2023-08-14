package com.chu.designer.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.Getter;

import java.util.HashMap;
import java.util.List;

@Data
//@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoGeoRes {
    private HashMap<String, Object> meta;
    private List<Documents> documents;
}