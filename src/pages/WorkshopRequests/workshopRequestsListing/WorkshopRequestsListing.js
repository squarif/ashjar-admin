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
import Loader from "../../../components/Loader";
import { useRecoilState } from "recoil";
import { workshopAmenities, workshopCategories, workshopRequestPayload } from "../../../stores/workshopStore";
import { Pagination } from "antd";

// import { useQuery } from "@apollo/client";
// import { GET_BRANCHES } from "./queries";

function WorkshopRequests() {
    // let { loading, error, data } = useQuery(GET_BRANCHES);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [requestList, setRequestList] = useState([]);
    const [itemsLength, setItemsLength] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    const [requestPayload, setWorkShopRequestPayload] = useRecoilState(workshopRequestPayload);
    const [amenities, setAmenities] = useRecoilState(workshopAmenities);
    const [bookings, setWorkshopBookings] = useRecoilState(workshopCategories);
    const [categories, setWorkshopCategories] = useRecoilState(workshopCategories);

    const { loading: requestsLoading, error: requestsError, data } = useQuery(GET_WORKSHOP_REQUESTS);

    useEffect(() => {
        if (!requestsLoading && !requestsError) {
            console.log("workshopRequests", data);
            // setRequestList(data.workshopRequests);
            let list = data.workshopRequests.filter((item) => item.approvalStatus.includes("pending"));

            setItemsLength(list.length);

            setRequestList(list);
        }
    }, [requestsLoading, requestsError, data]);

    function statusBadge(status) {
        //  console.log("statusBadge", status);
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

            let request = requestList[index];

            setWorkShopRequestPayload(request);
            setAmenities(request.amenities);
            setWorkshopBookings(request.bookings);
            setWorkshopCategories(request.categories);
        }
    }

    function listItems() {
        const itemsPerPage = 5;
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        let items = requestList.filter((request) => request.name.toLowerCase().includes(searchQuery));

        console.log("ITEMS", items);

        items = items.slice(startIndex, endIndex);

        return items.map((request, index) => {
            return (
                <button
                    key={index}
                    onClick={() => selectRequest(index)}
                    className={
                        index === selectedRequest
                            ? "flex p-6 w-full justify-between items-center rounded-xl border-[0.5px] border-primary shadow-sm shadow-primaryLight gap-4"
                            : "flex p-6 w-full justify-between items-center rounded-xl border border-transparent gap-4"
                    }>
                    <div className="flex flex-col justify-start gap-4 w-full">
                        <div className="flex gap-6 items-center justify-between">
                            <div className="text-base text-dark leading-5 text-left">R-{request.name}</div>
                            {statusBadge(request.approvalStatus)}
                        </div>
                        <div className="text-left text-xs text-light">
                            Request for pottery class from user {request.username}
                        </div>
                    </div>

                    <ChevronRight />
                </button>
            );
        });
    }

    function renderSelectedRequest(selectedRequest) {
        if (selectedRequest == null) {
            return <div>No Request Selected</div>;
        } else {
            let request = requestList[selectedRequest];

            return (
                <div className="grid grid-cols-6 gap-2.5 h-full">
                    <div className="flex col-span-4 flex-col justify-between p-8 ">
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
                                    <div className="">{request.seats}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-base text-mediumGray">Price / Seat</div>
                                    <div className="">{request.pricePerSeat}</div>
                                </div>
                                {/* <div className="flex justify-between">
                                    <div className="text-base text-mediumGray">Genders</div>
                                    <div className="">{request.gender}</div>
                                </div> */}
                                {/* <div className="flex justify-between">
                                    <div className="text-base text-mediumGray">Age Group</div>
                                    <div className="">{request.ageGroup}</div>
                                </div> */}
                                {/* <div className="flex justify-between">
                                    <div className="text-base text-mediumGray">duration</div>
                                    <div className="">
                                        {request.timing.startTime} - {request.timing.endTime}
                                    </div> 
                                </div> */}
                            </div>
                        </div>
                        <div className="requestActions flex w-full justify-center gap-6 pt-8">
                            <button className="py-2 flex gap-2.5 items-center px-3 rounded-lg border-light bg-errorLight shadow-md">
                                <span className="text-sm font-medium text-mediumGray">Reject</span>
                                <CloseIcon className="h-4 w-4 text-error" />
                            </button>
                            <Link
                                to="/workshops/requests/create-post"
                                state={request}
                                className="py-2 flex gap-2.5 items-center px-3 rounded-lg border-light bg-primaryLight shadow-md">
                                <span className="text-sm font-medium text-mediumGray">
                                    Approve and Create Post
                                </span>
                                <TickIcon className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col col-span-2 my-6 p-6 gap-6 border-l border-[#E3E3E3] h-full">
                        <div className="flex justify-between">
                            <div className="text-base text-mediumGray">Name</div>
                            <div className="">{request.username}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-base text-mediumGray">Email</div>
                            <div className="">{request.email}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-base text-mediumGray">Phone</div>
                            <div className="">{request.phone}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-base text-mediumGray">Company</div>
                            <div className="">{request.company}</div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    if (requestsLoading)
        return (
            <div className="h-[400px]">
                <Loader />
            </div>
        );
    return (
        <div className="workshop-requests">
            <Breadcrumbs />
            <div className="WorkshopRequests grid grid-cols-6 gap-6 h-full">
                <div className="col-span-2 flex flex-col items-center justify-between gap-6">
                    <div className="flex flex-col gap-6 h-full">
                        <div className="Search rounded-xl border overflow-hidden px-4 shadow-md w-full ">
                            <Input
                                variant="unstyled"
                                value={searchQuery}
                                placeholder="Search"
                                className=" py-3 px-6  w-full"
                                onChange={(event) => setSearchQuery(event.target.value)}
                            />

                            <div className="Filter"></div>
                        </div>
                        <div className="RequestList flex grow w-full h-full flex-col relative shadow-md border rounded-2xl p-4 max-h-full overflow-auto">
                            {listItems()}
                        </div>
                    </div>

                    <Pagination
                        defaultCurrent={pageNumber}
                        total={itemsLength}
                        pageSize={5}
                        onChange={(x) => setPageNumber(x)}
                    />
                </div>

                <div className="RequestBody relative shadow-md border rounded-2xl px-8 py-12 col-span-4">
                    {renderSelectedRequest(selectedRequest)}
                </div>
            </div>
        </div>
    );
}

export default WorkshopRequests;
