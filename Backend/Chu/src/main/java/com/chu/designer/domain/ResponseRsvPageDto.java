package com.chu.designer.domain;

import lombok.Data;

import java.util.List;

@Data
public class ResponseRsvPageDto {
    List<String> designerPortfolio;
    List<String> randomPortfolio;
}
