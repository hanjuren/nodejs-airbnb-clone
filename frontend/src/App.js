import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';
import HostGrid from './components/hosts/HostGrid';


function App() {
  return (
    <>
      <BrowserRouter>
      <Header />          
          <Switch>
            <Route exact path={"/"} component={Main} />
            <Route path='/hosts' component={HostGrid} />
          </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
