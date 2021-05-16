import React, { useState } from 'react';
import styled from 'styled-components';

const City = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100px;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
  }
  p {
    margin-left: 20px;
    font-weight: 700;
  }
`;

const Cityinfo = (props) => {
  const [cityName, setCityName] = useState(`${props.id}`);
  const [src, setSrc] = useState(`${props.img}`);
  const [info, setText] = useState(`${props.text}`);
  return (
    <>
    <City id={cityName}>
      <img src={src} />
      <p>{info}</p>
    </City>
    </>
  );
};

export default Cityinfo;