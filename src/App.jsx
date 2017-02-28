import React from 'react';
import * as Dom from 'react-dom';

import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

import Main from "./containers/Main";
import Single from "components/Single/Single";
import PhotoGrid from "components/PhotoGrid/PhotoGrid";

//for debug
typeof window !== "undefined" && (window.React = React);

Dom.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/admin/" component={ Main }>
                <IndexRoute component={ PhotoGrid } />
                <Route path="/admin/dashbord" component={PhotoGrid} />
                <Route path="/view/:postId" component={Single} />
            </Route>
        </Router>
    </Provider>
    ,document.getElementById('app')
);