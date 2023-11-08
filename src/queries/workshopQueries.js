import { gql } from "@apollo/client";

const GET_WORKSHOP_REQUESTS = gql`
    query WorkSpaces {
        workshopRequests {
            _id
            name
            timing {
                date
                startTime
                endTime
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
            branch {
                name
                location
                _id
            }
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
