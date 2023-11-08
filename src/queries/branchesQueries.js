// src/queries.js
import { gql } from "@apollo/client";

export const GET_BRANCH = gql`
    query Query($id: ID!) {
        branch(_id: $id) {
            _id
            location
            name
            meetingRooms {
                _id
                name
                totalSeats
                ratesPerHour
            }
            workspaces {
                _id
                name
                totalSeats
                ratesPerHour
            }
        }
    }
`;

export const GET_BRANCHES = gql`
    query Query {
        branches {
            meetingRooms {
                _id
                name
                totalSeats
                ratesPerHour
            }
            name
            workspaces {
                _id
                name
                totalSeats
                ratesPerHour
            }
            _id
            Nurseries {
                seats
                priceRatePerHour
                name
                _id
            }
        }
    }
`;

export const CREATE_BRANCH = gql`
    mutation Mutation($input: BranchInput!) {
        createBranch(input: $input) {
            _id
            name
            location
        }
    }
`;

export const UPDATE_BRANCH = gql`
    mutation Mutation($input: BranchUpdateInput!) {
        updateBranch(input: $input) {
            _id
            name
            location
            meetingRooms
            workspaces
        }
    }
`;
