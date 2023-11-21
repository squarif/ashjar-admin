import { useCallback, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

const useRecoilStateCallback = (recoilState) => {
    const [state, setState] = useRecoilState(recoilState);
    const callBack = useRef(null);

    const setStateCallback = useCallback((newState, func) => {
        callBack.current = func;
        setState(newState);
    }, []);

    useEffect(() => {
        if (callBack.current) {
            callBack.current(state);
            callBack.current = null;
        }
    }, [state]);

    return [state, setStateCallback];
};

export default useRecoilStateCallback;
