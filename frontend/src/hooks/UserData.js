import axios from 'axios';

export const UserData = async (url) => {
  try {
    const userData =  await axios.get(url, {
      withCredentials: true,
    });
    console.log(userData.data);
    return userData.data;
  } catch(error) {
    return window.alert("Server Error");
  }
};