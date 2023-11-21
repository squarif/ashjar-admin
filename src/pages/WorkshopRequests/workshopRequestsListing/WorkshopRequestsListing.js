import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";

import { ReactComponent as ChevronRight } from "../../../assets/ChevronRight.svg";
import { ReactComponent as ClockIcon } from "../../../assets/ClockIcon.svg";
import { ReactComponent as TickIcon } from "../../../assets/TickIcon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { GET_WORKSHOP_REQUESTS } from "../../../queries/workshopQueries";
import { useQuery } from "@apollo/client";

// import { useQuery } from "@apollo/client";
// import { GET_BRANCHES } from "./queries";

function WorkshopRequests() {
    // let { loading, error, data } = useQuery(GET_BRANCHES);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [requestList, setRequestList] = useState([
        {
            _id: "653d7b712f2d99434c7e4c22",
            name: "Finance Workshop Edited",
            timing: [
                {
                    date: "1995-12-17",
                    startTime: "10:00 AM",
                    endTime: "12:00 PM",
                    __typename: "Timing",
                },
            ],
            branch: {
                _id: "6537572cefdb213c0c319113",
                name: "Branch1",
                location: "Islamabad",
                __typename: "BranchData",
            },
            nursery: {
                _id: "653cf6c9192631467c2f0648",
                name: "mohid nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "approved",
            draft: false,
            rejectionReason: null,
            __typename: "WorkshopRequest",
        },
        {
            _id: "653d9bf853787238d89464ff",
            name: "Sports Workshop",
            timing: [
                {
                    date: "20-11-2023",
                    startTime: "12.00 p.m",
                    endTime: "9.00 a.m",
                    __typename: "Timing",
                },
            ],
            branch: {
                _id: "6537572cefdb213c0c319113",
                name: "Branch1",
                location: "Islamabad",
                __typename: "BranchData",
            },
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
            __typename: "WorkshopRequest",
        },
        {
            _id: "653d9cda53787238d8946505",
            name: "E-Sports Workshop",
            timing: [
                {
                    date: "22-11-2023",
                    startTime: "12.00 p.m",
                    endTime: "9.00 a.m",
                    __typename: "Timing",
                },
            ],
            branch: {
                _id: "6537572cefdb213c0c319113",
                name: "Branch1",
                location: "Islamabad",
                __typename: "BranchData",
            },
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
            __typename: "WorkshopRequest",
        },
        {
            _id: "653da62ceaaae456c42c2d61",
            name: "Testing Workshop",
            timing: [
                {
                    date: "22-11-2023",
                    startTime: "9.00 a.m",
                    endTime: "12.00 p.m",
                    __typename: "Timing",
                },
            ],
            branch: {
                _id: "6537572cefdb213c0c319113",
                name: "Branch1",
                location: "Islamabad",
                __typename: "BranchData",
            },
            nursery: {
                _id: "653cf6c9192631467c2f0648",
                name: "mohid nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            __typename: "WorkshopRequest",
        },
        {
            _id: "653daa7beaaae456c42c2d6d",
            name: "Testing Workshop",
            timing: [
                {
                    date: "22-11-2023",
                    startTime: "9.00 a.m",
                    endTime: "12.00 p.m",
                    __typename: "Timing",
                },
            ],
            branch: {
                _id: "6537572cefdb213c0c319113",
                name: "Branch1",
                location: "Islamabad",
                __typename: "BranchData",
            },
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
            __typename: "WorkshopRequest",
        },
        {
            _id: "653daadceaaae456c42c2d75",
            name: "Testing Workshop 2",
            timing: [
                {
                    date: "22-11-2023",
                    startTime: "9.00 a.m",
                    endTime: "12.00 p.m",
                    __typename: "Timing",
                },
            ],
            branch: {
                _id: "6537572cefdb213c0c319113",
                name: "Branch1",
                location: "Islamabad",
                __typename: "BranchData",
            },
            nursery: {
                _id: "653cf6c9192631467c2f0648",
                name: "mohid nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "approved",
            draft: false,
            rejectionReason: null,
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
            branch: {
                _id: "65455144aad1963490a2f8e3",
                name: "Austria Collabs",
                location: "Austria",
                __typename: "BranchData",
            },
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
            branch: {
                _id: "65455144aad1963490a2f8e3",
                name: "Austria Collabs",
                location: "Austria",
                __typename: "BranchData",
            },
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
            branch: {
                _id: "65455144aad1963490a2f8e3",
                name: "Austria Collabs",
                location: "Austria",
                __typename: "BranchData",
            },
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
            branch: {
                _id: "65455144aad1963490a2f8e3",
                name: "Austria Collabs",
                location: "Austria",
                __typename: "BranchData",
            },
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
            __typename: "WorkshopRequest",
        },
        {
            _id: "654576e8d076443dec8c97d8",
            name: "Portugal Workshop",
            timing: [],
            branch: {
                _id: "654572beb6f2bf0a9c590685",
                name: "Portugal Branch",
                location: "Portugal",
                __typename: "BranchData",
            },
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
            __typename: "WorkshopRequest",
        },
        {
            _id: "6550bc23bbca5863b8a7f6d4",
            name: "Paris Workshop 1",
            timing: [],
            branch: null,
            nursery: null,
            workspace: null,
            description: "This is a Paris Testing Workshop",
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            __typename: "WorkshopRequest",
        },
        {
            _id: "6550cf6f8f7d8732d885f7a0",
            name: "Paris Workshop 2",
            timing: [],
            branch: null,
            nursery: null,
            workspace: null,
            description: "This is a Paris Testing Workshop",
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            __typename: "WorkshopRequest",
        },
        {
            _id: "6550d14d4317391d641e77c6",
            name: "Paris Workshop 3",
            timing: [],
            branch: null,
            nursery: null,
            workspace: null,
            description: "This is a Paris Testing Workshop",
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            __typename: "WorkshopRequest",
        },
        null,
        {
            _id: "655132fe91988249ecab564b",
            name: "Paris Workshop 5",
            timing: [],
            branch: null,
            nursery: null,
            workspace: null,
            description: "This is a Paris Testing Workshop",
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            __typename: "WorkshopRequest",
        },
        {
            _id: "655134a98084923230650435",
            name: "Paris Workshop 6",
            timing: [],
            branch: {
                _id: "6550b6347dd84c5c50b5579e",
                name: "Paris Testing Branch",
                location: "Paris",
                __typename: "BranchData",
            },
            nursery: null,
            workspace: null,
            description: "This is a Paris Testing Workshop",
            categories: [],
            approvalStatus: "approved",
            draft: false,
            rejectionReason: null,
            __typename: "WorkshopRequest",
        },
    ]);

    const { loading: requestsLoading, error: requestsError, data } = useQuery(GET_WORKSHOP_REQUESTS);

    useEffect(() => {
        console.log(requestsLoading, requestsError, data);
        if (!requestsLoading && !requestsError) {
            console.log("askjdnasjdnj", data);

            // setRequestList(data.workshopRequests);
        }
    }, [requestsLoading, requestsError, data]);

    // const requestList = [
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

    function statusBadge(status) {
        console.log("statusBadge", status);
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

    function selectRequest(index) {
        if (selectedRequest === index) {
            setSelectedRequest();
        } else {
            setSelectedRequest(index);
        }
    }

    const listItems = requestList.map((request, index) => {
        if (request)
            return (
                <button
                    key={index}
                    onClick={() => selectRequest(index)}
                    className="flex p-6 w-full justify-between items-center">
                    <div className="flex flex-col justify-start gap-4">
                        <div className="flex gap-6 items-center">
                            <div className="text-base text-dark leading-5">R-{request._id}</div>
                            {statusBadge(request.approvalStatus)}
                        </div>
                        <div className="text-left text-xs text-light">
                            Request for pottery class from user {request.requestee?.email}
                        </div>
                    </div>

                    <ChevronRight />
                </button>
            );
    });

    function renderSelectedRequest(selectedRequest) {
        if (selectedRequest == null) {
            return <div>No Request Selected</div>;
        } else {
            let request = requestList[selectedRequest];

            console.log("selectedRequest", request);

            return (
                <div className="grid grid-cols-6 gap-2.5">
                    <div className="flex col-span-4 flex-col justify-between ">
                        <div className="requestBody flex flex-col gap-8">
                            <div className="header flex gap-6 items-baseline">
                                <span className="text-dark text-2xl">{request.name}</span>
                                <div className="">{statusBadge(request.approvalStatus)}</div>
                            </div>
                            <span className="description text-left text-base text-mediumGray">
                                {request.description}
                            </span>
                            <span className="text-left text-xl text-dark">Details</span>
                            <div className="details capitalize p-6 rounded-xl border border-light flex flex-col gap-6">
                                <div className="flex justify-between">
                                    <div className="text-base text-mediumGray">Number of Seats</div>
                                    <div className="">{request.numberOfSeats}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-base text-mediumGray">Price / Seat</div>
                                    <div className="">{request.cost}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-base text-mediumGray">Genders</div>
                                    <div className="">{request.gender}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-base text-mediumGray">Age Group</div>
                                    <div className="">{request.ageGroup}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-base text-mediumGray">duration</div>
                                    <div className="">
                                        {request.timing.startTime} - {request.timing.endTime}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="requestActions flex w-full justify-center gap-6 py-8">
                            <button className="py-2 flex gap-2.5 items-center px-3 rounded-lg border-light bg-errorLight shadow-md">
                                <span className="text-sm font-medium text-mediumGray">Reject</span>
                                <CloseIcon className="h-4 w-4 text-error" />
                            </button>
                            <Link
                                to="/workshops/requests/create-post"
                                className="py-2 flex gap-2.5 items-center px-3 rounded-lg border-light bg-primaryLight shadow-md">
                                <span className="text-sm font-medium text-mediumGray">
                                    Approve and Create Post
                                </span>
                                <TickIcon className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                    {request.requestee ? (
                        <div className="flex flex-col col-span-2 my-6 p-6 gap-6">
                            <div className="flex justify-between">
                                <div className="text-base text-mediumGray">Name</div>
                                <div className="">{request.requestee.name}</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-base text-mediumGray">Email</div>
                                <div className="">{request.requestee.email}</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-base text-mediumGray">Phone</div>
                                <div className="">{request.requestee.phone}</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-base text-mediumGray">Company</div>
                                <div className="">{request.requestee.company}</div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            );
        }
    }

    return (
        <div className="workshop-requests">
            <Breadcrumbs />
            <div className="WorkshopRequests grid grid-cols-6 gap-6 h-[100%]">
                <div className="col-span-2">
                    <div className="Search mb-6 rounded-xl border overflow-hidden px-4 shadow-md ">
                        <Input
                            variant="unstyled"
                            value={searchQuery}
                            placeholder="Search"
                            className=" py-3 px-6 w-[430px] "
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />

                        <div className="Filter"></div>
                    </div>
                    <div className="RequestList flex-col relative shadow-md flex border rounded-2xl p-4">
                        {listItems}
                    </div>
                </div>
                <div className="RequestBody relative shadow-md border rounded-2xl px-8 py-12 col-span-4 ">
                    {renderSelectedRequest(selectedRequest)}
                </div>
            </div>
        </div>
    );
}

export default WorkshopRequests;
