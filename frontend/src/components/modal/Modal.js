import React, { useEffect, useState } from 'react';
import Login from './login/Login';
import Register from './register/Register';
import "./modal.css";

const Modal = (props) => {

  const [openState, setOpenState] = useState(props.open);
  const { close } = props;
  const [renderType, setRenderType] = useState(props.type);
  
  const modalClose = () => {
    setOpenState(!openState);
    close();
  }

  const pageChange = () => {
    setRenderType(renderType === "login" ? "register" : "login" );
  };
  
  return (
    <div className={ openState ? 'openModal modal' : 'modal' }>
      { openState ? ( 
        <section>
          <header>
            <p>로그인 또는 회원가입</p> 
            <button className="close" onClick={close}> &times; </button>
          </header>
          <main>
            {renderType === 'login' ?
               <Login type={renderType} change={pageChange} close={modalClose}/> : 
               <Register type={renderType} change={pageChange}/>
            }
            
          </main>
        </section>
      ) : null }
    </div>
  );
};

export default Modal;