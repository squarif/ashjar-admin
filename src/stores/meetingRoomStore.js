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
        name: "",
        description: "",
        branch: "",
        openDays: [],
        totalSeats: null,
        ratesPerHour: null,
        customRates: [],
        amenities: [],
    },
});

const editMeetingRoomRequest = atom({
    key: "editMeetingRoomRequest",
    default: {},
});

const meetingRoomOpenDaysState = atom({
    key: "openDays",
    default: [
        // {
        //     day: "Monday",
        //     startTime: "09:00",
        //     endTime: "21:00",
        // },
        // {
        //     day: "Tuesday",
        //     startTime: "09:00",
        //     endTime: "21:00",
        // },
        // {
        //     day: "Wednesday",
        //     startTime: "09:00",
        //     endTime: "21:00",
        // },
        // {
        //     day: "Thursday",
        //     startTime: "09:00",
        //     endTime: "21:00",
        // },
        // {
        //     day: "Friday",
        //     startTime: "09:00",
        //     endTime: "21:00",
        // },
        // {
        //     day: "Saturday",
        //     startTime: "09:00",
        //     endTime: "21:00",
        // },
        // {
        //     day: "Sunday",
        //     startTime: "09:00",
        //     endTime: "21:00",
        // },
    ],
});

const meetingRoomRatesState = atom({
    key: "meetingRoomRatesState",
    default: [],
});

const meetingRoomAmenitiesState = atom({
    key: "meetingRoomAmenitiesState",
    default: [],
});

const meetingRoomPicturesState = atom({
    key: "meetingRoomPicturesState",
    default: [],
});

export {
    newMeetingRoomRequest,
    meetingRoomOpenDaysState,
    meetingRoomRatesState,
    meetingRoomAmenitiesState,
    editMeetingRoomRequest,
    meetingRoomPicturesState,
};
