import React, { useState } from 'react';
import {userContext} from '../../App';
import Modal from './Modal';
import "./modal.css";
import styled from "styled-components";
import Logout from '../../logic/auth/AuthLogout';
import { Link } from 'react-router-dom';

const AuthInfo = styled.div`
  position: fixed;
  z-index: 101;
  top: 73px;
  bottom: 0;
  left: 50%;
  transform: translateX( 262% );
  width: 250px;
  height 100px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: none;
  a {
    outline: none;
    text-decoration: none;
    color: black;
  }
`;
const AuthInfoLink = styled.div`
  padding: 15px;
  cursor: pointer;
`;

const ModalType = (props) => {
  const store = React.useContext(userContext);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const [openState, setOpenState] = useState(props.open);
  const [checkType, setCheckType] = useState('');
  const { open, close } = props;

  const authModal = (checkType) => {
    setCheckType(checkType);
    setOpenState(!openState);
    setAuthModalOpen(!authModalOpen);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(!authModalOpen);
    close();
  }
  const logout = async () => {
    await Logout();
    store.setLogin(false);
    close();
  }
  
if(!store.login) {
  return (
    <>
    { openState ? (
      <AuthInfo className={ openState ? 'openModal modal' : 'modal' }>
        <AuthInfoLink onClick={authModal.bind(this, 'login')}>로그인</AuthInfoLink>
        <AuthInfoLink onClick={authModal.bind(this, 'register')}>회원가입</AuthInfoLink>
      </AuthInfo>
    ) : null }

    {authModalOpen &&  
      <Modal open={authModalOpen} close={closeAuthModal} type={checkType}></Modal>
    }
    </>
  );
} else {
  return (
    <>
    { openState ? (
      <AuthInfo className={ openState ? 'openModal modal' : 'modal' }>
        <Link onClick={logout} to={"/"}>
          <AuthInfoLink>로그아웃</AuthInfoLink>
        </Link>
        <Link onClick={close} to={"/userinfo"}>
          <AuthInfoLink>내정보</AuthInfoLink>
        </Link>
      </AuthInfo>
    ) : null }

    {authModalOpen &&  
      <Modal open={authModalOpen} close={closeAuthModal} type={checkType}></Modal>
    }
    </>
  );
}
    
  
};

export default ModalType;