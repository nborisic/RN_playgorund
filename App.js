import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Times } from './resources';
import reducers from './reducers';
import Navigator from './Navigator.js';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

StatusBar.setBarStyle('light-content');

export default class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, Times.splashScreenHide);
  }

  render() {
    return (
      <Provider store={ store }>
        <Navigator />
      </Provider>
    );
  }
}
