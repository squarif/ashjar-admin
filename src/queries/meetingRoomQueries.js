// src/queries.js
import { gql } from "@apollo/client";

const CREATE_MEETING_ROOM = gql`
    mutation Mutation($input: MeetingRoomInput!) {
        createMeetingRoom(input: $input) {
            _id
            name
            nameArabic
            description
            descriptionArabic
            branch {
                _id
            }
            openDays {
                day
                startTime
                endTime
            }
            closeDays {
                startDate
                endDate
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
            ratesPerHour
            customRates {
                startDate
                endDate
                rate
            }
            amenities {
                name
                nameArabic
                picture
                quantity
                type
            }
        }
    }
`;

// {
//   "input": {
//     "name": "testing new from explorer",
//     "description": "adbc",
//     "branch": "653ea1e786a2ec0021e0c4a6",
//     "openDays": [
//       {
//         "day": "",
//         "startTime": "",
//         "endTime": ""
//       }
//     ],
//     "totalSeats": 69,
//     "ratesPerHour": 269,
//     "customRates": [
//       {
//         "startDate": "",
//         "endDate": "",
//         "rate": 230.0
//       }
//     ],
//     "amenities": [
//       {
//         "name": "coffee",
//         "picture": "coffee.jpg",
//         "quantity": 4,
//         "toggle": false
//       }
//     ],
//     "bookings": null
//   }
// }

const GET_MEETING_ROOM = gql`
    query Query($id: ID!) {
        MeetingRoom(_id: $id) {
            _id
            name
            priority
            nameArabic
            description
            descriptionArabic
            branch {
                _id
                name
                location
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
            closeDays {
                startDate
                endDate
                startTime
                endTime
            }
            slotsBooked {
                date
                slotsInDay {
                    startTime
                    endTime
                    isBooked
                    bookedBy
                    ratePerHour
                }
            }
            totalSeats
            ratesPerHour
            customRates {
                startDate
                endDate
                rate
            }
            amenities {
                name
                nameArabic
                picture
                quantity
                type
            }
            pictures
        }
    }
`;

const EDIT_MEETING_ROOM = gql`
    mutation Mutation($input: MeetingRoomUpdateInput!) {
        updateMeetingRoom(input: $input) {
            _id
            name
            nameArabic
            description
            descriptionArabic
            priority
            branch {
                _id
                name
                location
            }
            openDays {
                day
                startTime
                endTime
            }
            closeDays {
                startDate
                endDate
                startTime
                endTime
            }
            customOpenHours {
                startDate
                endDate
                startTime
                endTime
            }
            slotsBooked {
                date
                slotsInDay {
                    startTime
                    endTime
                    isBooked
                    bookedBy
                    ratePerHour
                }
            }
            totalSeats
            ratesPerHour
            customRates {
                startDate
                endDate
                rate
            }
            amenities {
                name
                nameArabic
                picture
                quantity
                type
            }
            pictures
        }
    }
`;

const REMOVE_MEETING_ROOM = gql`
    mutation RemoveMeetingRoom($input: MeetingRoomRemoval!) {
        removeMeetingRoom(input: $input) {
            _id
            name
            description
            isArchived
            branch {
                _id
                name
                location
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
            slotsBooked {
                date
                slotsInDay {
                    startTime
                    endTime
                    isBooked
                    bookedBy
                    ratePerHour
                }
            }
            totalSeats
            ratesPerHour
            customRates {
                startDate
                endDate
                rate
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

export { CREATE_MEETING_ROOM, GET_MEETING_ROOM, EDIT_MEETING_ROOM, REMOVE_MEETING_ROOM };
