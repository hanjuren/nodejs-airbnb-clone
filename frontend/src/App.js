import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/header/Header';
import MainPage from  './pages/MainPage';
import HostGrid from './pages/HostGrid';



function App() {
  return (
    <>
      <BrowserRouter>
      <Header />          
          <Switch>
            <Route exact path={"/"} component={MainPage} />
            <Route path='/hosts' component={HostGrid} />
          </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
