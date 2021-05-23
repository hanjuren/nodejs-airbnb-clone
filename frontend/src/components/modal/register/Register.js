import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Button from '../../../common/button/Button';
import Input from '../../../common/input/Input';
import {SocialLogin} from '../login/Login';
import {AuthRegister} from '../../../logic/auth/Register';


const JoinForm = styled.form`
width: 100%;
height: 100%;
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

  const [registerState, setRegisterState] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
    phone: ""
  });
  const [inputValue, setInputValue] = useState('');
  const {email, password, name, nickname, phone} = registerState;

  useEffect(() => {
    if (registerState.phone.length === 11) {
      setRegisterState({
        ...registerState,
        phone: phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      });
    }
  }, [registerState]);

  const registerValue = (e) => {
    const {value, name} = e.target;
    setRegisterState({
      ...registerState,
      [name] : value
    });
  };

  const PhoneValue = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    
    if (regex.test(e.target.value)) {
      const {value, name} = e.target;
      setRegisterState({
        ...registerState,
        [name] : value
      });
    }
  };

  const register = async (e) => {
    e.preventDefault();
    AuthRegister(registerState);
  };

  return (
    <>
      <JoinForm>
        <h3>에어비앤비에 오신 것을 환영합니다.</h3>
        <JoinContainer>
            <Input type="text" name="email" placeholder="사용할 이메일을 입력해주세요" value={email} event={registerValue} />
            <Input type="password" name="password" placeholder="사용할 비밀번호를 입력해주세요" value={password} event={registerValue}/>
            <Input type="text" name="name" placeholder="이름을 입력해주세요" value={name} event={registerValue}/>
            <Input type="text" name="nickname" placeholder="닉네임을 입력해주세요" value={nickname} event={registerValue}/>

            
            <Input  type="text" name="phone" placeholder="전화번호를 적어주세요" value={phone} event={PhoneValue}/>
            
            
            <Button type="local" text="가입하기" event={register}/>
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