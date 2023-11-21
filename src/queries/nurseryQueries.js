import { gql } from "@apollo/client";

const GET_NURSERY = gql`
    query Users($id: ID!) {
        nursery(_id: $id) {
            _id
            name
            seats
            priceRatePerHour
            branch {
                name
                location
                _id
            }
            workshops {
                _id
                name
                timing {
                    date
                    startTime
                    endTime
                }
                workspace {
                    name
                    _id
                }
                description
                categories
                approvalStatus
                draft
                rejectionReason
                nursery {
                    name
                    _id
                }
            }
        }
    }
`;

const CREATE_NURSERY = gql`
    mutation Mutation($input: NurseryInput!) {
        createNursery(input: $input) {
            _id
            name
            seats
            priceRatePerHour
        }
    }
`;

const EDIT_NURSERY = gql`
    mutation Mutation($input: NurseryUpdateInput!) {
        updateNursery(input: $input) {
            _id
            name
            seats
            priceRatePerHour
            branch {
                _id
            }
        }
    }
`;

export { GET_NURSERY, CREATE_NURSERY, EDIT_NURSERY };
