// src/apollo.js
import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    split,
    from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { Observable } from "@apollo/client";

import firebase from "firebase/compat/app";

const promiseToObservable = (promise) =>
    new Observable((subscriber) => {
        promise.then(
            (value) => {
                if (subscriber.closed) return;
                subscriber.next(value);
                subscriber.complete();
            },
            (err) => subscriber.error(err)
        );
    });

const authLink = setContext((_, { headers }) => {
    // Retrieve the authentication token from where you've stored it (e.g., cookies or local storage)
    const cashedToken = JSON.parse(localStorage.getItem("token"))?.token;

    return {
        headers: {
            ...headers,
            Authorization: cashedToken ? `${cashedToken}` : "", // Format the token as needed
        },
    };

    // Add the token to the headers if it exists
});

const retryLink = new RetryLink({
    delay: {
        initial: 600,
        max: Infinity,
    },
    attempts: {
        max: 3,
        retryIf: (error, _operation) => {
            console.log({ error: error?.result?.errors[0] });
            return (
                error?.result?.errors[0]?.message ===
                    "Context creation failed: Unauthorized" ||
                error?.result?.errors[0]?.message === "Unauthorized"
            );
        },
    },
});

const refreshToken = async (operation) => {
    const oldHeaders = operation.getContext().headers;
    const token = await firebase.auth().currentUser?.getIdToken();
    localStorage.setItem("token", JSON.stringify({ token }));
    operation.setContext({
        headers: {
            ...oldHeaders,
            Authorization: token,
        },
    });
};

const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        console.log({ graphQLErrors });
        if (
            (graphQLErrors &&
                (graphQLErrors[0].message ===
                    "Context creation failed: Unauthorized" ||
                    graphQLErrors[0]?.extensions?.code ===
                        "UNAUTHENTICATED")) ||
            graphQLErrors?.[0]?.message === "Unauthorized"
        ) {
            return promiseToObservable(refreshToken(operation)).flatMap(() =>
                forward(operation)
            );

            // localStorage.setItem('token', JSON.stringify(null))
        }
    }
);

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
    link: from([errorLink, retryLink, authLink, httpLink]),
    cache: new InMemoryCache(),
});

export default client;
