package com.chu.consulting.repository;

import com.chu.consulting.domain.ConsultingVirtualImg;
import com.chu.global.domain.ImageDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ConsultingVirtualImgRepository extends JpaRepository<ConsultingVirtualImg, Integer> {


    @Query(value = "SELECT cv.seq, cv.imagePath.savedImgName" +
            " FROM ConsultingVirtualImg cv" +
            " WHERE cv.seq = :consultingSeq")
    List<ImageDto> getVirtualImagesInfoBySeq(int consultingSeq);

}
