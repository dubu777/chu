package com.chu.event.service;

import com.chu.event.domain.ResponseEventDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface EventService {

    ResponseEventDto checkCanMake(int customerSeq);

    String getSavedImgFileEventOriginFile(int customerSeq, MultipartFile file) throws IOException;

    String getSavedImgFileEventTargetFile(int customerSeq, MultipartFile file) throws IOException;

    String getSavedImgFileEventConfusionFile(int customerSeq, MultipartFile file) throws IOException;

    void updateState(int customerSeq, int state);

    void updateInputImageNameAndState(int customerSeq, String inputImgName, int state);

    void updateTargetImageNameAndState(int customerSeq, String targetImgName, int state);

    void updateConfusionImageNameAndState(int customerSeq, String confusionImgName, int state);

}
