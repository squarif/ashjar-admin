// src/apollo.js
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
    // Retrieve the authentication token from where you've stored it (e.g., cookies or local storage)
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = userData.stsTokenManager.accessToken;

    // Add the token to the headers if it exists
    return {
        headers: {
            ...headers,
            Authorization: token ? `${token}` : "", // Format the token as needed
        },
    };
});

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default client;
