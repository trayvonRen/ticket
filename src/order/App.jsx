import React, { useCallback, useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './App.css';

function App(props) {
    return <div className="app"></div>;
}

export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }
)(App);
