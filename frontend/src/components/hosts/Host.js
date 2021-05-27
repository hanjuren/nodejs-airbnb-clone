import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Hostdiv = styled.div`
width: 100%;
height: 250px;
display: flex;
padding: 10px 40px 10px 40px;
align-items: center;
`;

const SliderContainer = styled.div`
  width: 300px;
  height: 200px;
  overflow:hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit:cover;
    border-radius: 20px;
  }

  .prev_btn {
    position: absolute;
    cursor: pointer;
    margin-left: -290px;
    margin-top: 85px;
    border: none;
    background-color: white;
    font-size: 13px;
    border-radius: 50px;
    text-align: centr;
    padding: 5px;
  }

  .next_btn {
    position: absolute;
    cursor: pointer;
    margin-left: -40px;
    margin-top: 85px;
    border: none;
    background-color: white;
    font-size: 13px;
    border-radius: 50px;
    text-align: centr;
    padding: 5px;
  }
`;

const HostInfo = styled.div`
  width: 60%;
  height: 200px;
  padding: 20px;
`;

const Host = ({host, image, city}) => {
  const {title, address, hostinfo, hosttype, person, roominfo_cook, roominfo_room} = host;

  const [imageList, setImageList] = useState(image);
  const [scrollState, setScorllState] = useState(0);
  const TotalCount = imageList.length -1;

  const next = () => {
    if(scrollState >= TotalCount) {
      setScorllState(0);
    } else {
      setScorllState(scrollState + 1);
    }
  };

  const prev = () => {
    if(scrollState === 0) {
      setScorllState(TotalCount);
    } else {
      setScorllState(scrollState - 1);
    }
  };
  
  return (
    <>  
      
      {/* 숙소 컴포넌트 */}
        <Hostdiv>
          <SliderContainer  >
            <img src={imageList[scrollState].src} />
            <IoIosArrowBack onClick={prev} className="prev_btn"/>
            <IoIosArrowForward onClick={next} className="next_btn"/>
          </SliderContainer>

          <HostInfo>
            <h3>{hosttype}</h3>
            <h2>{title}</h2>

            <p>{hostinfo}</p>
            <p>{person}</p>
            <p>{roominfo_cook}</p>
            <p>{roominfo_room}</p>
          </HostInfo>
        </Hostdiv>
        

    </>
  );
};

export default Host;