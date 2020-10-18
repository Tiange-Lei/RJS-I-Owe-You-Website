import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/homePage';
import UserPage from './pages/userPage';
import LoginPage from './pages/loginPage';
import ProveFavourPage from './pages/proveFavourPage';
import NewFavourPage from './pages/newFavourPage';
import NewAwardPage from './pages/newAwardPage';
import Navbar from './components/navbar';
import {GlobalStyled} from './components/resetCss';
import ProtectedRoute from './components/protected.route';
import {Button} from 'antd';

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
<<<<<<< HEAD
            <ProtectedRoute path='/prove' component={ProveFavourPage}/>
            <ProtectedRoute path='/newFavour' component={NewFavourPage}/>
            <ProtectedRoute path='/newAward' component={NewAwardPage} />
          </Switch>
=======
            <Route path='/prove' component={ProveFavourPage}/>
          </Switch>          
>>>>>>> 207346d14b419f4f3f02ddaab875c9127129d774
      </div>
      </Router>
  );
}
export default App;