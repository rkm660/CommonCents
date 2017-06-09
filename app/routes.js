import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Page from './components/Page';
import Profile from './components/Profile';


export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/page' component={Page}/>
    <Route path='/profile' component={Profile}/>
  </Route>
);