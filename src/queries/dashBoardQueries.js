import { gql } from "@apollo/client";

export const GET_BRANCHES_REVENUE = gql`
    query BranchesRevenue($startDate: String, $endDate: String) {
        branchesRevenue(startDate: $startDate, endDate: $endDate) {
            meetingRoomRevenue
            workSpaceRevenue
            workshopRevenue
        }
    }
`;

export const GET_BRANCH_REVENUE = gql`
    query BranchRevenue($id: ID!, $startDate: String, $endDate: String) {
        branchRevenue(_id: $id, startDate: $startDate, endDate: $endDate) {
            meetingRoomRevenue
            workSpaceRevenue
            workshopRevenue
        }
    }
`;

export const GET_BRANCHES_REVENUE_FOR_N_MONTHS = gql`
    query Query($n: Int) {
        branchesRevenueForNMonths(n: $n) {
            month
            meetingRoomRevenue
            workSpaceRevenue
            workshopRevenue
        }
    }
`;

export const GET_BRANCH_REVENUE_FOR_N_MONTHS = gql`
    query BranchRevenueForNMonths($id: ID, $n: Int) {
        branchRevenueForNMonths(_id: $id, n: $n) {
            month
            workSpaceRevenue
            meetingRoomRevenue
            workshopRevenue
        }
    }
`;

export const GET_ADVANCE_SEARCH_BOOKINGS = gql`
    query Query($params: BookingTypeInput, $pagination: pagination) {
        AdvanceSearchBooking(params: $params, pagination: $pagination) {
            bookings {
                bookingType
                bookingId
                bookingNumber
                bookingDate
                bookingType
                seats
                rate
                startTime
                endTime
                userId {
                    _id
                    name
                    phoneNumber
                    numberOfBookings
                }
                isCancelled
                createdAt
                _id
            }
            count
        }
    }
`;
