import React, { Component } from 'react';
import LoginForm from '../LoginForm';
import TodoList from '../TodoLists';

class MainPresenter extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.value.email === '') {
            return <LoginForm />;
        } else {
            return <TodoList />;
        }
    }
}

export default MainPresenter;
