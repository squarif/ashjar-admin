import { useEffect, useState } from "react";
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
import Loader from "../../../components/Loader";
import { Pagination } from "antd";

// import { useQuery } from "@apollo/client";
// import { GET_BRANCHES } from "./queries";

function WorkshopListing() {
    const itemsPerPage = 7;
    const [searchQuery, setSearchQuery] = useState("");
    const [upcomingFilter, setUpcomingFilter] = useState(true);
    const [requestList, setRequestList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    let { loading: requestsLoading, error: requestsError, data } = useQuery(GET_WORKSHOP_REQUESTS);
    useEffect(() => {
        //  console.log(requestsLoading, requestsError, data);
        if (!requestsLoading && !requestsError) {
            console.log("askjdnasjdnj", data);

            setRequestList(data.workshopRequests);
        }
    }, [requestsLoading, requestsError, data]);

    //  console.log("WorkshopListing data", data);

    function statusBadge(status, draft) {
        if (draft) {
            return (
                <div className="border rounded-xl bg-[#F0F0EE] border-light flex gap-2 py-1.5 px-3 items-center ">
                    <ClockIcon className="h-4 w-4" />
                    <span className="text-sm leading-4 text-gray-600"> Draft</span>
                </div>
            );
        } else {
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
    }

    function getDate(value) {
        if (typeof value === "string") {
            if (value.includes("-")) {
                return value.split("T")[0];
            } else {
                const date = new Date(parseInt(value));
                return date.toISOString().slice(0, 10);
            }
        } else {
            return value;
        }
    }

    function filteredList(items) {
        return items.filter((item) => item.name.toLowerCase().includes(searchQuery));
    }

    function paginatedList(items) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredList(items.slice(startIndex, endIndex));
    }

    if (requestsLoading)
        return (
            <div className="h-[400px]">
                <Loader />
            </div>
        );

    return (
        <div className="flex flex-col gap-8 h-full">
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

            <div className="border rounded-xl flex items-center flex-col w-full h-full justify-between">
                <TableContainer className="w-full">
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
                            {paginatedList(requestList).map((request, index) => (
                                <Tr key={index}>
                                    <Td>{request.name}</Td>
                                    <Td>{request.username}</Td>
                                    <Td>{request.seats}</Td>
                                    <Td>{getDate(request.bookings[0]?.date)}</Td>

                                    <Td> {statusBadge(request.approvalStatus, request.draft)}</Td>

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

                <Pagination
                    className="p-4"
                    defaultCurrent={pageNumber}
                    total={requestList.length}
                    pageSize={itemsPerPage}
                    onChange={(x) => setPageNumber(x)}
                />
            </div>

            <div className=""></div>
        </div>
    );
}

export default WorkshopListing;
