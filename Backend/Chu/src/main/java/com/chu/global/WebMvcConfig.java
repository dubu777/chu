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
        // 이렇게 경로를 여러개 매핑시켜서 이미지를 찾을 수는 있을 것 같은데,

        // 이름이 중복되는 파일이 생기면 어떻게 해야하지

        // 1. 이미지의 이름을 customer, designer, consulting 등으로 명확히 분리한다.
        // 2. 컨트롤러를 ResourceHandler를 여러개 매핑시켜 문제를 해결한다.
        // 3. 이 방법이 맞나 의구심이 너무 든다.
        System.out.println(uploadImagesPath);   //     /chu/upload/images/customer/
        registry.addResourceHandler("/customer-profile/**")       //url패턴 설정
                .addResourceLocations("file:///" + uploadImagesPath)
                .setCachePeriod(3600)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());

        registry.addResourceHandler("/portfolio/**")
                .addResourceLocations("file:///" + "/chu/upload/images/designer/portfolio")
                .setCachePeriod(3600)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
    }
}
