import { useEffect,useCallback } from 'react'
import fp from './fp'
export default function useNav(departDate, dispatch, prevDate, nextDate) {
    const isPrevDisabled = fp(departDate) <= fp();
    const isNextDisabled = fp(departDate) - fp() > 20 * 86400 * 1000;

    const prev = useCallback(() => {
        if (isPrevDisabled) {
            return;
        }
        dispatch(prevDate())
    }, [isPrevDisabled])

    const next = useCallback(() => {
        if (isNextDisabled) {
            return;
        }
        dispatch(nextDate())
    }, [isNextDisabled])

    return {
        isPrevDisabled,
        isNextDisabled,
        prev,
        next,
    }
}