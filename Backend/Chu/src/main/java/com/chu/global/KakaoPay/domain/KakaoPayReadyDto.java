package com.chu.global.KakaoPay.domain;

import lombok.Data;

import java.util.Date;

@Data
public class KakaoPayReadyDto {

    private String tid;
    private String next_redirect_pc_url;

    private Date created_at;
}
