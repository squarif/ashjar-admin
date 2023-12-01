import { useEffect, useState } from "react";

import { ReactComponent as ChevronRight } from "../../../../assets/ChevronRight.svg";

import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { workshopRequestPayload } from "../../../../stores/workshopStore";

// import { useQuery } from "@apollo/client";
// import { GET_BRANCHES } from "./queries";

function Branches() {
    const [requestPayload, setWorkShopRequestPayload] = useRecoilState(workshopRequestPayload);

    const spaceRes = [
        {
            name: "Nursery 1",
            type: "nursery",
            capacity: 5,
            selectedSeats: 0,
        },
        {
            name: "Nursery 2",
            type: "workspace",
            capacity: 46,
            selectedSeats: 0,
        },
        {
            name: "Nursery 3",
            type: "meeting room",
            capacity: 68,
            selectedSeats: 0,
        },
    ];

    const [spacesData, setSpacesData] = useState(spaceRes);

    const decreaseSelectedSeats = (index, type) => {
        if (spacesData[index].selectedSeats > 0) {
            const updatedSpaces = [...spacesData];

            const updatedSpace = { ...updatedSpaces[index] };

            updatedSpace.selectedSeats -= 1;

            updatedSpaces[index] = updatedSpace;

            setSpacesData(updatedSpaces);

            setWorkShopRequestPayload((prevPayload) => ({
                ...prevPayload,
                spacesData: updatedSpaces,
            }));
        }
    };

    const increaseSelectedSeats = (index, type) => {
        if (spacesData[index].selectedSeats <= spacesData[index].capacity) {
            const updatedSpaces = [...spacesData];

            const updatedSpace = { ...updatedSpaces[index] };

            updatedSpace.selectedSeats += 1;

            updatedSpaces[index] = updatedSpace;

            setSpacesData(updatedSpaces);

            setWorkShopRequestPayload((prevPayload) => ({
                ...prevPayload,
                spacesData: updatedSpaces,
            }));
        }
    };

    return (
        <div className="flex flex-col gap-7">
            <div className="text-left text-2xl">Location</div>

            <div className="rounded-xl border  w-fit  flex justify-start">
                <Menu>
                    <MenuButton as="button">
                        <div className="flex px-3 w-[312px] py-4 items-center justify-between">
                            <span className="">Location</span>
                            <ChevronRight className="rotate-90 h-5" />
                        </div>
                    </MenuButton>
                    <MenuList className="MenuList inset-0 w-[312px] left-[-200px]">
                        <MenuItem>Download</MenuItem>
                        <MenuItem>Create a Copy</MenuItem>
                        <MenuItem>Mark as Draft</MenuItem>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>Attend a Workshop</MenuItem>
                    </MenuList>
                </Menu>
            </div>

            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <div className="text-left text-xl">Available spaces in Branch 1</div>

                    <div className="flex gap-6 items-center">
                        <div className="">Seats Allocated :</div>
                        <div className="py-3 px-4 rounded-xl bg-primaryLight text-lg  leading-normal">
                            3 out of {requestPayload.seats}
                        </div>
                    </div>
                </div>

                <div className="border rounded-xl">
                    <TableContainer>
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
                                {spacesData.map((space, index) => (
                                    <Tr key={index}>
                                        <Td>{space.name}</Td>
                                        <Td>{space.type} </Td>
                                        <Td>{space.capacity}</Td>
                                        <Td>
                                            <div className="w-[112px] rounded-lg justify-center items-center gap-2 flex">
                                                <button
                                                    className="w-4 h-4 p-2 rounded-full border border-error flex justify-center items-center gap-2.5"
                                                    onClick={() => decreaseSelectedSeats(index, space.type)}>
                                                    <div className="text-center text-error text-2xl font-normal  leading-[18px]">
                                                        -
                                                    </div>
                                                </button>
                                                <div className="py-1 px-2">
                                                    <div className="text-center text-dark text-2xl font-normal leading-[18px]">
                                                        {space.selectedSeats}
                                                    </div>
                                                </div>
                                                <button
                                                    className="w-4 h-4 p-2 rounded-full border border-primary flex justify-center items-center gap-2.5"
                                                    onClick={() => increaseSelectedSeats(index, space.type)}>
                                                    <div className="text-center text-primary text-2xl font-normal  leading-[18px]">
                                                        +
                                                    </div>
                                                </button>
                                            </div>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default Branches;
