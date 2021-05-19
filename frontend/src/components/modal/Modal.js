import React, { useEffect, useState } from 'react';
import Login from './login/Login';
import Register from './register/Register';
import "./modal.css";

const Modal = (props) => {

  const { open, close } = props;
  const [renderType, setRenderType] = useState(props.type);
  

  const pageChange = () => {
    setRenderType(renderType === "login" ? "register" : "login" );
  };
  
  return (
    <div className={ open ? 'openModal modal' : 'modal' }>
      { open ? ( 
        <section>
          <header>
            <p>로그인 또는 회원가입</p> 
            <button className="close" onClick={close}> &times; </button>
          </header>
          <main>
            {renderType === 'login' ?
               <Login type={renderType} change={pageChange}/> : 
               <Register type={renderType} change={pageChange}/>
            }
            
          </main>
        </section>
      ) : null }
    </div>
  );
};

export default Modal;