import React from 'react'
import { connect } from 'react-redux';
import './App.css'

import Header from "../common/Header.jsx";
import DepartDate from './DepartDate.jsx'
import HeightSpeed from './HeightSpeed.jsx'
import Journey from './Journey.jsx'
import Submit from './submit.jsx'

function App(props) {
    return(
        <div>
            <Header></Header>
            <Journey></Journey>
            <DepartDate></DepartDate>
            <HeightSpeed></HeightSpeed>
            <Submit></Submit>
        </div>
    )

}

export default connect(
    function mapStateToProps(state) {
        return {};
     },
    function mapDispatchToProps(dispatch) {
        return {};
     }
)(App);