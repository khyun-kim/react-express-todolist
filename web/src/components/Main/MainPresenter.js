import React, { Component } from 'react';
import LoginForm from '../LoginForm';
import TodoList from '../TodoLists';

class MainPresenter extends Component {
    render() {
        if (this.props.value.email === '') {
            return <LoginForm login={this.props.login} />;
        } else {
            return <TodoList />;
        }
    }
}

export default MainPresenter;
