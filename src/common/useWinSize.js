import { useState, useEffect } from 'react'

export default function useWinSize() {
    const [width, setWidth] = useState(document.documentElement.clientWidth);
    const [height, setHeight] = useState(document.documentElement.clientHeight);
    useEffect(() => {
        window.addEventListener('resize', onResize, false)
        const onResize = () => {
            setWidth(document.documentElement.clientWidth)
            setHeight(document.documentElement.clientHeight)
        }
        return () => {
            window.removeEventListener('resize', onResize, false)
        }
    }, [])
    return { width, height }
}