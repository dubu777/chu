// 여기는 주변 디자이너 찾기 지도 페이지

/*global kakao*/
// import { styled } from "styled-components";
import { useState, useEffect, useRef } from "react";

const { kakao } = window;
// const Container = styled.div`
    
// `;

function MapView () {

    useEffect(() => {
        // console.log("mapview");
        const container = document.getElementById('map'); // 지도 담을 영역의 dom 레퍼런스
        const options = {
            center : new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3
        };
        const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

    }, [])


    return(
        <div>
            <p>여기는 주변 디자이너 찾기 지도 페이지</p>
            <div id="map" style={{
                width: "1400px",
                height: "650px"
            }}>
            </div>
        </div>
        
    );
};

export default MapView;