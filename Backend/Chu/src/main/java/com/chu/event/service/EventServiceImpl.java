package com.chu.event.service;

import com.chu.consulting.domain.Consulting;
import com.chu.event.domain.Event;
import com.chu.event.domain.ResponseEventDto;
import com.chu.event.repository.EventRepository;
import com.chu.event.service.EventService;
import com.chu.global.domain.ImagePath;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;


    @Override
    public ResponseEventDto checkCanMake(int customerSeq) {
        Event event = eventRepository.findByCustomerSeq(customerSeq);
        ResponseEventDto responseEventDto = new ResponseEventDto();

        if(event.getState() == 0){
            responseEventDto.setState(event.getState());
        }
        else if(event.getState() == 1){
            responseEventDto.setState(event.getState());
            responseEventDto.setInputImgPath(event.getInputImgPath());
            responseEventDto.setTargetImgPath(event.getTargetImgPath());
        }
        else if(event.getState() == 2){
            responseEventDto.setInputImgPath(event.getInputImgPath());
            responseEventDto.setTargetImgPath(event.getTargetImgPath());
            responseEventDto.setConfusionImgPath(event.getConfusionImgPath());
            responseEventDto.setState(event.getState());
        }

        return responseEventDto;
    }

    @Override
    public String getSavedImgFileEventOriginFile(int customerSeq, MultipartFile file) throws IOException {
        String uploadDir = "/chu/upload/images/customer/event/origin/";

        String fileName = file.getOriginalFilename();

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

        String fileName = file.getOriginalFilename();

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
    @Transactional
    public void updateImgNamesAndState(int customerSeq, String inputImgName, String targetImgName, int state) {

        try{
            Event event = eventRepository.findByCustomerSeq(customerSeq);
            event.setInputImgPath(inputImgName);
            event.setTargetImgPath(targetImgName);
            event.setState(1);
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
