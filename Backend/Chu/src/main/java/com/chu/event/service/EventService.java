package com.chu.event.service;

import com.chu.event.domain.ResponseEventDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface EventService {

    ResponseEventDto checkCanMake(int customerSeq);

    String getSavedImgFileEventOriginFile(int customerSeq, MultipartFile file) throws IOException;

    String getSavedImgFileEventTargetFile(int customerSeq, MultipartFile file) throws IOException;

    void updateImgNamesAndState(int customerSeq, String inputImgName, String targetImgName, int state);

}
