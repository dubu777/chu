package com.chu.global;

import lombok.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    public WebMvcConfig(@Value("${custom.path.upload-images}") String uploadImagesPath) {
        this.uploadImagesPath = uploadImagesPath;
    }


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        //https://i9b205.p.ssafy.io/member/img/imgg3.jpg 을 통해 이미지에 접근
        //file:실제 파일 저장 경로/
        //이미지 파일 저장된 경로 : /chu/upload/images/member/
        //domain/member/img/+imgname;
        registry.addResourceHandler("/mypage/**")       //url패턴 설정
                .addResourceLocations("file:/chu/upload/images/customer/");    //실제 파일 저장 경로

    }
}
