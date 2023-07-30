// 디자이너의 상담 예약 리스트 컴포넌트


import { styled } from "styled-components";
import { useState, useEffect } from "react";

function AllReserveList(){
    const [data, setdata] = useState({
        consultingList : [
            {
                "consultingSeq" : 1,
                "consultingDate" : "2023-07-19",
                "consultingMemo" : "상담 전달사항",
                "originImg" : "img1.png",
                "name" : "김싸피",
                "gender" : "남성",
                "faceLabel" : "계란형",
                "hairCondition" : [
                    "얇은 모발",
                    "반곱슬"
                ],
                "virtualImg" : [
                    "img1.png",
                    "img2.png",
                    "img3.png"
                ]
            },
            {
                "consultingSeq" : 2,
                "consultingDate" : "2023-07-20",
                "consultingMemo" : "상담 전달사항",
                "originImg" : "img2.png",
                "name" : "김싸피",
                "gender" : "여성",
                "faceLabel" : "계란형",
                "hairCondition" : [
                    "얇은 모발",
                    "반곱슬"
                ],
                "virtualImg" : [
                    "img1.png",
                    "img2.png",
                    "img3.png"
                ]
            },
        ] 
    })
    return(
        <div>
            여기는 상담 예약 리스트
        </div>
    )
}

export default AllReserveList;