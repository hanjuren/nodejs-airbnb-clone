import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/header/Header';
import MainPage from  './pages/MainPage';
import HostGrid from './pages/HostGrid';
import UserIngo from './pages/UserInfo';

export const userContext = React.createContext();

function App() {
  const [login, setLogin] =  useState();
  
  useEffect(() => {
    const id = window.localStorage.getItem('id');
    if(id) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  })

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
              <Route path='/userinfo' component={UserIngo} />
            </Switch>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
