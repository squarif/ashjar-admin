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
            }
            workspaceBookings {
                _id
            }
            meetingRoomBookings {
                _id
            }
            cancelledMeetingRoomBookings {
                _id
            }
            cancelledWorkshopBookings {
                _id
            }
            cancelledWorkspaceBookings {
                _id
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
