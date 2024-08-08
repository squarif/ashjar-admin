// src/queries.js
import { gql } from "@apollo/client";

export const GET_BRANCH = gql`
    query Query($id: ID!) {
        branch(_id: $id) {
            _id
            location
            address
            name
            nameArabic
            meetingRooms {
                _id
                priority
                name
                nameArabic
                totalSeats
                ratesPerHour
                pictures
                isArchived
            }
            workspaces {
                _id
                priority
                name
                nameArabic
                totalSeats
                pictures
                isArchived
            }
            nurseries {
                _id
                seats
                name
            }
            workshops {
                _id
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
                priority
                name
                nameArabic
                totalSeats
                pictures
                ratesPerHour
                isArchived
            }
            name
            nameArabic
            workspaces {
                _id
                name
                priority
                nameArabic
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
                nameArabic
                seats
                pictures
            }
            workshops {
                _id
                name
            }
        }
    }
`;

export const CREATE_BRANCH = gql`
    mutation Mutation($input: BranchInput!) {
        createBranch(input: $input) {
            _id
            name
            nameArabic
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
            nameArabic
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
