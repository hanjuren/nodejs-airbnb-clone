import {useEffect, useState} from 'react';
import axios from 'axios';

const AuthLogin = async (email, password) => {
  //console.log(user);
  // const [success, setSuccess] = useState({});
  //const {email, password} = user;
  
  const response = await axios.post('http://localhost:8640/auth/login', {email, password});

  if (response.data.loginsuccess) {
    window.alert(response.data.message);
    const user = response.data.user;
    return user;
  } else {
    window.alert(response.data.message);
    return response.data.loginsuccess;
  }
  
};

export default AuthLogin;