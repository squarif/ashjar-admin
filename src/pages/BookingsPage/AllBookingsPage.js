import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Input, useToast } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { ReactComponent as CloseIcon } from "../../assets/CloseIcon.svg";
import { ReactComponent as TickIcon } from "../../assets/TickIcon.svg";
import { ReactComponent as PlusIcon } from "../../assets/PlusIcon.svg";
import { ReactComponent as ClockIcon } from "../../assets/ClockIcon.svg";
import { ReactComponent as ChevronRight } from "../../assets/ChevronRight.svg";
import { ReactComponent as FilterIcon } from "../../assets/FilterIcon.svg";
import { useMutation, useQuery } from "@apollo/client";

import Loader from "../../components/Loader";
import { Pagination } from "antd";
import { GET_ADVANCE_SEARCH_BOOKINGS } from "../../queries/dashBoardQueries";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { userBookingsFilters } from "../../stores/dashboardStores";
import client from "../../apollo";
import { getDate, getTime12Hour } from "../../util/helpers";
import { GET_BRANCH, GET_BRANCHES } from "../../queries/branchesQueries";
import { branchesData } from "../../stores/branches";
import moment from "moment";

function FiltersModal({ setFiltersModal, bookingsData, handleApplyFilters }) {
    const [selectedFilter, setSelectedFilter] = useState("");
    const [selectedOperator, setSelectedOperator] = useState("");
    const [value, setValue] = useState(0);
    const [filtersList, setFiltersList] = useRecoilState(userBookingsFilters);

    const [selectors, setSelectors] = useState([]);

    useEffect(() => {
        let filters = [];
        for (const key in bookingsData[0]) {
            filters.push(key);
        }
        setSelectors(filters);
    }, [bookingsData]);

    // let operators = ["Equals", "Not Equals", "Contains", "Greater Than", "Less Than"];

    function handleAddFilter() {
        if (selectedFilter.length) {
            const updatedFiltersList = JSON.parse(JSON.stringify(filtersList));
            updatedFiltersList[selectedFilter] = value;
            setFiltersList(updatedFiltersList);
        }
    }

    function handleRemoveFilter(filter) {
        const updatedFiltersList = JSON.parse(JSON.stringify(filtersList));
        delete updatedFiltersList[filter];
        setFiltersList(updatedFiltersList);
    }

    return (
        <div className="">
            <div
                onClick={() => setFiltersModal(false)}
                className="fixed bg-dark bg-opacity-50 top-0 bottom-0 left-0 right-0 w-[100vw] h-[100vh] backdrop-blur-sm"
            ></div>

            <div className="top-0 bottom-0 left-0 right-0 p-8 mx-auto my-auto gap-12 shadow-lg flex w-[70%] h-[547px] absolute bg-white z-10 flex-col rounded-lg text-mediumGray text-sm text-center border border-borderColor">
                <div className="flex gap-6 h-14">
                    <div className="border rounded-xl border-light flex items-center">
                        <Menu autoSelect={false} closeOnBlur>
                            <MenuButton
                                as="button"
                                className="h-fit rounded-xl flex justify-between"
                            >
                                <div className="flex pl-4 w-[180px] py-2 items-center justify-between text-lg leading-none">
                                    <span className="text-mediumGray capitalize">
                                        {selectedFilter}
                                    </span>
                                    <ChevronRight className="rotate-90 h-7 text-light " />
                                </div>
                            </MenuButton>
                            <MenuList className="MenuList inset-0 w-[180px] left-[-200px] text-lg">
                                {selectors.map((filter, index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            onClick={() => setSelectedFilter(filter)}
                                            className="capitalize"
                                        >
                                            {filter}
                                        </MenuItem>
                                    );
                                })}
                            </MenuList>
                        </Menu>

                        {/* <div className="border border-borderColor w-[1px] h-full"></div>

                        <Menu autoSelect={false} closeOnBlur>
                            <MenuButton as="button" className="h-fit rounded-xl flex justify-between">
                                <div className="flex pl-3 w-[180px] py-3 items-center justify-between text-lg leading-none">
                                    <span className="text-mediumGray capitalize">{selectedOperator}</span>
                                    <ChevronRight className="rotate-90 h-7 text-light " />
                                </div>
                            </MenuButton>
                            <MenuList className="MenuList inset-0 w-[180px] left-[-200px] text-lg">
                                {operators.map((operator) => {
                                    return (
                                        <MenuItem
                                            onClick={() => setSelectedOperator(operator)}
                                            className="capitalize">
                                            {operator}
                                        </MenuItem>
                                    );
                                })}
                            </MenuList>
                        </Menu> */}

                        <div className="border border-borderColor w-[1px] h-full"></div>

                        <Input
                            id="cost"
                            variant="unstyled"
                            type="number"
                            value={value}
                            style={{ fontSize: 18 }}
                            className="py-2.5 !max-w-[100px] !h-14 placeholder:text-lg text-center"
                            onChange={event => setValue(event.target.value)}
                        />
                    </div>

                    <button
                        onClick={() => handleAddFilter()}
                        className="py-2 px-3 bg-primaryLight shadow-md flex justify-center items-center gap-2 rounded-xl border border-borderColor"
                    >
                        <span className="text-dark text-lg font-medium">Add Filter</span>
                        <PlusIcon className="h-6 w-6 border-mediumGray text-light" />
                    </button>
                </div>

                <div className="border rounded-xl border-borderColor shadow-md py-6 px-4 flex gap-x-2.5 gap-y-2.5 grow flex-wrap">
                    {Object.keys(filtersList).map((filter, index) => {
                        return (
                            <div className="flex gap-2.5 h-fit w-fit" key={index}>
                                {index > 0 && (
                                    <div className="border border-borderColor w-[2px] !h-11"></div>
                                )}
                                <button
                                    onClick={() => handleRemoveFilter(filter)}
                                    className="p-3 bg-primaryLight flex justify-center items-center gap-2 rounded-lg text-lg leading-none border border-borderColor"
                                >
                                    <CloseIcon className="h-5 w-5 border-2 rounded-full border-mediumGray mr-1" />
                                    <span className="text-dark ">{filter}</span>
                                    <span className="text-mediumGray ">{filtersList[filter]}</span>
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-end gap-6">
                    <button
                        onClick={() => setFiltersModal(false)}
                        className="py-2.5 px-3 flex justify-center items-center gap-2 rounded-lg border border-error"
                    >
                        <span className="text-mediumGray text-sm font-medium">Cancel</span>
                    </button>
                    <button
                        onClick={() => handleApplyFilters()}
                        className="py-2.5 px-3 bg-primary flex justify-center items-center gap-2 rounded-lg"
                    >
                        <span className="text-white text-sm font-medium">Apply Filters</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

function BookingRow(props) {
    let booking = props.booking;

    const [showOptions, setshowOptions] = useState(false);
    const toast = useToast();

    const requiredBranch = props.branchData?.branches?.find(
        b => b._id === props.booking.branch._id
    );

    const productId = props?.booking?.bookingId;
    const requiredProduct =
        requiredBranch?.meetingRooms?.find(m => m._id === productId) ||
        requiredBranch?.workspaces?.find(m => m._id === productId) ||
        requiredBranch?.workshops?.find(m => m._id === productId);

    // const [editUser] = useMutation(EDIT_USER);
    // async function handleChangeUserStatus() {
    //     let payload = {
    //         _id: booking._id,
    //         isBlocked: !booking.isBlocked,
    //     };

    //     //  console.log("payload", payload);

    //     try {
    //         const { data } = await editUser({
    //             mutation: EDIT_USER,
    //             variables: {
    //                 input: payload,
    //             },
    //         });
    //         //  console.log(data);
    //         toast({
    //             title: !booking.isBlocked ? "User Blocked!" : "User Unblocked!",
    //             status: "success",
    //         });
    //         setshowOptions(false);
    //     } catch (error) {
    //         console.log(error);
    //         toast({
    //             title: "Error",
    //             description: error.message,
    //             status: "error",
    //         });
    //     }
    // }

    function statusBadge(isBlocked) {
        if (isBlocked) {
            return (
                <div className="border rounded-xl bg-errorLight border-light flex gap-2 py-1.5 px-3 items-center ">
                    <CloseIcon className="h-4 w-4 text-error" />
                    <span className="text-sm leading-4 text-gray-600"> Cancelled</span>
                </div>
            );
        } else {
            return (
                <div className="border rounded-xl bg-primaryLight border-light flex gap-2 py-1.5 px-3 items-center ">
                    <TickIcon className="h-4 w-4 text-primary" />
                    <span className="text-sm leading-4 text-gray-600"> </span>
                </div>
            );
        }
    }

    const today = moment(); // Get the start of today

    // Assuming getDate() returns the date in a compatible format
    const bookingDate = moment(getDate(booking.bookingDate));
    const bookingEndTime = moment(booking.endTime, "h:mm a");

    // Compare today's date with the booking's createdAt date
    const isBookingPassed = today.isAfter(bookingDate);
    const isBookingEndTimePassed = today.isAfter(bookingEndTime);

    return (
        <Tr>
            <Td>{booking.bookingNumber || booking._id}</Td>
            <Td>{booking.userId && booking.userId.name}</Td>
            <Td>{booking.bookingType}</Td>
            <Td>{booking.branch.name}</Td>
            <Td>{requiredProduct?.name}</Td>
            <Td>{getDate(booking.bookingDate)}</Td>
            <Td>{booking.startTime}</Td>
            <Td>{booking.endTime}</Td>
            <Td className="text-primary text-lg">{booking.seats}</Td>
            <Td className="text-primary text-lg">
                SAR{" "}
                {booking?.discountedPrice === 0
                    ? booking?.discountedPrice
                    : booking?.discountedPrice || booking.rate}
            </Td>
            <Td className="text-primary text-lg">
                {booking.isCancelled
                    ? "Cancelled"
                    : isBookingPassed && isBookingEndTimePassed
                    ? "Completed"
                    : "Reserved"}
            </Td>
            <Td className=""> {getDate(booking.createdAt)}</Td>
            {/* <Td className="relative">
                <button onClick={() => setshowOptions(!showOptions)}>
                    <VerticalDots />
                </button>
                {showOptions ? (
                    <div className="">
                        <div
                            onClick={() => setshowOptions(false)}
                            className="fixed top-0 bottom-0 left-0 right-0 w-[100vw] h-[100vh] "></div>
                        <div className="right-12 shadow-lg flex w-fit absolute bg-white z-10 flex-col rounded-lg text-dark text-sm text-center border border-borderColor">
                            <button className="p-3 pb-2.5 gap-2 flex justify-between items-center">
                                <span>View History</span>
                                <ClockIcon />
                            </button>
                            <div className="border-b h-[1px] mx-3"></div>
                            <button
                                onClick={() => handleChangeUserStatus()}
                                className="p-3 pt-2.5 gap-2 flex justify-between items-center">
                                {booking.isBlocked ? <span>Unblock User</span> : <span>Block User</span>}
                                <ClockIcon />
                            </button>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </Td> */}
        </Tr>
    );
}

function AllBookingsPage() {
    const itemsPerPage = 10;
    const [searchQuery, setSearchQuery] = useState("");
    const [userBookingsData, setUserBookingsData] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filtersList, setFiltersList] = useRecoilState(userBookingsFilters);
    const [pageNumber, setPageNumber] = useState(1);
    const {
        loading: userBookingsLoading,
        error: userBookingsError,
        data: userBookingsResponse,
    } = useQuery(GET_ADVANCE_SEARCH_BOOKINGS, {
        variables: {
            params: {
                bookingType: null,
                bookingId: null,
                branch: null,
                startTime: null,
                bookingDate: null,
                endTime: null,
                seats: null,
                rate: null,
                isCancelled: null,
                createdAt: null,
            },
            pagination: {
                pageNo: pageNumber - 1,
                itemsPerPage: 1000,
            },
        },
    });
    let { loading, error, data: branchData, refetch } = useQuery(GET_BRANCHES);
    const [branches, setBranches] = useRecoilState(branchesData);

    useEffect(() => {
        if (branchData) setBranches(branchData.branches);
    }, [branchData]);

    useEffect(() => {
        refetch(); // Refetch data when the component mounts
    }, [refetch]);
    // console.log({ userBookingsData, branches, branchData });

    useEffect(() => {
        if (!userBookingsLoading && !userBookingsError) {
            // Set the branches data
            if (!!!userBookingsData.length)
                setUserBookingsData(userBookingsResponse.AdvanceSearchBooking.bookings);
        }
    }, [userBookingsLoading, userBookingsError, userBookingsResponse]);

    function filteredList(items) {
        return items.filter(
            item =>
                item.userId?.name.toLowerCase()?.includes(searchQuery) ||
                item._id.toLowerCase()?.includes(searchQuery) ||
                item.phoneNumber?.includes(searchQuery)
        );
    }

    function paginatedList(items) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredList(items.slice(startIndex, endIndex));
    }

    function handleRemoveFilter(filter) {
        const updatedFiltersList = JSON.parse(JSON.stringify(filtersList));

        delete updatedFiltersList[filter];

        setFiltersList(updatedFiltersList);

        fetchBookings(updatedFiltersList);
    }

    function handleApplyFilters() {
        fetchBookings(filtersList);
    }

    function fetchBookings(filtersList) {
        client
            .query({
                query: GET_ADVANCE_SEARCH_BOOKINGS,
                variables: {
                    params: {
                        ...filtersList,
                        seats: parseInt(filtersList["seats"]),
                        rate: parseInt(filtersList["rate"]),
                    },
                },
            })
            .then(result => {
                if (!result.loading && !result.error) {
                    console.log("result", result);
                    setUserBookingsData(result.data.AdvanceSearchBooking.bookings);
                    setShowFilters(false);
                }
            });
    }

    return (
        <div className="h-full">
            <div className="flex justify-between">
                <Breadcrumbs />
            </div>

            {userBookingsData ? (
                <div className="flex flex-col gap-8 h-[90%]">
                    <div className="flex gap-6">
                        <div className="Search rounded-xl border overflow-hidden px-4 shadow-md ">
                            <Input
                                variant="unstyled"
                                value={searchQuery}
                                placeholder="Search"
                                className=" py-3 px-6 w-[430px] "
                                onChange={event => setSearchQuery(event.target.value)}
                            />
                        </div>

                        <button
                            onClick={() => setShowFilters(true)}
                            className="p-3 hover:bg-primaryLight rounded-lg"
                        >
                            <FilterIcon className="h-7 w-7 text-light" />
                        </button>

                        <div className="Filters flex gap-6 items-center">
                            {Object.keys(filtersList).map((filter, index) => {
                                return (
                                    <div className="flex gap-2.5 h-fit w-fit" key={index}>
                                        {index > 0 && (
                                            <div className="border border-borderColor w-[1px] !h-11"></div>
                                        )}
                                        <button
                                            onClick={() => handleRemoveFilter(filter)}
                                            className="p-3 bg-primaryLight flex justify-center items-center gap-2 rounded-lg text-lg leading-none border border-borderColor"
                                        >
                                            <CloseIcon className="h-5 w-5 border-2 rounded-full border-mediumGray mr-1" />
                                            <span className="text-dark ">{filter}</span>
                                            <span className="text-mediumGray ">
                                                {filtersList[filter]}
                                            </span>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="border rounded-xl h-full flex flex-col items-center justify-between w-full">
                        <TableContainer>
                            <Table variant="simple">
                                <Thead className="h-[60px]">
                                    <Tr>
                                        <Th>
                                            <span className="text-light"> Booking ID</span>
                                        </Th>

                                        <Th>
                                            <span className="text-light"> User</span>
                                        </Th>
                                        <Th>
                                            <span className="text-light"> Booking Type</span>
                                        </Th>
                                        <Th>
                                            <span className="text-light"> Branch Name</span>
                                        </Th>
                                        <Th>
                                            <span className="text-light"> Product Name</span>
                                        </Th>

                                        <Th>
                                            <span className="text-light"> Booking Date</span>
                                        </Th>
                                        <Th>
                                            <span className="text-light">Start Time</span>
                                        </Th>
                                        <Th>
                                            <span className="text-light"> End Time</span>
                                        </Th>

                                        <Th>
                                            <span className="text-light"> Seats</span>
                                        </Th>
                                        <Th>
                                            <span className="text-light"> Amount</span>
                                        </Th>
                                        <Th>
                                            <span className="text-light"> Status</span>
                                        </Th>
                                        <Th>
                                            <span className="text-light"> Created At</span>
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {userBookingsLoading ? (
                                        <div className="h-[400px]">
                                            <Loader />
                                        </div>
                                    ) : (
                                        paginatedList(userBookingsData).map((booking, index) => (
                                            <BookingRow
                                                booking={booking}
                                                key={index}
                                                branchData={branchData}
                                            />
                                        ))
                                    )}
                                </Tbody>
                            </Table>
                        </TableContainer>

                        <Pagination
                            className="p-4"
                            defaultCurrent={pageNumber}
                            total={userBookingsData.length}
                            pageSize={itemsPerPage}
                            onChange={x => setPageNumber(x)}
                        />
                    </div>
                </div>
            ) : (
                "No AllBookingsPage"
            )}

            {showFilters && (
                <FiltersModal
                    setFiltersModal={() => setShowFilters(false)}
                    bookingsData={userBookingsData}
                    handleApplyFilters={() => handleApplyFilters()}
                />
            )}
        </div>
    );
}

export default AllBookingsPage;
