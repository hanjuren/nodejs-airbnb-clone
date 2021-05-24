import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Button from '../../../common/button/Button';
import Input from '../../../common/input/Input';
import {SocialLogin} from '../login/Login';
import {AuthRegister, emailCheck} from '../../../logic/auth/Register';
import { userContext } from '../../../App';


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
  const store = React.useContext(userContext);
  const emailInput = useRef(null);
  const { change } = props;
  // 회원가입 폼 데이터 상태
  const [registerState, setRegisterState] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
    phone: ""
  });

  const {email, password, name, nickname, phone} = registerState;
  // 전화번호 하이픈 추가하기
  useEffect(() => {
    if (registerState.phone.length === 11) {
      setRegisterState({
        ...registerState,
        phone: phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      });
    }
  }, [registerState]);
  // 인풋 데이터 상태에 추가
  const registerValue = (e) => {
    const {value, name} = e.target;
    setRegisterState({
      ...registerState,
      [name] : value
    });
  };
  //전화번호 상태 추가 및 형식 검사
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
  // 회원가입 이벤트
  const register = async (e) => {
    try{
      e.preventDefault();
      const checkData = await emailCheck(registerState.email);
      if(checkData)  {
        const register = await AuthRegister(registerState);
        if(register.joinsuccess) {
          window.alert(register.message);
          change();
        } else {
          window.alert(register.message);
          setRegisterState({
            email: "", password: "", name: "", nickname: "", phone: ""
          });
          emailInput.current.focus();
        }
      } else {
        window.alert("올바르지 않은 이메일 형식입니다.");
        setRegisterState({
          ...registerState,
          email: ""
        });
        emailInput.current.focus();
      }
    } catch(error) {
      window.alert(error);
    }
    
  };

  return (
    <>
      <JoinForm>
        <h3>에어비앤비에 오신 것을 환영합니다.</h3>
        <JoinContainer>
            <Input type="text" name="email" placeholder="사용할 이메일을 입력해주세요" value={email} event={registerValue} inputref={emailInput}/>
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