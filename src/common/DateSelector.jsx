import React from 'react'
import classnames from 'classnames'
// import PropTypes from 'prop-types'
import fp from './fp'
import Header from './Header.jsx'
import './DateSelector.css'

function Day(props) {
    const {
        day,
        onSelect
    } = props

    if (!day) {
        return <td className="null"></td>
    }

    const classes = []
    const now = fp()
    if (day < now) {
        classes.push('disabled')
    }
    if ([6, 0].includes(new Date(day).getDay())) {
        classes.push('weekend')
    }

    const dateString = now === day ? '今天' : new Date(day).getDate()

    return (
        <td className={classnames(classes)} onClick={() => { onSelect (day)}}>
            {
                dateString
            }
        </td>
    )
}

function Week(props) {
    const {
        days,
        onSelect
    } = props
    return (
        <tr className="date-table-days">
            {
                days.map((day, idx) => {
                    return <Day key={idx} day={day} onSelect={onSelect}></Day>
                })
            }
        </tr>
    )
}

function Month(props) {
    const {
        startingTimeMonth,
        onSelect
    } = props;

    const startDay = new Date(startingTimeMonth)
    const currentDay = new Date(startingTimeMonth)

    let days = []
    while (currentDay.getMonth() === startDay.getMonth()) {
        days.push(currentDay.getTime())
        currentDay.setDate(currentDay.getDate() + 1)
    }

    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6).fill(null).concat(days);

    const lassDay = new Date(days[days.length - 1]);
    days = days.concat(new Array(lassDay.getDay() ? 7 - lassDay.getDay() : 0).fill(null));

    const weeks = []
    for (let row = 0; row < days.length / 7; ++row) {
        const week = days.slice(row * 7, (row + 1) * 7);
        weeks.push(week)
    }


    return (
        <table className="date-table">
            <thead>
                <tr>
                    <td colSpan="7">
                        <h5>
                            {startDay.getFullYear()}年{startDay.getMonth() + 1}月
                        </h5>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className="data-table-weeks">
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周五</th>
                    <th className="weekend">周六</th>
                    <th className="weekend">周日</th>
                </tr>
                {
                    weeks.map((week, index) => {
                        return (
                            <Week
                                key={index}
                                days={week}
                                onSelect={onSelect}
                            ></Week>
                        )
                    })
                }
            </tbody>
        </table>
    )
}



export default function DateSelector(props) {
    const {
        show,
        onSelect,
        onBack
    } = props;

    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    now.setDate(1);

    const monthSequence = [now.getTime()];
    now.setMonth(now.getMonth() + 1)
    monthSequence.push(now.getTime())

    now.setMonth(now.getMonth() + 1)
    monthSequence.push(now.getTime())


    return (
        <div className={classnames('date-selector', { hidden: !show })}>
            <Header title="日期选择" onBack={onBack} />
            <div className="date-selector-tables">
                {
                    monthSequence.map(month => {
                        return (
                            <Month
                                key={month}
                                onSelect={onSelect}
                                startingTimeMonth={month}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

// DateSelector.propTypes = {
//     show: PropTypes.bool.isRequired,
//     onBack: PropTypes.func.isRequired,
// }