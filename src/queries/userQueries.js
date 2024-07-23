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
            workshopBookings {
                _id
                date
            }
            workspaceBookings {
                _id
                date
            }
            meetingRoomBookings {
                _id
                date
            }
            cancelledMeetingRoomBookings {
                _id
                date
            }
            cancelledWorkshopBookings {
                _id
                date
            }
            cancelledWorkspaceBookings {
                _id
                date
            }
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
