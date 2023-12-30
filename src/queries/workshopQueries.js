import { gql } from "@apollo/client";

const GET_WORKSHOP_REQUESTS = gql`
    query Query {
        workshopRequests {
            _id
            name
            pricePerSeat
            seats
            bookings {
                date
                startTime
                endTime
                nurseryBookings {
                    nursery
                    seats
                }
                workspaceBookings {
                    workspace
                    seats
                }
            }
            description
            amenities {
                name
                picture
                quantity
                type
            }
            categories
            approvalStatus
            draft
            separateBooking
            rejectionReason
            username
            email
            phone
            company
            socialMediaAccount
            gender
            comments
        }
    }
`;

const GET_WORKSHOP_REQUEST = gql`
    query WorkshopRequest($id: ID!) {
        workshopRequest(_id: $id) {
            _id
            name
            pricePerSeat
            seats
            bookings {
                date
                startTime
                endTime
                nurseryBookings {
                    nursery
                    seats
                }
                workspaceBookings {
                    workspace
                    seats
                }
            }
            bookingByCustomers {
                date
                userId {
                    name
                }
                noOfSeats
                _id
            }
            branch {
                _id
                name
                location
                address
            }
            description
            amenities {
                name
                picture
                quantity
                type
            }
            categories
            approvalStatus
            draft
            separateBooking
            remainingSeats {
                date
                remainingNumberOfSeats
            }
            rejectionReason
            username
            email
            phone
            company
            socialMediaAccount
            gender
            ageGroup {
                min
                max
            }
            comments
        }
    }
`;

const UPDATE_WORKSHOP_REQUEST = gql`
    mutation Mutation($input: WorkshopRequestUpdateByAdminInput!) {
        updateWorkshopRequestByAdmin(input: $input) {
            _id
            name
            pricePerSeat
            seats
            bookings {
                date
                startTime
                endTime
                nurseryBookings {
                    nursery
                    seats
                }
                workspaceBookings {
                    workspace
                    seats
                }
            }
            branch {
                name
                _id
                location
            }
            description
            amenities {
                name
                picture
                quantity
                type
            }
            categories
            approvalStatus
            draft
            rejectionReason
            username
            email
            phone
            company
        }
    }
`;

const GET_AVAILABLE_SLOTS = gql`
    query GetBranchWithWorkspacesAndNurseries(
        $branchId: ID!
        $date: String!
        $startTime: String!
        $endTime: String!
    ) {
        getBranchWithWorkspacesAndNurseries(
            branchId: $branchId
            date: $date
            startTime: $startTime
            endTime: $endTime
        ) {
            workspaces {
                workspace {
                    _id
                    name
                }
                seatsRemaining
            }
            nurseries {
                nursery {
                    _id
                    name
                }
                seatsRemaining
            }
        }
    }
`;

export { GET_WORKSHOP_REQUESTS, GET_WORKSHOP_REQUEST, UPDATE_WORKSHOP_REQUEST, GET_AVAILABLE_SLOTS };
