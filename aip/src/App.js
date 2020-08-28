import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/homePage';
import UserPage from './pages/userPage';
import Navbar from './components/navbar';
import {GlobalStyled} from './components/resetCss';


function App() {
  return (
      <Router>
          <GlobalStyled />
          <Navbar />
      <div>
          <Switch>
            <Route path='/favours' component={HomePage} exact/>
            <Route path='/users' component={UserPage} exact/>
          </Switch>
      </div>
      </Router>
  );
}

export default App;
