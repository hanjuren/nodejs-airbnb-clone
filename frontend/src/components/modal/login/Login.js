import React, { useState } from 'react';
import {AuthLogin} from '../../../logic/auth/AuthLogin';
import Button from '../../../common/button/Button';
import Input from '../../../common/input/Input';
import styled from 'styled-components';
import { userContext } from '../../../App';


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
  const store = React.useContext(userContext);
  
  const { change, close } = props;

  const [emailState, setEmail] = useState('');
  const [passwordState, setPassword] = useState('');

  const email = (e) => {
    setEmail(e.target.value);
  };
  const password = (e) => {
    setPassword(e.target.value);
  };
 
  const login = async (e) => {
    try {
      e.preventDefault();
      const logindata = { email: emailState, password: passwordState};
      const data = await AuthLogin(logindata);
      if(data.loginsuccess) {
        store.setLogin(true);
        close();
      } else {
        window.alert(data.message);
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      window.alert(error);
    }
  };
  

  return (
    <>
    <LoginContainer>
       
      <h3>에어비앤비에 오신 것을 환영합니다.</h3>
      <Form>
      <Loginform>
        <Input type="text" name="email" placeholder="이메일 입력해주세요" value={emailState} event={email}/>
        <Input type="password" name="password" placeholder="비밀번호를 입력해주세요" value={passwordState} event={password}/>
        <Button type="local" text="로그인하기" event={login}/>
      </Loginform>

      </Form>

      <SocialLogin>
        <Button type="kakao" text="카카오 로그인"/>
        <Button type="facebook" text="페이스북 로그인"/>
        <Button type="naver" text="네이버 로그인"/>
      </SocialLogin>

    </LoginContainer>
    
    <Button type="page" text="회원가입" event={change}/>
    </>
  );
};

export default Login;