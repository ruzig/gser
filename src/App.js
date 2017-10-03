import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/createStore';
import './App.css';
import Home from './Home';

const App = props => (
  <Provider store={store}>
    <div style={{padding: "50px"}}>
      <Home />
    </div>
  </Provider>
);

export default App;
