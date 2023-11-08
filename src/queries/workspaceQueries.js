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
            slotsInterval
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
                meetingRooms
                workspaces
            }
            openDays {
                day
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

const EDIT_WORKSPACE = gql`
    mutation Mutation($input: WorkSpaceUpdateInput!) {
        updateWorkSpace(input: $input) {
            _id
            name
            description
            openDays {
                day
                startTime
                endTime
            }
            totalSeats
            ratesPerHour
            amenities {
                name
                picture
                quantity
                type
            }
            pictures
            customRates {
                startDate
                endDate
                rate
            }
        }
    }
`;

export { CREATE_WORKSPACE, GET_WORKSPACE, EDIT_WORKSPACE };

// {
//   "input": {
//     "name": "workspace testing integration",
//     "description": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ..",
//     "branch": "65460363e298d923e036b2ff",
//     "openDays": [
//       {
//         "day": "Monday",
//         "startTime": "03:24",
//         "endTime": "18:24"
//       },
//       {
//         "day": "Tuesday",
//         "startTime": "03:25",
//         "endTime": "05:24"
//       },
//       {
//         "day": "Wednesday",
//         "startTime": "03:28",
//         "endTime": "06:24"
//       },
//       {
//         "day": "Thursday",
//         "startTime": "03:22",
//         "endTime": "08:24"
//       },
//       {
//         "day": "Friday",
//         "startTime": "03:24",
//         "endTime": "09:24"
//       },
//       {
//         "day": "Saturday",
//         "startTime": "02:21",
//         "endTime": "06:24"
//       },
//       {
//         "day": "Sunday",
//         "startTime": "06:18",
//         "endTime": "07:24"
//       }
//     ],
//     "totalSeats": 699,
//     "ratesPerHour": 269,
//     "customRates": [
//       {
//         "startDate": "Dec 12 2023",
//         "endDate": "Dec 23 2023",
//         "rate": 230
//       },
//       {
//         "startDate": "Mar 12 2023",
//         "endDate": "April 23 2023",
//         "rate": 230
//       },
//       {
//         "startDate": "May 12 2023",
//         "endDate": "June 23 2023",
//         "rate": 230
//       },
//       {
//         "startDate": "July 12 2023",
//         "endDate": "August 23 2023",
//         "rate": 230
//       }
//     ],
//     "amenities": [
//       {
//         "picture": "Nursery 69.svg",
//         "name": "Nursery",
//         "quantity": 5,
//         "type": "quantity"
//       },
//       {
//         "picture": "Nursery 2.svg",
//         "name": "Workspace",
//         "quantity": 46,
//         "type": "quantity"
//       },
//       {
//         "picture": "Nursery 3.svg",
//         "name": "Meeting Room",
//         "quantity": 1,
//         "type": "toggle"
//       }
//     ],
//     "pictures": ["https://officesnapshots.com/wp-content/uploads/2020/06/google-shorebird-campus-mountain-view-2-700x451.jpg"

//     ],
//     "slotsInterval": 0
//   }
// }
