import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/homePage';
import UserPage from './pages/userPage';
import LoginPage from './pages/loginPage';
import ProveFavourPage from './pages/proveFavourPage';
import Navbar from './components/navbar';
import {GlobalStyled} from './components/resetCss';
import ProtectedRoute from './components/protected.route';



function App() {
  return (
      <Router>
          <GlobalStyled />
          <Navbar />
      <div>
          <Switch>
            <Route path='/' component={HomePage} exact/>
            <ProtectedRoute path='/users' component={UserPage}/>
            <Route path='/login' component={LoginPage}/>
            <Route path='/prove' component={ProveFavourPage}/>
          </Switch>
      </div>
      </Router>
  );
}
export default App;