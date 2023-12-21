import { gql } from "@apollo/client";

const GET_NURSERY = gql`
    query Users($id: ID!) {
        nursery(_id: $id) {
            _id
            name
            seats
            pictures
        }
    }
`;

const CREATE_NURSERY = gql`
    mutation Mutation($input: NurseryInput!) {
        createNursery(input: $input) {
            _id
            name
            seats
            pictures
        }
    }
`;

const EDIT_NURSERY = gql`
    mutation Mutation($input: NurseryUpdateInput!) {
        updateNursery(input: $input) {
            _id
            name
            seats
            branch
            pictures
        }
    }
`;

export { GET_NURSERY, CREATE_NURSERY, EDIT_NURSERY };
