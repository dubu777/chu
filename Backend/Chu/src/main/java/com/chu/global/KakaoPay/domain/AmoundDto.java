package com.chu.global.KakaoPay.domain;

import lombok.Data;

@Data
public class AmoundDto {

    private Integer total;
    private Integer tax_free;
    private Integer vat;
    private Integer point;
    private Integer discount;

}
