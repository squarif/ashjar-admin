import { atom } from "recoil";

export const workshopRequestPayload = atom({
    key: "workshopRequestPayload",
    default: {
        name: "ye naam hona chahye",
        description: "ye dewciption honi chahye",
        branch: null,
        approvalStatus: null,
        category: null,
        nursery: null,
        pictures: null,
        rejectionReason: null,
        timing: null,
        workspace: null,
        amenities: null,
        seats: 69,
        allowSeparateBooking: true,
    },
});
