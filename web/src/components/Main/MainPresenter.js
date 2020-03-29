import React, { Component } from 'react';
import LoginForm from '../LoginForm';
import TodoList from '../TodoLists';
import cookie from 'react-cookies';

class MainPresenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cookie: cookie.load('login-cookie')
        };
    }
    componentDidMount() {
        console.log(this.state.cookie);
    }
    render() {
        if (this.props.value.valid === false) {
            return <LoginForm />;
        } else {
            return <TodoList />;
        }
    }
}

export default MainPresenter;
