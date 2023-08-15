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
  width: 100vw;
  height: 100vh;
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
        '<div class="overlayWrap" style="display: flex; flex-direction: column; background-color: white; position: relative; top: -80px;" id="overlayDiv">' +
        '    <div class="accommInfoWrap" style="display: flex; flex-direction: column; background-color: white;">' +
        `        <h1 class="accommName" style="font-size: 15px; font-weight: 500;">디자이너: ${el.name}</h1>` +
        `        <h1 class="accommName" style="font-size: 15px; font-weight: 500;">평점: ${el.reviewScore}점</h1>` +
        `        <p class="accommRegion" style="font-size: 15px; font-weight: 500;">추천 스타일: ${el.hairStyleLabel[0]}</p>` +
        '    </div>' +
        '</div>';

				
          // var content = '<div class="wrap">' +
          //   '    <div class="info">' +
          //   '        <div class="title">' +
          //   '            카카오 스페이스닷원' +
          //   '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
          //   '        </div>' +
          //   '        <div class="body">' +
          //   '            <div class="img">' +
          //   '                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">' +
          //   '           </div>' +
          //   '            <div class="desc">' +
          //   '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
          //   '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
          //   '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
          //   '            </div>' +
          //   '        </div>' +
          //   '    </div>' +
          //   '</div>';

          // // 마커에 표시할 인포윈도우 생성
          // var infowindow = new kakao.maps.InfoWindow({
          //   content: el.name,
          // });

          // 마커에 표시할 커스텀 오버레이 생성
          var overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: marker.getPosition()
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
      <Wrapper id="map">

      </Wrapper>
    </Container>

  );
};

export default MapView;