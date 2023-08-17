package com.chu.global;

import com.chu.global.domain.ImageMakeDto;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@Configuration
public class QueueConfig {

    @Bean
    public BlockingQueue<ImageMakeDto> imageMakeQueue() {
        return new LinkedBlockingQueue<>();
    }
}