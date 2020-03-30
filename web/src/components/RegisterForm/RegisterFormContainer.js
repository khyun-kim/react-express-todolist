import React, { Component } from 'react';
import RegisterFormPresenter from './RegisterFormPresenter';
import cookie from 'react-cookies';
import axios from 'axios';
import { connect } from 'react-redux';
import { login, logoff } from '../../store/modules/auth';

class RegisterFormContainer extends Component {
    constructor(props) {
        super(props);
        let sessionCookie = cookie.load('session');
        if (sessionCookie !== undefined) {
            axios.get('/api/auth').then(res => {
                if (res.status === 204) {
                    this.props.logoff();
                } else {
                    this.props.login(res.data.email);
                    this.props.history.push('/');
                }
            });
        }
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
