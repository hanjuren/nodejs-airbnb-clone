import React from 'react';
import axios from 'axios';
const UserInfo = () => {

  const userInfo = async () => {
    
    axios.get('http://localhost:8640/userinfo', { withCredentials: true })
      .then((response) => {
        console.log(response.data)  
      })
  }

  return (
    <div>
      <h1>사용자 정보 페이지 입니다.</h1>
      <button onClick={userInfo}>사용자 정보 가져오기</button>
    </div>
  );
};

export default UserInfo;