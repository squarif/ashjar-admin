// src/queries.js
import { gql } from "@apollo/client";

export const GET_BRANCH = gql`
    query Query($id: ID!) {
        branch(_id: $id) {
            _id
            location
            address
            name
            meetingRooms {
                _id
                name
                totalSeats
                ratesPerHour
                pictures
                isArchived
            }
            workspaces {
                _id
                name
                totalSeats
                pictures
                isArchived
            }
            nurseries {
                _id
                seats
                name
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
                pictures
                ratesPerHour
                isArchived
            }
            name
            workspaces {
                _id
                name
                totalSeats
                pictures
                baseRates {
                    rate
                }
                isArchived
            }
            _id
            nurseries {
                _id
                name
                seats
                pictures
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
            address
        }
    }
`;

export const REMOVE_BRANCH = gql`
    mutation RemoveBranch($input: removeMeetingRoomInput) {
        removeBranch(input: $input) {
            _id
        }
    }
`;

export const UPDATE_BRANCH = gql`
    mutation Mutation($input: BranchUpdateInput!) {
        updateBranch(input: $input) {
            _id
            name
            location
            address
        }
    }
`;

export const BRANCH_REVENUE = gql`
    query BranchRevenue($id: ID!, $startDate: String, $endDate: String) {
        branchRevenue(_id: $id, startDate: $startDate, endDate: $endDate) {
            riyals
        }
    }
`;
