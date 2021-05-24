import {URL} from '../../Config';
export const AuthRegister = async (data) => {
  const register_info = fetch(`${URL}auth/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then((data) => {
    return data;
  })
  .catch((error) => {
    return window.alert(error);
  });
  return register_info;
};

export const emailCheck = (email) => {
  const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/; 
  const check = reg_email.test(email);
  return check;
};