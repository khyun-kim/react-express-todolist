import React, { Component } from 'react';
import RegisterFormPresenter from './RegisterFormPresenter';

import { connect } from 'react-redux';
import { login, logoff } from '../../store/modules/auth';

class RegisterFormContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <RegisterFormPresenter
                history={this.props.history}
                login={this.props.login}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        store: state.auth
    };
};
const mapDispatchToProps = dispatch => ({
    login: (sid, username) => dispatch(login(sid, username)),
    logoff: () => dispatch(logoff())
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterFormContainer);
