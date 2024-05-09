import { gql } from "@apollo/client";

export const GET_WORKSHOP_REQUESTS = gql`
    query Query {
        workshopRequests {
            _id
            name
            pricePerSeat
            seats
            pictures
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
            bookingByCustomers {
                date
                userId {
                    _id
                    name
                }
                noOfSeats
                _id
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
            separateBooking
            rejectionReason
            username
            email
            phone
            company
            socialMediaAccount
            gender
            comments
        }
    }
`;

export const GET_WORKSHOP_REQUEST = gql`
    query WorkshopRequest($id: ID!) {
        workshopRequest(_id: $id) {
            _id
            name
            pricePerSeat
            seats
            pictures
            bookingByCustomers {
                _id
                userId {
                    _id
                    name
                }
            }
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
            bookingByCustomers {
                date
                userId {
                    name
                }
                noOfSeats
                _id
            }
            branch {
                _id
                name
                location
                address
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
            separateBooking
            remainingSeats {
                date
                remainingNumberOfSeats
            }
            rejectionReason
            username
            email
            phone
            company
            socialMediaAccount
            gender
            ageGroup {
                min
                max
            }
            comments
        }
    }
`;

export const UPDATE_WORKSHOP_REQUEST = gql`
    mutation Mutation($input: WorkshopRequestUpdateByAdminInput!) {
        updateWorkshopRequestByAdmin(input: $input) {
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
                name
                _id
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

export const GET_AVAILABLE_SLOTS = gql`
    query GetBranchWithWorkspacesAndNurseries(
        $branchId: ID!
        $date: String!
        $startTime: String!
        $endTime: String!
    ) {
        getBranchWithWorkspacesAndNurseries(
            branchId: $branchId
            date: $date
            startTime: $startTime
            endTime: $endTime
        ) {
            workspaces {
                workspace {
                    _id
                    name
                }
                seatsRemaining
            }
            nurseries {
                nursery {
                    _id
                    name
                }
                seatsRemaining
            }
        }
    }
`;

export const ACCEPT_WORKSHOP_REQUEST = gql`
    mutation AcceptWorkshopRequest($input: WorkshopRequestStatusUpdate!) {
        acceptWorkshopRequest(input: $input) {
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
            bookingByCustomers {
                date
                userId {
                    _id
                    name
                    phoneNumber
                    password
                    email
                    role
                    gender
                    age
                    createdAt
                    isBlocked
                    tapTokenId
                    numberOfBookings
                    meetingRoomBookings {
                        meetingRoomId
                        meetingRoomObjectId
                        bookingSchemaId
                        rates
                        seats
                        date
                        startTime
                        endTime
                        _id
                        couponCode
                        discountedPrice
                        chargeId
                    }
                    workspaceBookings {
                        workspaceId
                        workspaceObjectId
                        bookingSchemaId
                        rates
                        seats
                        date
                        startTime
                        endTime
                        _id
                        couponCode
                        discountedPrice
                        chargeId
                    }
                    workshopBookings {
                        workshopId
                        bookingSchemaId
                        workshopObjectId
                        rates
                        seats
                        date
                        startTime
                        endTime
                        _id
                        couponCode
                        discountedPrice
                        chargeId
                    }
                    cancelledMeetingRoomBookings {
                        meetingRoomId
                        meetingRoomObjectId
                        bookingSchemaId
                        rates
                        seats
                        date
                        startTime
                        endTime
                        _id
                        couponCode
                        discountedPrice
                        chargeId
                    }
                    cancelledWorkspaceBookings {
                        workspaceId
                        workspaceObjectId
                        bookingSchemaId
                        rates
                        seats
                        date
                        startTime
                        endTime
                        _id
                        couponCode
                        discountedPrice
                        chargeId
                    }
                    cancelledWorkshopBookings {
                        workshopId
                        bookingSchemaId
                        workshopObjectId
                        rates
                        seats
                        date
                        startTime
                        endTime
                        _id
                        couponCode
                        discountedPrice
                        chargeId
                    }
                }
                noOfSeats
                _id
                discountedPrice
                couponCode
                chargeId
            }
            branch {
                _id
                name
                location
                address
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
            separateBooking
            remainingSeats {
                date
                remainingNumberOfSeats
            }
            rejectionReason
            username
            email
            phone
            company
            socialMediaAccount
            gender
            ageGroup {
                min
                max
            }
            comments
        }
    }
`;

export const REJECT_WORKSHOP_REQUEST = gql`
    mutation RejectWorkshopRequest($input: WorkshopRequestStatusUpdate!) {
        rejectWorkshopRequest(input: $input) {
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
            bookingByCustomers {
                date
                userId {
                    _id
                    name
                    phoneNumber
                    password
                    email
                    role
                    gender
                    age
                    createdAt
                    isBlocked
                    tapTokenId
                    numberOfBookings
                    meetingRoomBookings {
                        meetingRoomId
                        meetingRoomObjectId
                        bookingSchemaId
                        rates
                        seats
                        date
                        startTime
                        endTime
                        _id
                        couponCode
                        discountedPrice
                        chargeId
                    }
                    workspaceBookings {
                        workspaceId
                        workspaceObjectId
                        bookingSchemaId
                        rates
                        seats
                        date
                        startTime
                        endTime
                        _id
                        couponCode
                        discountedPrice
                        chargeId
                    }
                    workshopBookings {
                        workshopId
                        bookingSchemaId
                        workshopObjectId
                        rates
                        seats
                        date
                        startTime
                        endTime
                        _id
                        couponCode
                        discountedPrice
                        chargeId
                    }
                    cancelledMeetingRoomBookings {
                        meetingRoomId
                        meetingRoomObjectId
                        bookingSchemaId
                        rates
                        seats
                        date
                        startTime
                        endTime
                        _id
                        couponCode
                        discountedPrice
                        chargeId
                    }
                    cancelledWorkspaceBookings {
                        workspaceId
                        workspaceObjectId
                        bookingSchemaId
                        rates
                        seats
                        date
                        startTime
                        endTime
                        _id
                        couponCode
                        discountedPrice
                        chargeId
                    }
                    cancelledWorkshopBookings {
                        workshopId
                        bookingSchemaId
                        workshopObjectId
                        rates
                        seats
                        date
                        startTime
                        endTime
                        _id
                        couponCode
                        discountedPrice
                        chargeId
                    }
                }
                noOfSeats
                _id
                discountedPrice
                couponCode
                chargeId
            }
            branch {
                _id
                name
                location
                address
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
            separateBooking
            remainingSeats {
                date
                remainingNumberOfSeats
            }
            rejectionReason
            username
            email
            phone
            company
            socialMediaAccount
            gender
            ageGroup {
                min
                max
            }
            comments
        }
    }
`;
