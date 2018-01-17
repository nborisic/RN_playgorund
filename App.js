import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Scroll from './src/components/scroll';


const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Scroll />
      </Provider>
    );
  }
}
