import { useCallback, useEffect, useRef, useState } from "react";

const useStateCallback = (initialState) => {
    const [state, setState] = useState(initialState);
    const callbackRef = useRef(null);

    const setStateCallback = useCallback((newState, func) => {
        callbackRef.current = func;
        setState(newState);
    }, []);

    useEffect(() => {
        if (callbackRef.current) {
            callbackRef.current(state);
            callbackRef.current = null;
        }
    }, [state]);

    return [state, setStateCallback];
};

export default useStateCallback;
