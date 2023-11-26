const { gql } = require("@apollo/client");

const GET_COMPLAINTS = gql`
    query Query {
        complaints {
            _id
            complaintNumber
            complaintDescription
            complaintStatus
            complaintTitle
            userDetail {
                _id
                name
                phoneNumber
                email
            }
            pictures
            complaintType
        }
    }
`;

const UPDATE_COMPLAINT = gql`
    mutation Mutation($input: ComplaintUpdateInput!) {
        updateComplaint(input: $input) {
            _id
            complaintStatus
        }
    }
`;

export { GET_COMPLAINTS, UPDATE_COMPLAINT };
