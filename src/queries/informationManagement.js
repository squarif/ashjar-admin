const { gql } = require("@apollo/client");

const GET_INFO = gql`
    query Query {
        informationManagementAll {
            _id
            termsAndConditions
            termsAndConditionsArabic
            cancellationPolicy
            cancellationPolicyArabic
            aboutAshjarSpace
            aboutAshjarSpaceArabic
            landingPage {
                pictures
                landingText
                landingTextArabic
            }
        }
    }
`;

const EDIT_INFO = gql`
    mutation Mutation($input: InformationManagementUpdateInput!) {
        updateInformationManagement(input: $input) {
            _id
            termsAndConditions
            termsAndConditionsArabic
            cancellationPolicy
            cancellationPolicyArabic
            aboutAshjarSpace
            aboutAshjarSpaceArabic
            landingPage {
                pictures
                landingText
                landingTextArabic
            }
        }
    }
`;

export { GET_INFO, EDIT_INFO };
