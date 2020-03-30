import React, { Component } from 'react';
import cookie from 'react-cookies';
import RootPresenter from './RootPresenter';
import axios from 'axios';

import { connect } from 'react-redux';
import { login, logoff } from '../../store/modules/auth';

class RootContainer extends Component {
    constructor(props) {
        super(props);
        // 세션 쿠키 존재 여부 확인
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
        return <RootPresenter value={this.props.store} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
