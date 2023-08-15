// 여기는 주변 디자이너 찾기 지도 페이지

/*global kakao*/
// import { styled } from "styled-components";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { getDesignerInfo } from "../../apis/kakao";
import { useNavigate } from 'react-router-dom';
import { styled } from "styled-components";

const { kakao } = window;
// const Container = styled.div`

const BASE_URL = 'https://i9b111.q.ssafy.io/api';
// const BASE_URL = 'http://localhost:9090/api';
// `;

const Container = styled.div`
  margin-top: 45px;
`;
const Wrapper = styled.div`
  padding-top: -10px;
  width: 100vw;
  height: 100vh;
`;
const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 20px;
  margin-top: 10px;
`;
const Text = styled.span`
  
`;

function MapView() {
	const navigate = useNavigate();
	function handleMarkerClick(designerSeq) {
		navigate(`/designerdetail/${designerSeq}`);
	}
  // const designerInfo = async () => {
  //   try {
  //     const result = await getDesignerInfo()
  //     console.log(result, "위에서");
  //     return result
  //   } catch (error) {
  //     throw new Error("디자이너 정보 요청 실패")
  //   }
  // }

  useEffect(() => {
    const fetchDesigner = async () => {
      try {
        const infos = await getDesignerInfo()
        //console.log(infos);

        // 지도 담을 영역의 dom 레퍼런스
        const container = document.getElementById('map');

        const options = {
          center: new kakao.maps.LatLng(36.3472301, 127.2957758539), // 지도 중심좌표
          level: 3
        };

        // 지도 생성 및 객체 리턴
        const map = new kakao.maps.Map(container, options);

        // Marker
        infos.forEach((el) => {

          // 마커 생성
          const marker = new kakao.maps.Marker({
            // 마커 표시 될 지도
            map: map,
            // 마커 표시 위치
            position: new kakao.maps.LatLng(el.latitude, el.longitude),
            // 마커 hover
            title: el.name
          });

          let content =
          '<div class="overlayWrap" style="display: flex; flex-direction: column; background-color: white; position: relative; border: 1px solid black; border-radius: 10px; padding:10px;" id="overlayDiv">' +
          '    <div class="accommInfoWrap" style="display: flex; flex-direction: column;">' +
          `        <p class="accommName" style="font-size: 16px; font-weight: 500;">${el.name} 디자이너</p>` +
          `        <p class="accommName" style="font-size: 15px; font-weight: 500;">-------------------</p>` +
          `        <h1 class="accommName" style="font-size: 15px; font-weight: 500; padding-bottom:5px;">평점 : ${el.reviewScore.toFixed(1)}</h1>` +
          `        <p class="accommRegion" style="font-size: 15px; font-weight: 500;">추천 스타일 : ${el.hairStyleLabel[0]==null?"없음":el.hairStyleLabel[0]}</p>` +
          '    </div>' +
          '</div>';



          // // 마커에 표시할 인포윈도우 생성
          // var infowindow = new kakao.maps.InfoWindow({
          //   content: el.name,
          // });

          // 마커에 표시할 커스텀 오버레이 생성
          var overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: marker.getPosition(),
            xAnchor: 0.5,
            yAnchor: 1.45
          })

					let overlayVisible = false
          // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
          kakao.maps.event.addListener(marker, 'mouseover', function () {
            overlay.setMap(map);
          });

          kakao.maps.event.addListener(marker, 'mouseout', function () {
            setTimeout(function(){
              overlay.setMap();
            })
          });

					kakao.maps.event.addListener(marker, 'click', function () {
						handleMarkerClick(el.designerSeq);
					});

        }, [])
          // // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
          // function closeOverlay() {
          //   overlay.setMap(null);
          // }

          // 마커에 마우스오버 이벤트, 마우스아웃 이벤트 등록
          // 이벤트 리스너로는 closer 만들어 등록
          // closer 안만들면 마지막 마커에만 이벤트 등록
        //   kakao.maps.event.addListener(
        //     marker,
        //     "mouseover",
        //     makeOverListener(map, marker, infowindow)
        //   );

        //   kakao.maps.event.addListener(
        //     marker,
        //     "mouseout",
        //     makeOutListener(infowindow)
        //   );
        // });

        // // 인포윈도우 표시
        // function makeOverListener(map, marker, infowindow){
        //   return function(){
        //     infowindow.open(map, marker);
        //   };
        // }

        // // 인포윈도우 닫기
        // function makeOutListener(infowindow){
        //   return function(){
        //     infowindow.close();
        //   };
        // }


      } catch (error) {
        throw new Error("실패", error)
      }
    }
    //const infos = designerInfo();
    //console.log("infos:",  infos);
    //mapscript(infos);



    fetchDesigner()
  }, [])




  return (
    <Container>
      <Img 
      src="/icon/backBtn.png"
      onClick={() => navigate(-1)}
      /> <span>뒤로가기</span>
      <Wrapper id="map">
      </Wrapper>
    </Container>

  );
};

export default MapView;