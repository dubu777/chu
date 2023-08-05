package com.chu.designer.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseDesignerLoginInfoDto {
    int designerSeq;
    String name;
    String profileImg;
}
