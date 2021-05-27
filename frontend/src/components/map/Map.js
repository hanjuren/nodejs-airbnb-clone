import React, { useEffect } from 'react';
import styled from 'styled-components';

const {kakao} = window;

const MapDiv = styled.div`
  width: 100%;
  height: 100vh;
`;
const Map = (props) => {
  const address = props.addr;
  const city = props.city;
  
  useEffect(() => {

    const container = document.getElementById('map');
		const options = {
			center: new kakao.maps.LatLng(126.977829174031,37.5663174209601),
			level: 8
		};

    let map = new kakao.maps.Map(container, options);
    const geocoder = new kakao.maps.services.Geocoder();
    
    // 주소로 좌표를 검색합니다
    const addressSearch = function(result, status) {
      
    // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 결과값으로 받은 위치를 마커로 표시합니다
        new kakao.maps.Marker({
          map: map,
          position: coords
        });
        
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      } 
    };
    if(address.length !== 0) {
      for(let i=0; i<address.length; i++) {
        geocoder.addressSearch(address[i], addressSearch);
      }
    } 
    else {
      geocoder.addressSearch('포일세거리로23', addressSearch);
    }
});
  return (
    <>
      <MapDiv id="map"></MapDiv>
    </>
  );
};

export default Map;