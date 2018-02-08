import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Navigator from './Navigator.js';
import SplashScreen from './src/components/SplashScreen';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
    };

    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 3000);
  }
  render() {
    const { isLoading } = this.state;
    return (
      <Provider store={ store }>
        { isLoading ? <SplashScreen /> : <Navigator /> }
      </Provider>
    );
  }
}
