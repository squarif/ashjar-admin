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
            branch {
                _id
                name
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

const GET_WORKSHOP_REQUEST = gql`
    query WorkSpaces($id: ID!) {
        workshopRequest(_id: $id) {
            _id
            name
            timing {
                date
                startTime
                endTime
            }
            branch {
                _id
                name
                location
                meetingRooms
                workspaces
            }
            nursery {
                _id
                name
            }
            workspace {
                _id
                name
            }
            description
            categories
            approvalStatus
            draft
            rejectionReason
        }
    }
`;

export { GET_WORKSHOP_REQUESTS, GET_WORKSHOP_REQUEST };
