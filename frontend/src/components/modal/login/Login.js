import React, { useState } from 'react';
import Button from '../button/Button';
import styled from 'styled-components';


const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  h3 {
    margin-bottom: 15px;
  }
`;
const Form = styled.form`
  width: 100%;
`;
const Loginform = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Input = styled.input`
  width: 90% !important;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid lightgray;
  outline: none;
  margin-bottom: 20px;
  font-size: 17px;
`;
const LoginButton = styled.button`
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  width: 70%;
  border: 1px solid lightgray;
  background-color: #ff7777;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  outline: none;
`;

const SocialLogin = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Login = (props) => {
  const [changePage, setChangePage] = useState(props.type)
  
  const { change } = props;

  return (
    <>
    <LoginContainer>
      <Form>
      <h3>에어비앤비에 오신 것을 환영합니다.</h3>
        <Loginform>
          <Input type="text" name="email" placeholder="이메일을 입력해주세요"/>
          <Input type="password" name="password" placeholder="비밀번호를 입력해주세요"/>
          <LoginButton>로그인하기</LoginButton>
        </Loginform>
      </Form>

    </LoginContainer>
    <SocialLogin>
      <Button type="kakao" />
      <Button type="facebook" />
      <Button type="naver" />
    </SocialLogin>
    
    
    <button onClick={change}>회원가입</button>
    

    </>
  );
};

export default Login;