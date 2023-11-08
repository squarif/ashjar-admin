import { atom } from "recoil";

const workshopRequestPayload = atom({
    key: "workshopRequestPayload",
    default: {
        name: "Pottery Class",
        description:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ..",
        branch: null,
        approvalStatus: null,
        category: [],
        pictures: null,
        rejectionReason: null,
        timing: null,
        amenities: ["Coffee", "Tea", "Balaclava"],
        seats: 69,
        allowSeparateBooking: false,
        numberOfDays: 200,
        workspace: [],
        nursery: [],
        meetingRooms: [],
        spacesData: null,
    },
});

const workShopAmenities = atom({
    key: "workShopAmenities",
    default: ["Coffee", "Tea", "Balaclava"],
});

export { workShopAmenities, workshopRequestPayload };
