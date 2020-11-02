import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './Redux/store';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
// ----------------------------------------------------------------------------------------------------------------------

ReactDOM.render(
  <Router>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </Router>
  ,
  document.getElementById('root')
);
