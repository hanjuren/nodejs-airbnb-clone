import React, { useState } from 'react';
import Modal from './Modal';
import "./modal.css";
import styled from "styled-components";

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
`;
const AuthInfoLink = styled.div`
  padding: 15px;
`;

const ModalType = (props) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [openState, setOpenState] = useState(props.open);
  const { close, header } = props;

  const authModal = () => {
    setOpenState(!openState);
    setAuthModalOpen(!authModalOpen);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(!authModalOpen);
  }
  
  return (
    <>
    { openState ? (
      <AuthInfo className={ openState ? 'openModal modal' : 'modal' }>
        <AuthInfoLink onClick={authModal}>로그인</AuthInfoLink>
        <AuthInfoLink>회원가입</AuthInfoLink>
      </AuthInfo>
    ) : null }

    {authModalOpen &&  
      <Modal open={authModalOpen} close={closeAuthModal}></Modal>
    }
    </>
  );
};

export default ModalType;