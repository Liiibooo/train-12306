import React, { useCallback, useEffect, useMemo } from 'react'
import { connect } from 'react-redux';
import './App.css'
import URI from 'urijs'
import dayjs from 'dayjs'
import fp from '../common/fp'
import Header from '../common/Header'
import Nav from '../common/Nav'
import List from './List'
import Bottom from './Bottom'

import useNav from '../common/useNav'

import {
    setFrom,
    setTo,
    setSearchParsed,
    setDepartDate,
    setHighSpeed,
    setTrainList,
    setTicketTypes,
    setTrainTypes,
    setDepartStations,
    setArriveStations,
    prevDate,
    nextDate,

    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFiltersVisible
} from './action'
import { bindActionCreators } from 'redux';

function App(props) {
    const {
        from,
        to,
        dispatch,
        departDate,
        highSpeed,
        orderType,
        onlyTickets,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        searchParsed,
        isFiltersVisible,
        trainList
    } = props;

    useEffect(() => {
        const queries = URI.parseQuery(window.location.search);
        const {
            from,
            to,
            date,
            highSpeed,
        } = queries;
        dispatch(setFrom(from));
        dispatch(setTo(to));
        dispatch(setDepartDate(fp(dayjs(date).valueOf())))
        dispatch(setHighSpeed(highSpeed === 'true'))
        dispatch(setSearchParsed(true))
    }, [])

    useEffect(() => {
        if (!searchParsed) {
            return;
        }
        const url = new URI('/rest/query')
            .setSearch('from', from)
            .setSearch('to', to)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .setSearch('highSpeed', highSpeed)
            .setSearch('orderType', orderType)
            .setSearch('onlyTickets', onlyTickets)
            .setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
            .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
            .setSearch('checkedDepartStations', Object.keys(checkedDepartStations).join())
            .setSearch('checkedArriveStations', Object.keys(checkedArriveStations).join())
            .setSearch('departTimeStart', departTimeStart)
            .setSearch('departTimeEnd', departTimeEnd)
            .setSearch('arriveTimeStart', arriveTimeStart)
            .setSearch('arriveTimeEnd', arriveTimeEnd)
            .toString()

        fetch(url).then(response => response.json())
            .then(res => {
                console.log(res, 'res');

                const {
                    dataMap: {
                        directTrainInfo: {
                            trains,
                            filter: {
                                ticketType,
                                trainType,
                                depStation,
                                arrStation,
                            }
                        }
                    }
                } = res;
                dispatch(setTrainList(trains))
                dispatch(setTicketTypes(ticketType))
                dispatch(setTrainTypes(trainType))
                dispatch(setDepartStations(depStation))
                dispatch(setArriveStations(arrStation))
            })
    }, [
        from,
        to,
        departDate,
        highSpeed,
        searchParsed,
        orderType,
        onlyTickets,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
    ])

    const onBack = useCallback(() => {
        window.history.back();
    }, [])

    const { isPrevDisabled,
        isNextDisabled,
        prev,
        next } = useNav(departDate, dispatch, prevDate, nextDate)

    const bottomCbs = useMemo(() => {
        return bindActionCreators({
            toggleOrderType,
            toggleHighSpeed,
            toggleOnlyTickets,
            toggleIsFiltersVisible,
        }, dispatch)
    }, [])


    return (
        <div>
            <div className="header-wrapper">
                <Header title={`${from} → ${to}`} onBack={onBack}></Header>
            </div>
            <Nav
                date={departDate}
                isPrevDisabled={isPrevDisabled}
                isNextDisabled={isNextDisabled}
                prev={prev}
                next={next}
            >
            </Nav>
            <List list={trainList}></List>
            <Bottom
                highSpeed={highSpeed}
                orderType={orderType}
                onlyTickets={onlyTickets}
                isFiltersVisible={isFiltersVisible}
                {...bottomCbs}
            ></Bottom>
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