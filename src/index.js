import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers/index';
import Signin from './components/auth/signin';
import Home from './components/Home';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup'
import Featured from './components/Featured';
import RequireAuthHOC from './components/auth/RequireAuth_HOC';

import { AUTHUSER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(
    reduxThunk
)(createStore);

const store = createStoreWithMiddleware(reducers);

if(localStorage.getItem('token')){
    store.dispatch({
        type: AUTHUSER,
    })
}

ReactDOM.render(
  <Provider store={store}>
      <Router history={ browserHistory }>
          <Route path="/" component={App} >
              <IndexRoute component={Home} />
              <Route path="signin" component={Signin} />
              <Route path="signout" component={Signout} />
              <Route path="signup" component={Signup} />
              <Route path="featured" component={RequireAuthHOC(Featured)} />
          </Route>
      </Router>
  </Provider>
  , document.querySelector('.container'));
