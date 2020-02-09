import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux';
import './App.css'
import URI from 'urijs'
import dayjs from 'dayjs'
import fp from '../common/fp'
import Header from '../common/Header'
import Nav from '../common/Nav'
import List from './List'
import Bottom from './Bottom'

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
    setArriveStations
} from './action'

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
        searchParsed
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

    return (
        <div>
            <div className="header-wrapper">
                <Header title={`${from} → ${to}`} onBack={onBack}></Header>
            </div>
            <Nav></Nav>
            <List></List>
            <Bottom></Bottom>
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