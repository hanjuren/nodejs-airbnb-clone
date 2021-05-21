import React from 'react';
import styled from 'styled-components';
import Button from '../../../common/button/Button';
import Input from '../../../common/input/Input';
import {SocialLogin} from '../login/Login';


const JoinForm = styled.form`
width: 100%;
height: 550px;
h3 {
  margin-bottom: 15px;
}
`;
const JoinContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

const PhoneDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;



const Register = (props) => {
  
  const { change } = props;
  
  return (
    <>
      <JoinForm>
        <h3>에어비앤비에 오신 것을 환영합니다.</h3>
        <JoinContainer>
            <Input type="text" name="email" placeholder="사용할 이메일을 입력해주세요"/>
            <Input type="password" name="password" placeholder="사용할 비밀번호를 입력해주세요"/>
            <Input type="text" name="name" placeholder="이름을 입력해주세요"/>

            <PhoneDiv>
              <Input  type="number" name="firstNum" />
              <Input  type="number" name="middleNum" />
              <Input  type="number" name="lastNum" />
            </PhoneDiv>
            
            <Button type="local" text="가입하기" />
        </JoinContainer>
        
        <SocialLogin>
          <Button type="kakao" text="카카오 가입"/>
          <Button type="facebook" text="페이스북 가입"/>
          <Button type="naver" text="네이버 가입"/>
        </SocialLogin>
      </JoinForm>

      <Button type="page" text="로그인" event={change}/>
    </>
  );
};

export default Register;