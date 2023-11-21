import { gql } from "@apollo/client";

const GET_USERS = gql`
    query Query {
        users {
            _id
            name
            phoneNumber
            password
            email
            role
            gender
            createdAt
            isBlocked
            numberOfBookings
        }
    }
`;

const EDIT_USER = gql`
    mutation Mutation($input: UserUpdateInput!) {
        updateUser(input: $input) {
            _id
            isBlocked
        }
    }
`;

export { GET_USERS, EDIT_USER };
