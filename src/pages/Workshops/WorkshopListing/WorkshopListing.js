import { useState } from "react";
import { Input } from "@chakra-ui/react";

import { ReactComponent as ChevronRight } from "../../../assets/ChevronRight.svg";
import { ReactComponent as ClockIcon } from "../../../assets/ClockIcon.svg";
import { ReactComponent as TickIcon } from "../../../assets/TickIcon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";

import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_WORKSHOP_REQUESTS } from "../../../queries/workshopQueries";
import Breadcrumbs from "../../../components/Breadcrumbs";

// import { useQuery } from "@apollo/client";
// import { GET_BRANCHES } from "./queries";

function WorkshopListing() {
    const [searchQuery, setSearchQuery] = useState("");
    const [upcomingFilter, setUpcomingFilter] = useState(true);

    let { loading, error, data } = useQuery(GET_WORKSHOP_REQUESTS);

    console.log("WorkshopListing data", data);

    function statusBadge(status) {
        if (status.includes("pending")) {
            return (
                <div className="border rounded-xl bg-[#F0F0EE] border-light flex gap-2 py-1.5 px-3 items-center ">
                    <ClockIcon className="h-4 w-4" />
                    <span className="text-sm leading-4 text-gray-600"> Pending</span>
                </div>
            );
        }
        if (status.includes("approved")) {
            return (
                <div className="border rounded-xl bg-primaryLight border-light flex gap-2 py-1.5 px-3 items-center ">
                    <TickIcon className="h-4 w-4" />
                    <span className="text-sm leading-4 text-gray-600"> Approved</span>
                </div>
            );
        }
        if (status.includes("rejected")) {
            return (
                <div className="border rounded-xl bg-errorLight border-light flex gap-2 py-1.5 px-3 items-center ">
                    <CloseIcon className="h-4 w-4" />
                    <span className="text-sm leading-4 text-gray-600"> Rejected</span>
                </div>
            );
        }
    }

    // let requestList = data?.workshopRequests;
    // let requestList = [
    //     {
    //         id: 1234,
    //         status: "pending",
    //         title: "Pottery Class",
    //         requestee: {
    //             name: "Adnan",
    //             email: "user2@gmail.com",
    //             phone: "+92318549669",
    //             company: "Bridglinx",
    //         },
    //         description:
    //             "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ..",
    //         numberOfSeats: "20",
    //         cost: "12.0",
    //         gender: ["Male", "Female"],
    //         ageGroup: "12+",
    //         duration: {
    //             hours: "2",
    //             minutes: "30",
    //         },
    //     },
    //     {
    //         id: 1234,
    //         status: "approved",
    //         title: "Potions Class",
    //         requestee: {
    //             name: "Adnan",
    //             email: "user2@gmail.com",
    //             phone: "+92318549669",
    //             company: "Bridglinx",
    //         },
    //         description:
    //             "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ..",
    //         numberOfSeats: "20",
    //         cost: "12.0",
    //         gender: ["Male", "Female"],
    //         ageGroup: "12+",
    //         duration: {
    //             hours: "2",
    //             minutes: "30",
    //         },
    //     },
    //     {
    //         id: 1234,
    //         status: "approved",
    //         title: "Witchcart Class",
    //         requestee: {
    //             name: "Adnan",
    //             email: "mohid@gmail.com",
    //             phone: "+92318549669",
    //             company: "Bridglinx",
    //         },
    //         description:
    //             "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ..",
    //         numberOfSeats: "20",
    //         cost: "12.0",
    //         gender: ["Male", "Female"],
    //         ageGroup: "12+",
    //         duration: {
    //             hours: "2",
    //             minutes: "30",
    //         },
    //     },
    //     {
    //         id: 1234,
    //         status: "rejected",
    //         title: "Session Class",
    //         requestee: {
    //             name: "Adnan",
    //             email: "adil@gmail.com",
    //             phone: "+92318549669",
    //             company: "Bridglinx",
    //         },
    //         description:
    //             "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ..",
    //         numberOfSeats: "20",
    //         cost: "12.0",
    //         gender: ["Male", "Female"],
    //         ageGroup: "12+",
    //         duration: {
    //             hours: "2",
    //             minutes: "30",
    //         },
    //     },
    // ];

    let requestList = [
        {
            _id: "653d7b712f2d99434c7e4c22",
            name: "Finance Workshop Edited",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "12.00 p.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "653cf6c9192631467c2f0648",
                name: "Nursery 2",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "approved",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Branch1",
                location: "Islamabad",
                _id: "6537572cefdb213c0c319113",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "653d9bf853787238d89464ff",
            name: "Sports Workshop",
            timing: [
                {
                    date: null,
                    startTime: "12.00 p.m",
                    endTime: "9.00 a.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "653d9b2e53787238d89464fc",
                name: "Brand New Nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Branch1",
                location: "Islamabad",
                _id: "6537572cefdb213c0c319113",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "653d9cda53787238d8946505",
            name: "E-Sports Workshop",
            timing: [
                {
                    date: null,
                    startTime: "12.00 p.m",
                    endTime: "9.00 a.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "653d9b2e53787238d89464fc",
                name: "Brand New Nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "rejected",
            draft: false,
            rejectionReason: "Unavailable",
            branch: {
                name: "Branch1",
                location: "Islamabad",
                _id: "6537572cefdb213c0c319113",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "653da62ceaaae456c42c2d61",
            name: "Testing Workshop",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "12.00 p.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "653cf6c9192631467c2f0648",
                name: "Nursery 2",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Branch1",
                location: "Islamabad",
                _id: "6537572cefdb213c0c319113",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "653daa7beaaae456c42c2d6d",
            name: "Testing Workshop",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "12.00 p.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "653d1311c024721d80bc1bf0",
                name: "Nursery 3",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Branch1",
                location: "Islamabad",
                _id: "6537572cefdb213c0c319113",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "653daadceaaae456c42c2d75",
            name: "Testing Workshop 2",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "12.00 p.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "653cf6c9192631467c2f0648",
                name: "Nursery 2",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "approved",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Branch1",
                location: "Islamabad",
                _id: "6537572cefdb213c0c319113",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "654554c943c1804664faec08",
            name: "Austria Workshop",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "10.00 a.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "6545519eaad1963490a2f8e5",
                name: "Austria Nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "approved",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Austria Collabs",
                location: "Austria",
                _id: "65455144aad1963490a2f8e3",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "6545573676ffc35e08dccc2a",
            name: "Austria Workshop 2222",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "10.00 a.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "6545519eaad1963490a2f8e5",
                name: "Austria Nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Austria Collabs",
                location: "Austria",
                _id: "65455144aad1963490a2f8e3",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "654557c3a642614c486c0394",
            name: "Austria Workshop 9999",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "10.00 a.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "6545519eaad1963490a2f8e5",
                name: "Austria Nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Austria Collabs",
                location: "Austria",
                _id: "65455144aad1963490a2f8e3",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "654557daa642614c486c0397",
            name: "Austria Workshop 9",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "10.00 a.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "6545519eaad1963490a2f8e5",
                name: "Austria Nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "approved",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Austria Collabs",
                location: "Austria",
                _id: "65455144aad1963490a2f8e3",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "654576e8d076443dec8c97d8",
            name: "Portugal Workshop",
            timing: [],
            nursery: {
                _id: "654572e9b6f2bf0a9c590687",
                name: "Portugal Nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Portugal Branch",
                location: "Portugal",
                _id: "654572beb6f2bf0a9c590685",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
    ];

    return (
        <div className="flex flex-col gap-8">
            <Breadcrumbs />

            <div className="flex gap-6 max-h-12">
                <div className="Search rounded-xl border overflow-hidden px-4 shadow-md ">
                    <Input
                        variant="unstyled"
                        value={searchQuery}
                        placeholder="Search"
                        className=" py-3 px-6 w-[430px] "
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />

                    <div className="Filter"></div>
                </div>

                <label
                    className={
                        upcomingFilter ? "rounded-xl h-fit bg-primary border" : "h-fit rounded-xl border "
                    }>
                    <input
                        key={"toggle"}
                        className="absolute hidden "
                        type="radio"
                        value={true}
                        checked={upcomingFilter}
                        onChange={() => setUpcomingFilter(true)}
                    />
                    <span className="block text-lg leading-normal  text-dark px-4 py-2.5 ">Upcoming</span>
                </label>

                <label
                    className={
                        !upcomingFilter ? "rounded-xl bg-primary border h-fit" : "h-fit rounded-xl border "
                    }>
                    <input
                        key={"quantity"}
                        type="radio"
                        value={false}
                        className="absolute hidden "
                        checked={!upcomingFilter}
                        onChange={() => setUpcomingFilter(false)}
                    />
                    <span className="block text-lg leading-normal text-dark px-4 py-2.5">All</span>
                </label>
            </div>

            <div className="border rounded-xl">
                <TableContainer>
                    <Table variant="simple">
                        <Thead className="h-[60px]">
                            <Tr>
                                <Th>Title</Th>
                                <Th>Requested By</Th>
                                <Th>Capacity</Th>
                                <Th>Date</Th>
                                <Th>Status</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {requestList.map((request, index) => (
                                <Tr key={index}>
                                    <Td>{request.name}</Td>
                                    <Td>
                                        name
                                        {/* {request.requestee.name}  */}
                                    </Td>
                                    <Td>
                                        numberOfSeats
                                        {/* {request.numberOfSeats} */}
                                    </Td>
                                    <Td>date enter karwao </Td>

                                    <Td> {statusBadge(request.approvalStatus)}</Td>

                                    <Td>
                                        <Link to={`/workshops/${request._id}`}>
                                            <ChevronRight />{" "}
                                        </Link>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>

            <div className=""></div>
        </div>
    );
}

export default WorkshopListing;
