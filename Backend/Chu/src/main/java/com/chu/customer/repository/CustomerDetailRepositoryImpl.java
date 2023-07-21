package com.chu.customer.repository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
public class CustomerDetailRepositoryImpl implements CustomerDetailRepository {
    // DBCONN

    @Override
    public boolean patchImage(String imgName) {
        boolean isSuccess = true;
        // 회원 이미지 정보 수정


        return isSuccess;
    }
}
