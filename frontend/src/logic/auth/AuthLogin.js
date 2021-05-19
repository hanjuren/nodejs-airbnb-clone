import {useEffect, useState} from 'react';

const AuthLogin = (user) => {
  console.log(user);
  // const [success, setSuccess] = useState({});
  const {email, password} = user;
  
    fetch('http://localhost:8640/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email': email,
      'password': password 
    })
  })
    .then(response => response.json())
    .then((response) => {
      const data = response.loginsuccess;
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
  
  
};

export default AuthLogin;