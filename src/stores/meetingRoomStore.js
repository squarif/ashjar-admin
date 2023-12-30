import { atom } from "recoil";

export const newMeetingRoomRequest = atom({
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

export const editMeetingRoomRequest = atom({
    key: "editMeetingRoomRequest",
    default: {},
});

export const meetingRoomOpenDaysState = atom({
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

export const meetingRoomCustomOpenHoursState = atom({
    key: "meetingRoomCustomOpenHoursState",
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

export const meetingRoomRatesState = atom({
    key: "meetingRoomRatesState",
    default: [],
});

export const meetingRoomAmenitiesState = atom({
    key: "meetingRoomAmenitiesState",
    default: [],
});

export const meetingRoomPicturesState = atom({
    key: "meetingRoomPicturesState",
    default: [],
});
