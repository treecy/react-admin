import React from 'react';
import * as Dom from 'react-dom';

import {Route, Router, IndexRoute, IndexRedirect, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import store, {history} from './store';

import Main from "./containers/admin/Main";
import Ltv from './containers/admin/Ltv';
import Promotion  from './containers/admin/Promotion';
import PhotoGrid from "components/PhotoGrid/PhotoGrid";

//for debug
typeof window !== "undefined" && (window.React = React);

Dom.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Main}>
          <IndexRedirect to="/admin" />
          <Route path="/admin" component={PhotoGrid}/>
          <Route path="/admin/ltv" component={Ltv}/>
          <Route path="/admin/promotion" component={Promotion}/>
        </Route>
      </Router>
    </Provider>
    , document.getElementById('app')
);