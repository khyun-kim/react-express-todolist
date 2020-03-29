import React, { Component } from 'react';
import MainPresenter from './MainPresenter';

import { connect } from 'react-redux';
import { login, logoff, invalid } from '../../store/modules/auth';
import cookie from 'react-cookies';

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <MainPresenter value={this.props.store} />;
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
