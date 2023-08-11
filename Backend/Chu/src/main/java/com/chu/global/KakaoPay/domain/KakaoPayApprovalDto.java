package com.chu.global.KakaoPay.domain;

import lombok.Data;

import java.util.Date;

// 응답 정보 받기 이한 dto
@Data
public class KakaoPayApprovalDto {

    private String aid;
    private String tid;
    private String cid;
    private String sid;

    private String partner_order_id;
    private String partner_user_id;
    private String payment_method_type;

    private AmoundDto amount;
    private CardInfoDto card_info;

    private String item_name;
    private String item_code;
    private String payload;

    private Integer quantity;
    private Integer tax_free_amount;
    private Integer vat_amount;

    private Date created_at;
    private Date approved_at;
}
