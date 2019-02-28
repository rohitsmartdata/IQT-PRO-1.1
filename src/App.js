import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import RouterComponent from './Routes';
import thunkMiddleware from 'redux-thunk'

import combineReducer from './store'
global.isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
console.disableYellowBox = true;
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    configureStore(initialState) {
      const enhancer = compose(
          applyMiddleware(
              thunkMiddleware
          ),
      );
      return createStore(combineReducer, initialState, enhancer);
  }

    render() {
        const store= this.configureStore({});
        return (
            <Provider store={store}>
                <RouterComponent />
            </Provider>
        );
    }
}
