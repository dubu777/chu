package com.chu.designer.domain;

import com.chu.global.domain.HairStyleDict;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString
public class HairStyleDto {

    private Integer hairStyleSeq;
    private String hairStyleLabel;

    public HairStyleDto(HairStyleDict hairStyleDict) {
        this.hairStyleSeq = hairStyleDict.getSeq();
        this.hairStyleLabel = hairStyleDict.getHairStyleLabel();
    }
}
