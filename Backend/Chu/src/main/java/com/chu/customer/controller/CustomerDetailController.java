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

@Slf4j
@RequestMapping("/customer/detail")
@RestController
@RequiredArgsConstructor
public class CustomerDetailController {

    private final CustomerDetailService customerDetailService;

    @GetMapping("/")
    public ResponseEntity<HttpResponseDto> getCustomerDetailInfo(@PathVariable("customer_seq") int customerSeq){
        ResponseCustomerDetailInfoDto responseCustomerDetailInfoDto = customerDetailService.getCustomerUpdateDetailInfo(customerSeq);

        if (responseCustomerDetailInfoDto != null) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseCustomerDetailInfoDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @PutMapping("/")
    public ResponseEntity<HttpResponseDto> putCustomerDetailInfo(@PathVariable("customer_seq") int customerSeq, @RequestBody RequestCustomerDetailChangeDto requestCustomerDetailChangeDto) {
        boolean isSuccess = customerDetailService.putCustomerDetailInfo(customerSeq, requestCustomerDetailChangeDto);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, null);
            return ResponseEntity.ok(httpResponseDto);
        } else {
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @GetMapping("/mypage")
    public ResponseEntity<HttpResponseDto> getCustomerDetail(@PathVariable("customer_seq") int customerSeq) {

        ResponseCustomerDetailDto responseCustomerDetailDto = customerDetailService.getCustomerDetail(customerSeq);

        if(responseCustomerDetailDto != null){
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, responseCustomerDetailDto);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

    @PatchMapping("/img")
    public ResponseEntity<HttpResponseDto> patchImg(@RequestParam("img") String imgName){

        boolean isSuccess = customerDetailService.patchImage(imgName);

        if (isSuccess) {
            HttpResponseDto httpResponseDto = new HttpResponseDto(200, imgName);
            return ResponseEntity.ok(httpResponseDto);
        }
        else{
            HttpResponseDto httpResponseDto = new HttpResponseDto(204, null);
            return ResponseEntity.ok(httpResponseDto);
        }
    }

}
