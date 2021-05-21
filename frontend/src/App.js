import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {URL} from './Config';
import Header from './components/header/Header';
import MainPage from  './pages/MainPage';
import HostGrid from './pages/HostGrid';
import UserInfo from './pages/UserInfo';
import {UserData} from './hooks/UserData';

export const userContext = React.createContext();

function App() {
  const [login, setLogin] =  useState();
  
  useEffect(() => {
    // 유저정보 가져오기 세션이 있으면 true 없으면 false
    const user = async ()  => {
      const data = await UserData(`${URL}user`);
      if(data.length !== 0) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    }
    user();
  }, [login]);

  const store = {
    login, setLogin
  };
  
  return (
    <>
      <userContext.Provider value={store}>
        <BrowserRouter>
          <Header />          
            <Switch>
              <Route exact path={"/"} component={MainPage} />
              <Route path='/hosts' component={HostGrid} />
              <Route path='/userinfo' component={UserInfo} />
            </Switch>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
