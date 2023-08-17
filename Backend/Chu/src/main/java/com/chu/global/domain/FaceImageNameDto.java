package com.chu.global.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FaceImageNameDto {
    int seq;
    String img;
    String label;
}
