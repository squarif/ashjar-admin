import { gql } from "@apollo/client";

const CREATE_WORKSPACE = gql`
    mutation Mutation($input: WorkSpaceInput!) {
        createWorkSpace(input: $input) {
            _id
            name
            description
            branch {
                _id
            }
            openDays {
                day
                startTime
                endTime
            }
            customOpenHours {
                startDate
                endDate
                startTime
                endTime
            }
            totalSeats
            baseRates {
                startTime
                endTime
                rate
            }
            customRates {
                startDate
                endDate
                ratesInSlot {
                    startTime
                    endTime
                    rate
                }
            }
            amenities {
                name
                picture
                quantity
                type
            }
            pictures
        }
    }
`;

const GET_WORKSPACE = gql`
    query Query($id: ID!) {
        WorkSpace(_id: $id) {
            _id
            name
            description
            branch {
                _id
                name
                location
                address
            }
            openDays {
                day
                startTime
                endTime
            }
            customOpenHours {
                startDate
                endDate
                startTime
                endTime
            }
            slotsInterval
            slotsBooked {
                date
                slotsInDay {
                    startTime
                    endTime
                    isBooked
                    bookings {
                        bookedBy
                        seatsBooked
                    }
                    seatsRemaining
                    rate
                }
            }
            totalSeats
            ratePerInterval
            baseRates {
                startTime
                endTime
                rate
            }
            customRates {
                startDate
                endDate
                ratesInSlot {
                    startTime
                    endTime
                    rate
                }
            }
            amenities {
                name
                picture
                quantity
                type
            }
            pictures
        }
    }
`;

const EDIT_WORKSPACE = gql`
    mutation UpdateWorkSpace($input: WorkSpaceUpdateInput!) {
        updateWorkSpace(input: $input) {
            _id
            name
            description
            branch {
                _id
                name
                location
                address
            }
            openDays {
                day
                startTime
                endTime
            }
            customOpenHours {
                startDate
                endDate
                startTime
                endTime
            }
            totalSeats
            baseRates {
                startTime
                endTime
                rate
            }
            customRates {
                startDate
                endDate
                ratesInSlot {
                    startTime
                    endTime
                    rate
                }
            }
            amenities {
                name
                picture
                quantity
                type
            }
            pictures
        }
    }
`;

export { CREATE_WORKSPACE, GET_WORKSPACE, EDIT_WORKSPACE };
