import React, { Component } from 'react';
import MainPresenter from './MainPresenter';
import cookie from 'react-cookies';
import axios from 'axios';
import { connect } from 'react-redux';
import { login, logoff } from '../../store/modules/auth';

class MainContainer extends Component {
    constructor(props) {
        super(props);
        let sessionCookie = cookie.load('session');
        if (sessionCookie !== undefined) {
            axios.get('/api/auth').then(res => {
                if (res.status === 204) {
                    this.props.logoff();
                } else {
                    this.props.login(res.data.email);
                }
            });
        }
    }
    render() {
        return (
            <MainPresenter
                value={this.props.store}
                login={this.props.login}
                logoff={this.props.logoff}
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
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
