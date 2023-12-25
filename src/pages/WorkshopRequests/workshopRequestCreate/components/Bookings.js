import { useEffect, useState } from "react";

import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";

import { useRecoilState, useRecoilValue } from "recoil";
import {
    nurseryBookingsPayload,
    totalBookingsSelector,
    workshopAvailableSlots,
    workshopBookingsPayload,
    workshopRequestPayload,
    workshopSelectedBranch,
    workspaceBookingsPayload,
} from "../../../../stores/workshopStore";
import Loader from "../../../../components/Loader";

// import { useQuery } from "@apollo/client";
// import { GET_BRANCHES } from "./queries";

function BookingRow(props) {
    const [workshopBookings, setWorkshopBookings] = useRecoilState(workshopBookingsPayload);
    const [nurseryBookings, setNurseryBookings] = useState({});
    const [workspaceBookings, setWorkspaceBookings] = useState({});
    const totalBookings = useRecoilValue(totalBookingsSelector);
    const [requestPayload, setWorkShopRequestPayload] = useRecoilState(workshopRequestPayload);

    const [selectedSeats, setSelectedSeats] = useState(0);

    let data = props.data;
    let seatsRemaining = props.seatsRemaining;
    let type = props.type;
    let selectedBookingsIndex = props.selectedAvailableSlotsIndex;
    let index = props.index;

    function decreaseSelectedSeats(id) {
        if (selectedSeats > 0 && parseInt(requestPayload.seats) <= totalBookings) {
            setSelectedSeats((prevSeats) => prevSeats - 1);

            if (type === "nursery") {
                setNurseryBookings((prevBookings) => {
                    const updatedBookings = { ...prevBookings };
                    if (updatedBookings[id]) {
                        const updatedSeats = updatedBookings[id].seats - 1;
                        if (updatedSeats <= 0) {
                            delete updatedBookings[id];
                        } else {
                            updatedBookings[id] = { ...updatedBookings[id], seats: updatedSeats };
                        }
                    }
                    return updatedBookings;
                });
            } else {
                setWorkspaceBookings((prevBookings) => {
                    const updatedBookings = { ...prevBookings };
                    if (updatedBookings[id]) {
                        const updatedSeats = updatedBookings[id].seats - 1;
                        if (updatedSeats <= 0) {
                            delete updatedBookings[id];
                        } else {
                            updatedBookings[id] = { ...updatedBookings[id], seats: updatedSeats };
                        }
                    }
                    return updatedBookings;
                });
            }
        } else {
            console.log("Seat count cannot be less than 0.");
        }
    }

    function increaseSelectedSeats(id) {
        setSelectedSeats((prevSeats) => prevSeats + 1);

        if (type === "nursery") {
            setNurseryBookings((prevBookings) => ({
                ...prevBookings,
                [id]: { nursery: id, seats: prevBookings[id] ? prevBookings[id].seats + 1 : 1 },
            }));
        } else {
            setWorkspaceBookings((prevBookings) => ({
                ...prevBookings,
                [id]: { workspace: id, seats: prevBookings[id] ? prevBookings[id].seats + 1 : 1 },
            }));
        }
    }

    useEffect(() => {
        setWorkshopBookingsPayload();
    }, [nurseryBookings, workspaceBookings]);

    function setWorkshopBookingsPayload() {
        const updatedBookings = JSON.parse(JSON.stringify(workshopBookings));

        if (updatedBookings[selectedBookingsIndex]) {
            const bookingsToAdd = Object.values(type === "nursery" ? nurseryBookings : workspaceBookings);

            if (type === "nursery") {
                if (updatedBookings[selectedBookingsIndex].nurseryBookings[index])
                    updatedBookings[selectedBookingsIndex].nurseryBookings[index] = bookingsToAdd[0];
                else updatedBookings[selectedBookingsIndex].nurseryBookings.push(...bookingsToAdd);
            } else {
                if (updatedBookings[selectedBookingsIndex].workspaceBookings[index])
                    updatedBookings[selectedBookingsIndex].workspaceBookings[index] = bookingsToAdd[0];
                else updatedBookings[selectedBookingsIndex].workspaceBookings.push(...bookingsToAdd);
            }

            setWorkshopBookings(updatedBookings);
        }
    }

    return (
        <Tr>
            <Td>{data[type].name}</Td>
            <Td>{type} </Td>
            <Td>{seatsRemaining}</Td>
            <Td>
                <div className="w-[112px] rounded-lg justify-center items-center gap-2 flex">
                    <button
                        className="w-4 h-4 p-2 rounded-full border border-error flex justify-center items-center gap-2.5"
                        onClick={() => decreaseSelectedSeats(data[type]._id)}>
                        <div className="text-center text-error text-2xl font-normal  leading-[18px]">-</div>
                    </button>
                    <div className="py-1 px-2">
                        <div className="text-center text-dark text-2xl font-normal leading-[18px]">
                            {selectedSeats}
                        </div>
                    </div>
                    <button
                        className="w-4 h-4 p-2 rounded-full border border-primary flex justify-center items-center gap-2.5"
                        onClick={() => increaseSelectedSeats(data[type]._id)}>
                        <div className="text-center text-primary text-2xl font-normal  leading-[18px]">+</div>
                    </button>
                </div>
            </Td>
        </Tr>
    );
}

function Bookings(props) {
    const requestPayload = useRecoilValue(workshopRequestPayload);
    const selectedBranch = useRecoilValue(workshopSelectedBranch);
    const workshopBookings = useRecoilValue(workshopBookingsPayload);

    let selectedAvailableSlotsIndex = props.selectedAvailableSlotsIndex;
    let index = props.index;

    let availableSlots = props.availableSlots;

    function getBookingsCount() {
        const bookings = workshopBookings;
        let totalSeats = 0;

        if (bookings[selectedAvailableSlotsIndex]) {
            const nurserySeats = bookings[selectedAvailableSlotsIndex].nurseryBookings.reduce(
                (total, current) => total + current.seats,
                0
            );
            const workspaceSeats = bookings[selectedAvailableSlotsIndex].workspaceBookings.reduce(
                (total, current) => total + current.seats,
                0
            );

            totalSeats += nurserySeats + workspaceSeats;

            return totalSeats;
        } else {
            return 0;
        }
    }

    return (
        <div className={selectedAvailableSlotsIndex === index ? "block" : "hidden"}>
            {index}
            <div className="flex flex-col gap-7 w-full">
                <div className="flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <div className="text-left text-xl">Available spaces in {selectedBranch.name}</div>

                        <div className="flex gap-6 items-center">
                            <div className="">Seats Allocated :</div>
                            <div className="py-3 px-4 rounded-xl bg-primaryLight text-lg  leading-normal">
                                {getBookingsCount()} out of {requestPayload.seats}
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-xl">
                        <TableContainer className="w-full">
                            <Table variant="simple">
                                <Thead className="h-[60px]">
                                    <Tr>
                                        <Th>Space Name</Th>
                                        <Th>Type</Th>
                                        <Th>Available Capacity</Th>
                                        <Th>Seats</Th>
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {availableSlots.nurseries?.map((nursery, index) => (
                                        <BookingRow
                                            data={nursery}
                                            key={index}
                                            selectedAvailableSlotsIndex={selectedAvailableSlotsIndex}
                                            seatsRemaining={nursery.seatsRemaining}
                                            type="nursery"
                                            index={index}
                                        />
                                    ))}
                                    {availableSlots.workspaces?.map((workspace, index) => (
                                        <BookingRow
                                            data={workspace}
                                            key={index}
                                            selectedAvailableSlotsIndex={selectedAvailableSlotsIndex}
                                            seatsRemaining={workspace.seatsRemaining}
                                            type="workspace"
                                            index={index}
                                        />
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bookings;
