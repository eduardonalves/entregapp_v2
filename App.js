import React, { Component } from "react";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Routes from './src/routes'
import reducers from './src/reducers';

class App extends Component {

  componentWillMount() {
    
  }

  render() {
      return (
          <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))} >
              <Routes />
          </Provider>
      );
  }     
}

export default App;