import React from 'react'
import { connect } from 'react-redux';
import './App.css'

import Nav from '../common/Nav'
import List from './List'
import Bottom from './Bottom'

function App(props) {

    return (
        <div>
            <Nav></Nav>
            <List></List>
            <Bottom></Bottom>
        </div>
    )


}

export default connect(
    function mapStateToProps(state) { },
    function mapDispatchToProps(dispatch) { }
)(App);