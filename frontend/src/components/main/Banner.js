import React from 'react';
import styled from 'styled-components';

const BannerDiv = styled.div`
  background-image: url("https://a0.muscache.com/im/pictures/166791ff-bc82-4b88-ba3d-49be1d462dce.jpg?im_w=2560");
  background-size: 95% 80%;
  background-repeat: no-repeat;
  background-position: center top;
  height: 70vh;
  position: relative;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const BannerInfo = styled.div`
  h3 {
    color: white;
    font-size: 30px;
    padding: 35px;
    font-weight: 300;
  }
`;


const Banner = () => {
  return (
    <>
      <BannerDiv>
        <BannerInfo>
          <h3>호스트 여러분이 있기에 가능합니다.</h3>
        </BannerInfo>
      </BannerDiv>
    </>
  );
};

export default Banner;