import React from 'react';
import styled, {css} from 'styled-components';
import { RiKakaoTalkFill, RiFacebookCircleFill } from 'react-icons/ri';

const Buttoncss = css`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  width: 70%;
  border: 1px solid lightgray;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  outline: none;
  p {
    margin-left: 10px
  }
`;

const Kakao = styled.button`
  background-color: #F7E600;
  ${Buttoncss};
`;
const Facebook = styled.button`
  background-color: #3b5998;
  ${Buttoncss};
`;
const Naver = styled.button`
  background-color: #2DB400;
  ${Buttoncss};
  img {
    width: 20px;
    height: 20px;
  }
`;

const style = { color: "white", fontSize: "1.4em" };

const Button = ({type}) => {
  if (type === 'kakao') {
    return (
      <>
        <Kakao>
          <RiKakaoTalkFill className="IconButton" style={style}/>
          <p>카카오 로그인</p>
        </Kakao>
      </>
    );
  } else if (type === "facebook") {
    return (
      <>
        <Facebook>
          <RiFacebookCircleFill className="IconButton" style={style}/>
          <p>페이스북 로그인</p>
        </Facebook>
      </>
    );
  } else if (type === "naver") {
    return (
      <>
        <Naver>
          <img src="./naver-icon-style.png" className="IconButton"/>
          <p>네이버 로그인</p>
        </Naver>
      </>
    );
  } else {
    return null;
  }
};

export default Button;