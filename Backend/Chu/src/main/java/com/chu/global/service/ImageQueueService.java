package com.chu.global.service;

import com.chu.global.domain.Consumer;
import com.chu.global.domain.ImageMakeDto;
import org.springframework.stereotype.Service;

@Service
public class ImageQueueService {
    private final Consumer consumer;

    public ImageQueueService(Consumer consumer) {
        this.consumer = consumer;
    }

    public void sendImageToQueue(ImageMakeDto imageMakeDto) {
        consumer.sendImageToQueue(imageMakeDto);
    }
}
