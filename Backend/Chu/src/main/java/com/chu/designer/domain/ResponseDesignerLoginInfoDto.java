package com.chu.designer.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseDesignerLoginInfoDto {
    int designerSeq;
    String name;
    String profileImg;

    public ResponseDesignerLoginInfoDto entityToDto(Designer designer){
        ResponseDesignerLoginInfoDto dto = new ResponseDesignerLoginInfoDto();

        dto.setDesignerSeq(designer.getSeq());
        dto.setName(designer.getName());

        if(designer.getImagePath() == null)
            dto.setProfileImg(null);
        else dto.setProfileImg((designer.getImagePath().getSavedImgName()));

        return dto;
    }
}
