import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main';
import Register from '../RegisterForm';
class AppPresenter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/register" component={Register} />
            </Switch>
        );
    }
}

export default AppPresenter;
