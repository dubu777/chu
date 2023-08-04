package com.chu.global.domain;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FaceImageNameDto {
    int seq;
    String img;
    String label;
}
