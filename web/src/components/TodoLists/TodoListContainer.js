import React, { Component } from 'react';
import TodoListsPresenter from './TodoListsPresenter';

import { connect } from 'react-redux';
import { login, logoff } from '../../store/modules/auth';

class TodoListContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <TodoListsPresenter value="test" logoff={this.props.logoff} />;
    }
}

const mapStateToProps = (state) => {
    return {
        store: state.auth,
    };
};
const mapDispatchToProps = (dispatch) => ({
    login: (username) => dispatch(login(username)),
    logoff: () => dispatch(logoff()),
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);
