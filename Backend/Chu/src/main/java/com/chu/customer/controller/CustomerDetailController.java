package com.chu.customer.controller;

import com.chu.customer.domain.RequestCustomerDetailChangeDto;
import com.chu.customer.domain.ResponseCustomerDetailInfoDto;
import com.chu.customer.domain.ResponseCustomerDetailDto;
import com.chu.customer.service.CustomerDetailService;
import com.chu.designer.service.DesignerDetailService;
import com.chu.global.domain.HttpResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
    private final DesignerDetailService designerDetailService;


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
//        if(responseCustomerDetailDto != null) {
//            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseCustomerDetailDto);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//        else{
//            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
//            return ResponseEntity.ok(httpResponseDto);
//        }
//    }

    // 고객 마이페이지 조회
    @GetMapping("/mypage/{customer_seq}")
    public ResponseEntity<HttpResponseDto> getCustomerDetail(@PathVariable("customer_seq") int customerSeq) {

        ResponseCustomerDetailDto responseCustomerDetailDto = null;

        try{
            responseCustomerDetailDto = customerDetailService.getCustomerDetail(customerSeq);
        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new HttpResponseDto(HttpStatus.NO_CONTENT.value(), null));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new HttpResponseDto(HttpStatus.OK.value(), responseCustomerDetailDto));
    }

    //@GetMapping("/mypage/{fileName}")


    @PostMapping("/img/{customer_seq}")
    public ResponseEntity<HttpResponseDto> patchImg(@PathVariable("customer_seq") int customerSeq, @RequestPart("img") MultipartFile file) throws IOException {

        // 여기서 디비에 실제 파일 이름를 가져오는거
        String uploadFileName = designerDetailService.getUploadImgFilePath(file);
        try{
            // 여기서 디비에 폴더경로 가져오기, 실제 파일 서버 저장 함수
            String filePath = customerDetailService.getSavedImgFilePath(customerSeq, file);
            customerDetailService.patchImage(customerSeq, uploadFileName);
        } catch (Exception e){
            e.printStackTrace();
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
        HttpResponseDto httpResponseDto = new HttpResponseDto(200, uploadFileName);
        return ResponseEntity.ok(httpResponseDto);
    }

}
