package com.chu.customer.controller;

import com.chu.customer.domain.RequestCustomerDetailChangeDto;
import com.chu.customer.domain.ResponseCustomerDetailInfoDto;
import com.chu.customer.domain.ResponseCustomerDetailDto;
import com.chu.customer.service.CustomerDetailService;
import com.chu.global.domain.HttpResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RequestMapping("/customer/detail")
@RestController
@RequiredArgsConstructor
public class CustomerDetailController {

    private final CustomerDetailService customerDetailService;

//    @GetMapping("/{customer_seq}")
//    public ResponseEntity<HttpResponseDto> getCustomerDetailInfo(@PathVariable("customer_seq") int customerSeq){
//        ResponseCustomerDetailInfoDto responseCustomerDetailInfoDto = customerDetailService.getCustomerUpdateDetailInfo(customerSeq);
//
//        if (responseCustomerDetailInfoDto != null) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseCustomerDetailInfoDto);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//        else{
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
//
//    @PutMapping("/{customer_seq}")
//    public ResponseEntity<HttpResponseDto> putCustomerDetailInfo(@PathVariable("customer_seq") int customerSeq, @RequestBody RequestCustomerDetailChangeDto requestCustomerDetailChangeDto) {
//        boolean isSuccess = customerDetailService.putCustomerDetailInfo(customerSeq, requestCustomerDetailChangeDto);
//
//        if (isSuccess) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
//            return ResponseEntity.ok(httpResponseDto);
//        } else {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }
//
//    @GetMapping("/mypage/{customer_seq}")
//    public ResponseEntity<HttpResponseDto> getCustomerDetail(@PathVariable("customer_seq") int customerSeq) {
//
//        ResponseCustomerDetailDto responseCustomerDetailDto = customerDetailService.getCustomerDetail(customerSeq);
//
//        if(responseCustomerDetailDto != null){
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseCustomerDetailDto);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//        else{
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }

    @PatchMapping("/img/{customer_seq}")
    public ResponseEntity<HttpResponseDto> patchImg(@PathVariable("customer_seq") int customerSeq, @RequestPart("img") MultipartFile file) throws IOException {

        String filePath = customerDetailService.getSavedImgFilePath(file);
        log.info("이미지 로컬서버에 저장 완료");
        log.info("컨트롤러>>> filePath: "+ filePath);

        // 내 아이디를 가지고 가서 변경 감지 -> imgPath를 저장파일명에 업데이트한다
        boolean isSuccess = customerDetailService.patchImage(customerSeq, filePath);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, filePath);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

}
