import React, { useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './CitySelector.css'
export default function CitySelector(props) {
    const {
        show,
        cityData,
        isLoading,
        onBack
    } = props
    const [searchKey, setSearchKey] = useState('')
    const key = searchKey.trim()
    return (
        <div className={classnames('city-selector', { hidden: !show })} >
            <div className="city-search">
                <div className="search-back" onClick={() => onBack()}>
                    <svg width="42" height="42">
                        <polyline
                            points="25,13,16,21,25,29"
                            stroke="#fff"
                            strokeWidth="2"
                            fill='none'
                        >
                        </polyline>
                    </svg>
                </div>
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        value={searchKey}
                        className="search-input"
                        placeholder="城市、车站的中文或拼音"
                        onChange={e => setSearchKey(e.target.value)}
                    />
                </div>
                <i
                    className="search-clean"
                    onClick={() => setSearchKey('')}
                    className={classnames('search-clean', {
                        hidden: key.length === 0
                    })}
                >
                    &#xf063;
                </i>
            </div>
        </div>
    )
}

CitySelector.propTypes = {
    show: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired
}