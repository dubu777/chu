package com.chu.designer.domain;

import lombok.Data;

@Data
public class RequestDesignerSignUpDto {
    String name;
    String id;
    String email;
    char gender;
    String pwd;
    String certificationNum;

    public Designer toDesignerEntity(){
        Designer designer = new Designer();

        designer.setName(this.getName());
        designer.setId(this.getId());
        designer.setEmail(this.getEmail());
        designer.setGender(this.getGender());
        designer.setPwd(this.getPwd());
        designer.setCertificationNum(this.certificationNum);

        return designer;
    }

}
