import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import ReduxPromise from 'redux-promise'
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import 'bootstrap/dist/css/bootstrap.css'
// import './index.css';

import reducers from './reducers';
import App from './App'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, thunkMiddleware)(createStore)

ReactDOM.render((
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
), document.getElementById('app'))
// registerServiceWorker(); *TODO* Need this?
