const { gql } = require("@apollo/client");

const GET_COUPONS = gql`
    query Coupons {
        coupons {
            _id
            couponCode
            discountPercentage
            discountAmount
            startingDate
            expiryDate
            isActive
            createdAt
            numberOfUsers
            type
        }
    }
`;

const CREATE_COUPON = gql`
    mutation CreateCoupon($input: CreateCouponInput!) {
        createCoupon(input: $input) {
            _id
            couponCode
            discountPercentage
            expiryDate
            isActive
            createdAt
            numberOfUsers
            type
        }
    }
`;

const EDIT_COUPON = gql`
    mutation UpdateCoupon($input: updateCouponInput!) {
        updateCoupon(input: $input) {
            _id
            couponCode
            discountPercentage
            expiryDate
            isActive
            createdAt
            numberOfUsers
            type
            startingDate
            discountAmount
        }
    }
`;

export { GET_COUPONS, CREATE_COUPON, EDIT_COUPON };
