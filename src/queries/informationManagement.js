const { gql } = require("@apollo/client");

const GET_INFO = gql`
    query Query {
        informationManagementAll {
            _id
            termsAndConditions
            cancellationPolicy
            aboutAshjarSpace
            landingPage {
                pictures
                landingText
            }
        }
    }
`;

const EDIT_INFO = gql`
    mutation Mutation($input: InformationManagementUpdateInput!) {
        updateInformationManagement(input: $input) {
            _id
            termsAndConditions
            cancellationPolicy
            aboutAshjarSpace
            landingPage {
                pictures
                landingText
            }
        }
    }
`;

export { GET_INFO, EDIT_INFO };
