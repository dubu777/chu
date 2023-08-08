package com.chu.global.domain;

import lombok.Data;

@Data
public class ResponseUserLoginToken {
    int userSeq;
    TokenDto token;
}
