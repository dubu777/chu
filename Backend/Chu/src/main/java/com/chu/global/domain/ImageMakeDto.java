package com.chu.global.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter @Setter
public class ImageMakeDto {

    List<String> fileList;

    List<Integer> portfolioNums;

    int customerSeq;

    int consultingSeq;

    char flag;
}
