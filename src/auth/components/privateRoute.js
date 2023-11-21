import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { authSelector } from "../../recoil/selectors";
import { userAtom } from "../../recoil/atoms";
import { useRecoilStateCallback } from "../../hooks";

// import { useRecoilStateCallback } from "@hooks";
// import { userAtom } from "@atoms";
// import { authSelector } from "@selectors";

const PrivateRoute = (props) => {
    const [loading, setLoading] = useState(true);
    const [_, setUserAtom] = useRecoilStateCallback(userAtom);
    const isAuthenticated = useRecoilValue(authSelector());
    const { redirect } = props;
    const { pathname } = useLocation();

    useEffect(() => {
        sessionStorage.setItem("redirectTo", pathname);
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            sessionStorage.setItem("redirectTo", JSON.stringify(null));
            setUserAtom(userData, () => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []); // eslint-disable-line

    return isAuthenticated?.authorized ? (
        <>{props.children}</>
    ) : loading ? (
        <div>LOADING...</div>
    ) : (
        <Navigate to={redirect} replace />
    );
};

export default PrivateRoute;
