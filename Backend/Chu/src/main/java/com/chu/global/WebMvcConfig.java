package com.chu.global;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
@Order(1)
public class WebMvcConfig implements WebMvcConfigurer {

    private final String uploadImagesPath;

    public WebMvcConfig(@Value("${custom.path.upload-images}") String uploadImagesPath) {
        this.uploadImagesPath = uploadImagesPath;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        System.out.println(uploadImagesPath);   // /home/ubuntu/chu/upload/images/customer/
        registry.addResourceHandler("/api/profile/**")       //url패턴 설정
                .addResourceLocations("file:///" + uploadImagesPath)
                .setCachePeriod(3600)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
    }
}
