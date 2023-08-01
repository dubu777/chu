package com.chu.global.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenDto {
    String accessToken;
    String refreshToken;
}
