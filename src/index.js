import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";

import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ChakraProvider
            toastOptions={{ defaultOptions: { position: "bottom", duration: 9000, isClosable: true } }}>
            <RecoilRoot>
                <ApolloProvider client={client}>
                    <Router>
                        <App />
                    </Router>
                </ApolloProvider>
            </RecoilRoot>
        </ChakraProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
