
import React, {useCallback, useEffect, useRef} from 'react'

const useDebounce = (callback: Function, delay: number): Function => {

    let timer: any = useRef()

    const debouncedCallback = useCallback((...args: any) => {
        if(timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)

    }, [callback, delay])

    return debouncedCallback
}

export default useDebounce