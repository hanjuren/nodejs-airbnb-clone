import React from 'react';
import styled, {css} from 'styled-components';
import { RiKakaoTalkFill, RiFacebookCircleFill } from 'react-icons/ri';
import { URL } from '../../Config';

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

const Atag = css`
  a{
    display: flex;
    text-decoration: none;
    color: black;
    outline: none;
    border: none;
  }
`;

const ExButton = styled.button`
  background-color: #ff7777;
  ${Buttoncss};
`;

const Kakao = styled.button`
  background-color: #F7E600;
  ${Buttoncss};
  ${Atag};
`;
const Facebook = styled.button`
  background-color: #3b5998;
  ${Buttoncss};
  ${Atag};
`;
const Naver = styled.button`
  background-color: #2DB400;
  ${Buttoncss};
  img {
    width: 20px;
    height: 20px;
  }
  ${Atag};
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

const Button = ({type, text, event}) => {
  
  if (type === 'kakao') {
    return (
      <>
        <Kakao onClick={event}>
          <a href={`${URL}auth/kakao`}>
          <RiKakaoTalkFill className="IconButton" style={style}/>
          <p>{text}</p>
          </a>
        </Kakao>
      </>
    );
  } else if (type === "facebook") {
    return (
      <>
        <Facebook>
          <a href={`${URL}auth/facebook`}>
            <RiFacebookCircleFill className="IconButton" style={style}/>
            <p>{text}</p>
          </a>
        </Facebook>
      </>
    );
  } else if (type === "naver") {
    return (
      <>
        <Naver>
          <a href={`${URL}auth/naver`}>
            <img src="./naver-icon-style.png" className="IconButton"/>
            <p>{text}</p>
          </a>
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
        <Change onClick={event}>
          <p>{text}</p>
        </Change>
      </>
    );
  }
};

export default Button;