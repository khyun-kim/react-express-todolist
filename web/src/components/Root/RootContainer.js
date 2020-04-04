import React, { Component } from 'react';
import RootPresenter from './RootPresenter';

import { connect } from 'react-redux';
import { login, logoff } from '../../store/modules/auth';

class RootContainer extends Component {
    constructor(props) {
        super(props);
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
