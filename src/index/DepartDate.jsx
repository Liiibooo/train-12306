import './DepartDate.css'
import React, { useMemo } from 'react'
import fp from '../common/fp'
import dayjs from 'dayjs'
export default function DepartDate(props) {
    const {
        time,
        onClick
    } = props;

    const h0OfDepart = fp(time)
    const departDate = new Date(h0OfDepart)

    const departDateString = useMemo(() => {
      return  dayjs(h0OfDepart).format('YYYY-MM-DD');
    }, [h0OfDepart])

    const isToday = h0OfDepart === fp();


    const weekString = '周' + ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()]
    + (isToday ?  '(今天)' : '')  


    return (
        <div className="depart-date" onClick={onClick}>
            <input type="hidden" name="date" value={departDateString}/>
            {departDateString} <span className="depart-week">{weekString}</span>
        </div>
    )
}