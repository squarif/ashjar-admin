import { atom } from "recoil";

// "meetingRooms": [
// 	"6542b0fd839cde2fec295cdb",
// 	"6542b181325ab200f481a530",
// 	"6542b183325ab200f481a537",
// 	"6542b185325ab200f481a53e",
// 	"6542b1c3325ab200f481a545",
// 	"6542b2a6325ab200f481a54c",
// 	"6542b306ac45194614cc9658",
// 	"6542b37da3bddd2d2c66f700",
// 	"6542b428b2b9c83418c837ec"
// ],

const newMeetingRoomRequest = atom({
    key: "newMeetingRoomRequest",
    default: {
        name: "Meetin Room testing integration",
        description:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ..",
        branch: "653e5f0d86a2ec0021e0c4a1",
        openDays: [],
        totalSeats: 699,
        ratesPerHour: 269,
        customRates: [],
        amenities: [],
    },
});

const editMeetingRoomRequest = atom({
    key: "editMeetingRoomRequest",
    default: {
        // _id: "6542b0fd839cde2fec295cdb",
        // name: "Quetta Meeting Room",
        // description: "Meeting Room",
        // branch: "6542ae4484b2a011887157e7",
        // openDays: [
        //     {
        //         day: "Monday",
        //         startTime: "09:00 AM",
        //         endTime: "09:00 PM",
        //     },
        //     {
        //         day: "Tuesday",
        //         startTime: "09:00 AM",
        //         endTime: "09:00 PM",
        //     },
        // ],
        // totalSeats: 25,
        // ratesPerHour: 10,
        // customRates: [
        //     {
        //         startDate: "1699124400000",
        //         endDate: "1699210800000",
        //         rate: 15,
        //     },
        // ],
        // amenities: [
        //     {
        //         name: "Coffee",
        //         picture: "Link to picture",
        //         quantity: 25,
        //         type: "quantity",
        //     },
        // ],
        // pictures: [],
    },
});

const meetingRoomOpenDaysState = atom({
    key: "openDays",
    default: [
        // {
        //     day: "Monday",
        //     startTime: "03:24",
        //     endTime: "18:24",
        // },
        // {
        //     day: "Tuesday",
        //     startTime: "03:25",
        //     endTime: "05:24",
        // },
        // {
        //     day: "Wednesday",
        //     startTime: "03:28",
        //     endTime: "06:24",
        // },
        // {
        //     day: "Thursday",
        //     startTime: "03:22",
        //     endTime: "08:24",
        // },
        // {
        //     day: "Friday",
        //     startTime: "03:24",
        //     endTime: "09:24",
        // },
        // {
        //     day: "Saturday",
        //     startTime: "02:21",
        //     endTime: "06:24",
        // },
        // {
        //     day: "Sunday",
        //     startTime: "06:18",
        //     endTime: "07:24",
        // },
    ],
});

const meetingRoomRatesState = atom({
    key: "meetingRoomRatesState",
    default: [],
});

const meetingRoomAmenitiesState = atom({
    key: "meetingRoomAmenitiesState",
    default: [
        {
            picture: "Nursery 99.svg",
            name: "Nursery",
            quantity: 5,
            type: "quantity",
        },
        {
            picture: "Nursery 2.svg",
            name: "Workspace",
            quantity: 46,
            type: "quantity",
        },
        {
            picture: "Nursery 3.svg",
            name: "Meeting Room",
            quantity: 1,
            type: "toggle",
        },
    ],
});

const meetingRoomPicturesState = atom({
    key: "meetingRoomPicturesState",
    default: [
        "https://images.inc.com/uploaded_files/image/1920x1080/getty_517610514_353435.jpg",
        "https://images.inc.com/uploaded_files/image/1920x1080/getty_517610514_353435.jpg",
        "https://images.inc.com/uploaded_files/image/1920x1080/getty_517610514_353435.jpg",
    ],
});

export {
    newMeetingRoomRequest,
    meetingRoomOpenDaysState,
    meetingRoomRatesState,
    meetingRoomAmenitiesState,
    editMeetingRoomRequest,
    meetingRoomPicturesState,
};
