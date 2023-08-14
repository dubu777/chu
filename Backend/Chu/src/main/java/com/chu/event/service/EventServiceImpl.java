package com.chu.event.service;

import com.chu.consulting.domain.Consulting;
import com.chu.event.domain.Event;
import com.chu.event.domain.ResponseEventDto;
import com.chu.event.repository.EventRepository;
import com.chu.event.service.EventService;
import com.chu.global.domain.ImageMakeDto;
import com.chu.global.domain.ImagePath;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedList;
import java.util.Queue;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final Queue<ImageMakeDto> q = new LinkedList<>();

    @Override
    public ResponseEventDto checkCanMake(int customerSeq) {
        Event event = eventRepository.findByCustomerSeq(customerSeq);
        ResponseEventDto responseEventDto = new ResponseEventDto();

        if(event == null){
            responseEventDto.setState(0);
            Event saveEvent = new Event();
            saveEvent.setCustomerSeq(customerSeq);
            saveEvent.setState(0);
            eventRepository.save(saveEvent);
        }
        else {
            if (event.getState() == 1) {
                responseEventDto.setState(event.getState());
                responseEventDto.setInputImgPath(event.getInputImgPath());
            } else if (event.getState() == 2) {
                responseEventDto.setInputImgPath(event.getInputImgPath());
                responseEventDto.setTargetImgPath(event.getTargetImgPath());
                responseEventDto.setState(event.getState());
            }
            else if(event.getState() == 3){
                responseEventDto.setState(event.getState());
                responseEventDto.setInputImgPath(event.getInputImgPath());
                responseEventDto.setTargetImgPath(event.getTargetImgPath());
            }
            else if(event.getState() == 4){
                responseEventDto.setState(event.getState());
                responseEventDto.setInputImgPath(event.getInputImgPath());
                responseEventDto.setTargetImgPath(event.getTargetImgPath());
                responseEventDto.setConfusionImgPath(event.getConfusionImgPath());
            }
        }
        return responseEventDto;
    }

    @Override
    public String getSavedImgFileEventOriginFile(int customerSeq, MultipartFile file) throws IOException {
        String uploadDir = "/chu/upload/images/customer/event/origin/";

        String fileName = customerSeq + ".png";

        File directory = new File(uploadDir);
        String filePath = uploadDir + fileName;

        File destFile = new File(filePath);
        System.out.println(filePath);

        if (!directory.exists()) {
            boolean mkdirsResult = directory.mkdirs();
            if (mkdirsResult) {
                System.out.println("디렉토리 생성 성공");
            } else {
                System.out.println("디렉토리 생성 실패");
            }
        }

        file.transferTo(destFile);
        log.info("서비스 >>> 파일 저장 성공! filePath : " + filePath);
        return fileName;
    }

    @Override
    public String getSavedImgFileEventTargetFile(int customerSeq, MultipartFile file) throws IOException {
        String uploadDir = "/chu/upload/images/customer/event/target/";

        String fileName = customerSeq + ".png";

        File directory = new File(uploadDir);
        String filePath = uploadDir + fileName;

        File destFile = new File(filePath);
        System.out.println(filePath);

        if (!directory.exists()) {
            boolean mkdirsResult = directory.mkdirs();
            if (mkdirsResult) {
                System.out.println("디렉토리 생성 성공");
            } else {
                System.out.println("디렉토리 생성 실패");
            }
        }

        file.transferTo(destFile);
        log.info("서비스 >>> 파일 저장 성공! filePath : " + filePath);
        return fileName;
    }

    @Override
    public String getSavedImgFileEventConfusionFile(int customerSeq, MultipartFile file) throws IOException {
        String uploadDir = "/chu/upload/images/customer/event/confusion/";

        String fileName = customerSeq + ".png";

        File directory = new File(uploadDir);
        String filePath = uploadDir + fileName;

        File destFile = new File(filePath);
        System.out.println(filePath);

        if (!directory.exists()) {
            boolean mkdirsResult = directory.mkdirs();
            if (mkdirsResult) {
                System.out.println("디렉토리 생성 성공");
            } else {
                System.out.println("디렉토리 생성 실패");
            }
        }

        file.transferTo(destFile);
        log.info("서비스 >>> 파일 저장 성공! filePath : " + filePath);
        return fileName;
    }

    @Override
    public String getInputImageName(int customerSeq) {
        Event event = eventRepository.findByCustomerSeq(customerSeq);

        return event.getInputImgPath();
    }

    @Override
    public String getTargetImageName(int customerSeq){
        Event event = eventRepository.findByCustomerSeq(customerSeq);

        return event.getTargetImgPath();
    }

    @Override
    @Transactional
    public void updateState(int customerSeq, int state) {
        try{
            Event event = eventRepository.findByCustomerSeq(customerSeq);
            event.setState(3);
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    @Transactional
    public void updateInputImageNameAndState(int customerSeq, String inputImgName, int state) {
        try{
            Event event = eventRepository.findByCustomerSeq(customerSeq);
            event.setInputImgPath(inputImgName);
            event.setState(1);
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    @Transactional
    public void updateTargetImageNameAndState(int customerSeq, String targetImgName, int state) {
        try{
            Event event = eventRepository.findByCustomerSeq(customerSeq);
            event.setTargetImgPath(targetImgName);
            event.setState(2);
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    @Transactional
    public void updateConfusionImageNameAndState(int customerSeq, String confusionImgName, int state) {
        try{
            Event event = eventRepository.findByCustomerSeq(customerSeq);
            event.setConfusionImgPath(confusionImgName);
            event.setState(4);
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
