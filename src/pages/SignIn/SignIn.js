import { useEffect, useRef, useState } from "react";
import { ReactComponent as AshjarLogo } from "../../assets/AshjarLogo.svg";

import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button } from "@chakra-ui/react";
import { auth } from "../../auth/firebase/config";
import { AUTH_EVENTS, useAuth } from "../../auth";
import { userAtom } from "../../recoil/atoms";
import { authSelector } from "../../recoil/selectors";

function SignIn(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("aliadnanarif25@gmail.com");
    const [password, setPassword] = useState("ALOHOMORA!!!");
    const [alert, setAlert] = useState({ type: "", message: "" });

    const [dispatch, loading, userEmail] = useAuth({
        reroute: "/home",
        userAtom: userAtom,
        authSelector: authSelector,
        setAlert,
    });

    useEffect(() => {
        setAlert({ type: "", message: "" });
    }, []);

    let user = useRef();

    useEffect(() => {
        // Retrieve the user object from localStorage and parse it as JSON
        const userData = localStorage.getItem("user");

        // console.log("session data", localStorage);
        // console.log("user data", userData);
        const parsedUser = JSON.parse(userData);

        // Assign the parsed user object to the useRef
        user.current = parsedUser;

        // console.log("getItem user", user.current);
    }, []); // Empty dependency array for running the effect once on mount

    return (
        <div className="flex h-full">
            <div className="w-[50%] h-full grid place-content-center gap-4">
                <AshjarLogo className="h-[400px] w-[400px]" />
                <span className="text-[#AF8465] text-[48px] font-Adam leading-none text-center">Ashjar</span>
            </div>
            <div className="w-[50%] h-full flex flex-col justify-center items-center">
                <FormControl className="max-w-[480px]">
                    <FormLabel className="font">Email Address</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        className="text-xs text-mediumGray leading-[12px]"
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <FormLabel className="mt-4">Password</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        className="mb-6 text-xs text-mediumGray leading-[12px]"
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <Button
                        className=" !bg-primary px-4 py-2"
                        variant="unstyled"
                        isLoading={isLoading}
                        type="submit"
                        onClick={() =>
                            dispatch({
                                type: AUTH_EVENTS.LOGIN,
                                payload: { email, password },
                            })
                        }>
                        <span className="block px-6 py-2 text-white text-lg"> Submit</span>
                    </Button>
                </FormControl>
            </div>
        </div>
    );
}

export default SignIn;
