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
    showCitySelector,
    hideCitySelector,
    fetchCityData
} from './actions'

function App(props) {
    const {
        from,
        to,
        isCitySelectorVisible,
        cityData,
        isLoadingCityData,
        dispatch,
    } = props

    const onBack = useCallback(() => {
        window.history.back();
    }, [])

    const citySelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchCityData
        }, dispatch)
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
            <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...citySelectorCbs}
            >
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