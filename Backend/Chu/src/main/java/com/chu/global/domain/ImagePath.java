package com.chu.global.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;

@Embeddable
@Getter @Setter
public class ImagePath {

    private String uploadImgName;
    private String savedImgName;

    protected ImagePath() {

    }

    public ImagePath(String uploadImgName, String savedImgName) {
        this.uploadImgName = uploadImgName;
        this.savedImgName = savedImgName;
    }
}
