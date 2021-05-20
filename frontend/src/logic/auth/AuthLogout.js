import axios from 'axios';

const Logout = async () => {
  const logout = await axios.get('http://localhost:8640/logout')

  if(logout.success) {
    return;
  } else {
    return new Error("서버 통신 에러");
  } 
}

export default Logout;