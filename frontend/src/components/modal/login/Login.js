import React, { useState } from 'react';
import AuthLogin from '../../../logic/auth/AuthLogin';
import Button from '../../../common/button/Button';
import Input from '../../../common/input/Input';
import styled from 'styled-components';
import {Link, Redirect} from 'react-router-dom';


const LoginContainer = styled.div`
  width: 100%;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  
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

export const SocialLogin = styled.div`
  width: 100%;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Login = (props) => {
  const { change, close } = props;
  const [success, setSuccess] = useState('');

  const [userState, setUserState] = useState({
    email: "",
    password: "",
  });

  const email = (e) => {
    setUserState({
      ...userState,
      email: e.target.value
    });
  };
  const password = (e) => {
    setUserState({
      ...userState,
      password: e.target.value
    });
  };
 
  const resetValue = (e) => {
    e.preventDefault();
    const data = AuthLogin(userState);
    console.log(data);
    const {email, password} = userState;

    // fetch('http://localhost:8640/auth/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     'email': email,
    //     'password': password 
    //   })
    // })
    //   .then(response => response.json())
    //   .then((response) => {
    //     setSuccess(response.loginsuccess);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // return console.log(success);
  };
  

  return (
    <>
    <LoginContainer>
       
      <h3>에어비앤비에 오신 것을 환영합니다.</h3>
      <Form>
      <Loginform>
        <Input type="text" name="email" placeholder="이메일 입력해주세요" value={userState.email} event={email}/>
        <Input type="password" name="password" placeholder="비밀번호를 입력해주세요" value={userState.password} event={password}/>
      <Button type="local" text="로그인하기" event={resetValue}/>
      </Loginform>

      </Form>

      <SocialLogin>
        <Button type="kakao" text="카카오 로그인"/>
        <Button type="facebook" text="페이스북 로그인"/>
        <Button type="naver" text="네이버 로그인"/>
      </SocialLogin>

    </LoginContainer>
    
    <Button type="page" text="회원가입" click={change}/>
    </>
  );
};

export default Login;