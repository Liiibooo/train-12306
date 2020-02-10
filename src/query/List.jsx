import React, { memo } from 'react'
import PropTypes from 'prop-types'
import './List.css'
import URI from 'urijs'

const ListItem = memo(function ListItem(props) {
    const url = new URI('ticket.html')
        .setSearch('aStation', aStation)
        .setSearch('dStation', dStation)
        .setSearch('trainNumber', trainNumber)
        .setSearch('date', date)
        .toString()

    const {
        dTime,
        aTime,
        dStation,
        aStation,
        trainNumber,
        date,
        time,
        priceMsg,
        dayAfter
    } = props;
    return (
        <li className="list-item">
            <a href={url}>
                <span className="item-time">
                    <em>{dTime}</em>
                    <br />
                    <em className="em-light">{aTime}<i className="time-after">{dayAfter}</i></em>
                </span>
                <span className="item-stations">
                    <em>
                        <i className="train-station train-start">始</i>
                        {dStation}
                    </em>
                    <br />
                    <em className="em-light">
                        <i className="train-station train-end">终</i>
                        {aStation}
                    </em>
                </span>
                <span className="item-train">
                    <em>{trainNumber}</em>
                    <br />
                    <em className="em-light">{time}</em>
                </span>
                <span className="item-ticket">
                    <em>{priceMsg}</em>
                    <br />
                    <em className='em-light-orange'>可抢票</em>
                </span>
            </a>
        </li>
    )
})
export default function List(props) {
    const {
        list
    } = props;

    return (
        <ul className="list">
            {
                list.map(item => {
                    return <ListItem {...item} key={item.trainNumber}></ListItem>
                })
            }
        </ul>
    )
}

List.propTypes = {
    list: PropTypes.array.isRequired
}