import React from 'react'
import { connect } from 'react-redux';
import Candidate from './Candidate'
import Detail from './Detail'
import Schedule from './Schedule'

import './App.css'


function App(props) {
    const {
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        departStation,
        arriveStation,
        trainNumber,
        durationStr,
        tickets,
        isScheduleVisible,
        searchParsed,
        dispatch
    } = props;

    return (
        <div className="app">
            
        </div>
    )
}

export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch }
    }
)(App);