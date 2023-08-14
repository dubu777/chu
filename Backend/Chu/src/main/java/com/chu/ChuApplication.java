package com.chu;

import com.chu.global.domain.Consumer;
import com.chu.global.domain.ImageMakeDto;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@SpringBootApplication
public class ChuApplication {
	public static void main(String[] args) {
		SpringApplication.run(ChuApplication.class, args);
	}
}
