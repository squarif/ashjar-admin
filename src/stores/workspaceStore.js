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

// workspaces:654779151acccb002b94051f
// 654779571acccb002b94052f

const newWorkspaceRequest = atom({
    key: "newWorkspaceRequest",
    default: {
        name: "",
        description: "",
        branch: "",
        totalSeats: 0,
        slotsInterval: 0,
        ratePerInterval: 0,
    },
});

const editWorkspaceRequest = atom({
    key: "editWorkspaceRequest",
    default: {
        //     _id: "6542b0fd839cde2fec295cdb",
        //     name: "Quetta Workspace",
        //     description: "Workspace descriptionsssss",
        //     branch: "6542ae4484b2a011887157e7",
        //     openDays: [
        //         {
        //             day: "Monday",
        //             startTime: "09:00 AM",
        //             endTime: "09:00 PM",
        //         },
        //         {
        //             day: "Tuesday",
        //             startTime: "09:00 AM",
        //             endTime: "09:00 PM",
        //         },
        //     ],
        //     totalSeats: 25,
        //     ratesPerHour: 10,
        //     customRates: [
        //         {
        //             startDate: "1699124400000",
        //             endDate: "1699210800000",
        //             rate: 15,
        //         },
        //     ],
        //     amenities: [
        //         {
        //             name: "Coffee",
        //             picture: "Link to picture",
        //             quantity: 25,
        //             type: "quantity",
        //         },
        //     ],
        //     pictures: [],
    },
});

const workspaceOpenDaysState = atom({
    key: "workspaceOpenDaysState",
    default: [
        {
            day: "Monday",
            startTime: "",
            endTime: "",
        },
        {
            day: "Tuesday",
            startTime: "",
            endTime: "",
        },
        {
            day: "Wednesday",
            startTime: "",
            endTime: "",
        },
        {
            day: "Thursday",
            startTime: "",
            endTime: "",
        },
        {
            day: "Friday",
            startTime: "",
            endTime: "",
        },
        {
            day: "Saturday",
            startTime: "",
            endTime: "",
        },
        {
            day: "Sunday",
            startTime: "",
            endTime: "",
        },
    ],
});

const workspaceBaseRatesState = atom({
    key: "workspaceBaseRatesState",
    default: [
        // {
        //     startTime: "11:00",
        //     endTime: "04:00",
        //     rate: 230,
        // },
        // {
        //     startTime: "11:00",
        //     endTime: "04:00",
        //     rate: 230,
        // },
        // {
        //     startTime: "11:00",
        //     endTime: "04:00",
        //     rate: 230,
        // },
        // {
        //     startTime: "11:00",
        //     endTime: "04:00",
        //     rate: 230,
        // },
    ],
});

const workspaceCustomRatesState = atom({
    key: "workspaceCustomRatesState",
    default: [
        // {
        //     startDate: "2023-07-22",
        //     endDate: "2023-07-28",
        //     ratesInSlot: [
        //         {
        //             startTime: "11:00",
        //             endTime: "04:00",
        //             rate: 230,
        //         },
        //         {
        //             startTime: "11:00",
        //             endTime: "04:00",
        //             rate: 230,
        //         },
        //         {
        //             startTime: "11:00",
        //             endTime: "04:00",
        //             rate: 230,
        //         },
        //         {
        //             startTime: "11:00",
        //             endTime: "04:00",
        //             rate: 230,
        //         },
        //     ],
        // },
        // {
        //     startDate: "2023-07-22",
        //     endDate: "2023-08-01",
        //     ratesInSlot: [
        //         {
        //             startTime: "11:00",
        //             endTime: "07:00",
        //             rate: 230,
        //         },
        //         {
        //             startTime: "11:00",
        //             endTime: "07:00",
        //             rate: 230,
        //         },
        //         {
        //             startTime: "11:00",
        //             endTime: "07:00",
        //             rate: 230,
        //         },
        //         {
        //             startTime: "11:00",
        //             endTime: "07:00",
        //             rate: 230,
        //         },
        //     ],
        // },
    ],
});

const workspaceAmenitiesState = atom({
    key: "workspaceAmenitiesState",
    default: [],
});

const workspacePicturesState = atom({
    key: "workspacePicturesState",
    default: [
        // "https://images.inc.com/uploaded_files/image/1920x1080/getty_517610514_353435.jpg",
        // "https://images.inc.com/uploaded_files/image/1920x1080/getty_517610514_353435.jpg",
        // "https://images.inc.com/uploaded_files/image/1920x1080/getty_517610514_353435.jpg",
    ],
});

export {
    newWorkspaceRequest,
    editWorkspaceRequest,
    workspaceOpenDaysState,
    workspaceBaseRatesState,
    workspaceCustomRatesState,
    workspaceAmenitiesState,
    workspacePicturesState,
};
