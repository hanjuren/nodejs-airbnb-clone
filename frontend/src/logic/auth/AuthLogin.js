
export const AuthLogin = async (data) => {
  const login_info = fetch('http://localhost:8640/auth/login', {
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
  return login_info;
};