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
  font-weight: 800;
  color: black;
  cursor: pointer;
  outline: none;
  p {
    margin-left: 10px
  }
  :hover {
    background-color: #FF1493;
    transition: background-color 1000ms linear;
  }
`;

const ExButton = styled.button`
  background-color: #ff7777;
  ${Buttoncss};
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

const Change = styled.button`
background-color: white;
border: 1px solid black;
outline: none;
padding: 5px;
font-weight: 800;
:hover {
  border-bottom: 1px solid #FF1493;
  transition: border-bottom 1000ms linear;
}
`;

const style = { color: "white", fontSize: "1.4em" };

const Button = ({type, text, click, event}) => {
  
  if (type === 'kakao') {
    return (
      <>
        <Kakao>
          <RiKakaoTalkFill className="IconButton" style={style}/>
          <p>{text}</p>
        </Kakao>
      </>
    );
  } else if (type === "facebook") {
    return (
      <>
        <Facebook>
          <RiFacebookCircleFill className="IconButton" style={style}/>
          <p>{text}</p>
        </Facebook>
      </>
    );
  } else if (type === "naver") {
    return (
      <>
        <Naver>
          <img src="./naver-icon-style.png" className="IconButton"/>
          <p>{text}</p>
        </Naver>
      </>
    );
  } else if (type === "local") {
    return (
      <>
      <ExButton onClick={event}>
        <p>{text}</p>
      </ExButton>
      </>
    );
  } else {
    return (
      <>
        <Change onClick={click}>
          <p>{text}</p>
        </Change>
      </>
    );
  }
};

export default Button;