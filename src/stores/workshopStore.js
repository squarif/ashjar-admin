import { atom, selector } from "recoil";

const workshopRequestPayload = atom({
    key: "workshopRequestPayload",
    default: {
        description: "",
        allowSeparateBooking: false,
    },
});

const workshopBookingsPayload = atom({
    key: "workshopBookingsPayload",
    default: [],
});

const workspaceBookingsPayload = atom({
    key: "workspaceBookings",
    default: [],
});

const nurseryBookingsPayload = atom({
    key: "nurseryBookings",
    default: [],
});

export const totalBookingsSelector = selector({
    key: "totalSeatsSelector",
    get: ({ get }) => {
        const bookings = get(workshopBookingsPayload); // Replace 'bookingsAtom' with your atom holding the bookings array

        console.log(bookings);

        const totalSeats = bookings.reduce((total, booking) => {
            const nurserySeats = booking.nurseryBookings.reduce((nurseryTotal, nursery) => {
                return nurseryTotal + nursery.seats;
            }, 0);

            const workspaceSeats = booking.workspaceBookings.reduce((workspaceTotal, workspace) => {
                return workspaceTotal + workspace.seats;
            }, 0);

            return total + nurserySeats + workspaceSeats;
        }, 0);

        return totalSeats;
    },
});

const workshopAmenities = atom({
    key: "workshopAmenities",
    default: [],
});

const workshopCategories = atom({
    key: "workshopCategories",
    default: [],
});

const workshopAvailableSlots = atom({
    key: "workshopAvailableSlots",
    default: [],
});

const workshopSelectedBranch = atom({
    key: "workshopSelectedBranch",
    default: [],
});

export {
    workshopAmenities,
    workshopBookingsPayload,
    workspaceBookingsPayload,
    nurseryBookingsPayload,
    workshopRequestPayload,
    workshopCategories,
    workshopAvailableSlots,
    workshopSelectedBranch,
};
