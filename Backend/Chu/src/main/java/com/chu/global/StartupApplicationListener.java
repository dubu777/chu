package com.chu.global;

import com.chu.global.domain.Consumer;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class StartupApplicationListener implements ApplicationListener<ApplicationReadyEvent> {

    private final Consumer consumer;

    public StartupApplicationListener(Consumer consumer) {
        this.consumer = consumer;
    }

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        new Thread(consumer).start();
    }
}