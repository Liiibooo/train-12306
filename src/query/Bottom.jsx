import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import './Bottom.css'
import { ORDER_DEPART } from './constant';
import classnames from 'classnames'
import Slider from './Slider.jsx'

const Filter = memo(function Filter(props) {
    const {
        name,
        checked,
        value,
        toggle
    } = props;
    return (
        <li className={classnames({ checked })} onClick={() => toggle(value)}>
            {name}
        </li>
    )
})

const Options = memo(function OPtions(props) {
    const {
        title,
        options,
        checkedMap,
        update
    } = props;

    const toggle = (value) => {
        console.log(1);

        const newCheckedMap = { ...checkedMap }
        if (value in checkedMap) {
            delete newCheckedMap[value];
        } else {
            newCheckedMap[value] = true;
        }
        update(newCheckedMap)
    }

    return (
        <div className="option">
            <h3>{title}</h3>
            <ul>
                {
                    options.map(option => {
                        return <Filter {...option} key={option.value} checked={option.value in checkedMap} toggle={toggle}></Filter>
                    })
                }
            </ul>
        </div>
    )
})

const BottomModal = memo(function BottomModal(props) {
    const {
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd,
        toggleIsFiltersVisible,
    } = props;

    //坐席类型数据映射
    const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState(() => {
        return {
            ...checkedTicketTypes
        }
    });

    //车次类型数据映射
    const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(() => {
        return {
            ...checkedTrainTypes
        }
    });

    //出发车站数据映射
    const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState(() => {
        return {
            ...checkedDepartStations
        }
    });

    //到达车站数据映射
    const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState(() => {
        return {
            ...checkedArriveStations
        }
    });

    const [localDepartTimeStart, setLocalDepartTimeStart] = useState(departTimeStart)
    const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd)
    const [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart)
    const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd)
    const optionGroup = [
        {
            title: '坐席类型',
            options: ticketTypes,
            checkedMap: localCheckedTicketTypes,
            update: setLocalCheckedTicketTypes
        },
        {
            title: '车次类型',
            options: trainTypes,
            checkedMap: localCheckedTrainTypes,
            update: setLocalCheckedTrainTypes
        },
        {
            title: '出发车站',
            options: departStations,
            checkedMap: localCheckedDepartStations,
            update: setLocalCheckedDepartStations
        },
        {
            title: '到达车站',
            options: arriveStations,
            checkedMap: localCheckedArriveStations,
            update: setLocalCheckedArriveStations
        }
    ]

    //提交筛选条件
    function sure() {
        setCheckedTicketTypes(localCheckedTicketTypes)
        setCheckedTrainTypes(localCheckedTrainTypes)
        setCheckedDepartStations(localCheckedDepartStations)
        setCheckedArriveStations(localCheckedArriveStations)

        setDepartTimeStart(localDepartTimeStart)
        setDepartTimeEnd(localDepartTimeEnd)

        setArriveTimeStart(localArriveTimeStart)
        setArriveTimeEnd(localArriveTimeEnd)

        toggleIsFiltersVisible()
    }

    //重置筛选条件
    function reset() {
        setLocalCheckedTicketTypes({})
        setLocalCheckedTrainTypes({})
        setLocalCheckedDepartStations({})
        setLocalCheckedArriveStations({})

        setLocalDepartTimeStart(0)
        setLocalDepartTimeEnd(24)
        setLocalArriveTimeStart(0)
        setLocalArriveTimeEnd(24)

    }

    return (
        <div className="bottom-modal">
            <div className="bottom-dialog">
                <div className="bottom-dialog-content">
                    <div className="title">
                        <span className="reset" onClick={reset}>重置</span>
                        <span className="ok" onClick={sure}>确定</span>
                    </div>
                    <div className="options">
                        {
                            optionGroup.map(group => <Options {...group} key={group.title}></Options>)
                        }
                        <Slider
                            title="出发时间"
                            currentStartHours={localDepartTimeStart}
                            currentEndHours={localDepartTimeEnd}
                            onStartChanged={setLocalDepartTimeStart}
                            onEndChanged={setLocalDepartTimeEnd}
                        ></Slider>
                        <Slider
                            title="到达时间"
                            currentStartHours={localArriveTimeStart}
                            currentEndHours={localArriveTimeEnd}
                            onStartChanged={setLocalArriveTimeStart}
                            onEndChanged={setLocalArriveTimeEnd}
                        >

                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
})


export default function Bottom(props) {
    const {
        toggleOrderType,
        toggleHighSpeed,
        toggleOnlyTickets,
        toggleIsFiltersVisible,
        highSpeed,
        orderType,
        onlyTickets,
        isFiltersVisible,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd,
    } = props;



    return (
        <div className="bottom">
            <div className="bottom-filters">
                <span className="item" onClick={toggleOrderType}>
                    <i className="icon">&#xf065;</i>
                    {orderType === ORDER_DEPART ? '出发 早→晚' : '耗时 短→长'}
                </span>
                <span
                    className={classnames('item', { 'item-on': highSpeed })}
                    onClick={toggleHighSpeed}
                >
                    <i className='icon'>{highSpeed ? '\uf43f' : '\uf43e'}</i>
                    只看高铁动车
                </span>
                <span
                    className={classnames('item', { 'item-on': onlyTickets })}
                    onClick={toggleOnlyTickets}
                >
                    <i className='icon'>{onlyTickets ? '\uf43d' : '\uf43c'}</i>
                    只看有票
                </span>
                <span
                    className={classnames('item', { 'item-on': isFiltersVisible })}
                    onClick={toggleIsFiltersVisible}
                >
                    <i className='icon'>{'\uf0f7'}</i>
                    只看有票
                </span>
            </div>
            {isFiltersVisible && (
                <BottomModal
                    checkedTicketTypes={checkedTicketTypes}
                    checkedTrainTypes={checkedTrainTypes}
                    checkedDepartStations={checkedDepartStations}
                    checkedArriveStations={checkedArriveStations}
                    departTimeStart={departTimeStart}
                    departTimeEnd={departTimeEnd}
                    arriveTimeStart={arriveTimeStart}
                    arriveTimeEnd={arriveTimeEnd}
                    ticketTypes={ticketTypes}
                    trainTypes={trainTypes}
                    departStations={departStations}
                    arriveStations={arriveStations}
                    setCheckedTicketTypes={setCheckedTicketTypes}
                    setCheckedTrainTypes={setCheckedTrainTypes}
                    setCheckedDepartStations={setCheckedDepartStations}
                    setCheckedArriveStations={setCheckedArriveStations}
                    setDepartTimeStart={setDepartTimeStart}
                    setDepartTimeEnd={setDepartTimeEnd}
                    setArriveTimeStart={setArriveTimeStart}
                    setArriveTimeEnd={setArriveTimeEnd}
                    toggleIsFiltersVisible={toggleIsFiltersVisible}
                ></BottomModal>
            )}
        </div>
    )
}

// Bottom.propTypes = {

// }