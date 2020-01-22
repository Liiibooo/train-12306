import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux';
import './App.css'
import { bindActionCreators } from 'redux'

import Header from "../common/Header.jsx";
import DepartDate from './DepartDate.jsx'
import HeightSpeed from './HeightSpeed.jsx'
import Journey from './Journey.jsx'
import Submit from './submit.jsx'

import CitySelector from '../common/CitySelector'

import {
    exchangeFromTo,
    showCitySelector
} from './actions'

function App(props) {
    const {
        from,
        to,
        dispatch
    } = props

    const onBack = useCallback(() => {
        window.history.back();
    }, [])

    // const doExchangeFromTo = useCallback(() => {
    //     dispatch(exchangeFromTo())
    // }, [])

    // const doShowCitySelector = useCallback((m) => {
    //     dispatch(showCitySelector(m))
    // }, [])

    const cbs = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector
        }, dispatch)
    }, [])
    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack}></Header>
            </div>
            <form className="form">
                <Journey
                    from={from}
                    to={to}
                    {...cbs}
                ></Journey>
                <DepartDate></DepartDate>
                <HeightSpeed></HeightSpeed>
                <Submit></Submit>
            </form>
            <CitySelector>
                
            </CitySelector>
        </div>
    )

}

export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }
)(App);