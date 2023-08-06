package com.chu.consulting.domain;

import com.chu.customer.domain.Customer;
import com.chu.designer.domain.Designer;
import com.chu.global.domain.ImagePath;
import lombok.Data;

@Data
public class RequestConsultingDto {
    int customerSeq;
    int designerSeq;
    String date;
    String time;
    String consultingMemo;
    String img;
//        "customerSeq" : 1,
//                "designerSeq" : 4,
//                "date" : "2023-07-20",
//                "time" : "12:00",
//                "consultingMemo" : "전달사항 ~",
//                "img" : "img1.png"

    public Consulting toConsultingEntity(){
        Consulting consulting = new Consulting();

        Customer customer = new Customer();
        customer.setSeq(this.getCustomerSeq());
        consulting.setCustomer(customer);

        Designer designer = new Designer();
        designer.setSeq(this.getDesignerSeq());
        consulting.setDesigner(designer);

        consulting.setConsultingDate(new ConsultingDate(this.date, this.time));

        consulting.setMemo(this.getConsultingMemo());

        ImagePath imagePath = new ImagePath();
        imagePath.setSavedImgName(this.getImg());
        consulting.setImagePath(imagePath);


        return consulting;
    }
}
