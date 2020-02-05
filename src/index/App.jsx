import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux';
import './App.css'
import { bindActionCreators } from 'redux'

import Header from "../common/Header.jsx";
import DepartDate from './DepartDate.jsx'
import HeightSpeed from './HeightSpeed.jsx'
import Journey from './Journey.jsx'
import Submit from './submit.jsx'

import CitySelector from '../common/CitySelector.jsx'
import DateSelector from '../common/DateSelector.jsx'

import {
    exchangeFromTo,
    showCitySelector,
    hideCitySelector,
    fetchCityData,
    setSelectedCity,
    showDateSelector,
    hideDateSelector
} from './actions'

function App(props) {
    const {
        from,
        to,
        isCitySelectorVisible,
        cityData,
        isLoadingCityData,
        dispatch,
        departDate,
        isDateSelectorVisible
    } = props

    const onBack = useCallback(() => {
        window.history.back();
    }, [])

    const citySelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchCityData,
            onSelect: setSelectedCity
        }, dispatch)
    }, [])

    const cbs = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector
        }, dispatch)
    }, [])

    const departDateCbs = useMemo(() => {
        return bindActionCreators({
            onClick: showDateSelector
        }, dispatch)
    },[])

    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack:hideDateSelector
        },dispatch)
    },[])

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
                <DepartDate
                    time={departDate}
                    {...departDateCbs}
                ></DepartDate>
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
            <DateSelector
                {...dateSelectorCbs}
                show={isDateSelectorVisible}
            />
           
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