import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { notification } from "antd";
// import { endpoints } from "../helpers";
import { firebase, auth } from "../firebase/config";
import { AUTH_EVENTS } from "../helpers/enums";
// import { AUTH_EVENTS } from "../helpers";
import { signInWithEmailAndPassword } from "firebase/auth";

const useAuth = ({ reroute, userAtom, authSelector, alert, setAlert }) => {
    const setUserAtom = useSetRecoilState(userAtom);
    const userAuth = useRecoilValue(authSelector());
    const [loading, setLoading] = useState(false);
    const [signupComplete, setSignupComplete] = useState(false);
    const [userId, setUserId] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();
    const { action } = useParams();
    const { pathname } = useLocation();
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        // console.log("USE EFFECT useAuth");
        // console.log("USE EFFECT userAuth", userAuth);
        // console.log("USE EFFECT pathname", pathname);
        // console.log("USE EFFECT action", action);
        if (!loading && userAuth) {
            console.log("!loading && userAuth", !loading && userAuth);
            if (userAuth?.user === "no user") {
                console.log("no user");

                setAlert({
                    type: "error",
                    message: "No user record for this email address.",
                });
                setLoading(false);
                localStorage.setItem("user", JSON.stringify(null));
            } else if (userAuth?.authorized === false) {
                console.log("not authorized");
                setLoading(false);
                setUserAtom(null);
                localStorage.setItem("user", JSON.stringify(null));
            } else if (userAuth?.authorized === true && pathname.includes("login")) {
                console.log("userAuth?.authorized pathname.includesauth action login");

                setLoading(false);
                const redirectTo = sessionStorage.getItem("redirectTo");
                sessionStorage.setItem("redirectTo", JSON.stringify(null));
                console.log("redirectTo", redirectTo);
                console.log("reroute", reroute);
                navigate("/", { replace: true });
            }
        }
    }, [userAuth, loading]); // eslint-disable-line

    const signIn = async ({ email, password }) => {
        try {
            let user = await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in

                    const user = userCredential.user;
                    localStorage.setItem("user", JSON.stringify(user));

                    const token = user.accessToken;
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", JSON.stringify({ token }));
                    setUserAtom(user);

                    return user;
                })
                .catch((error) => {
                    console.log("error", error);
                    setAlert({
                        type: "error",
                        message: "Email address or password is incorrect.",
                    });

                    return null;
                });

            console.log("user", user);

            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const resetPassword = async (email) => {
        // await firebase.auth.sendPasswordResetEmail(email)
        return "success";
    };

    const signUp = async (values) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}users/signUp`, {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify({ name: values.name, email: values.email, password: values.password }),
            });
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log({ data });
                    notification["success"]({
                        message: "User created successfully",
                        duration: 5,
                        onClick: () => {
                            notification.close();
                        },
                    });
                    setSignupComplete(true);
                    setUserEmail(values.email);
                    setUserId(data._id);
                    setLoading(false);
                });
            } else {
                console.log(response);
                setAlert({
                    type: "error",
                    message: "Email address or password is incorrect.",
                });
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const logout = () => {
        if (userAuth) {
            firebase.auth.signOut();
            localStorage.setItem("user", JSON.stringify(null));
            localStorage.setItem("token", JSON.stringify(null));
            window.location.href = "/";
        }
    };

    const dispatch = useCallback((event) => {
        setLoading(true);
        try {
            switch (event.type) {
                case AUTH_EVENTS.LOGIN:
                    signIn(event.payload);
                    break;
                case AUTH_EVENTS.SIGNUP:
                    signUp(event.payload);
                    break;
                case AUTH_EVENTS.LOGOUT:
                    logout();
                    break;
                case AUTH_EVENTS.RESET_PASSWORD:
                    resetPassword(event.payload);
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.log(err);
        }
    });

    return [dispatch, loading, signupComplete, userId, clientSecret];
};

export default useAuth;
