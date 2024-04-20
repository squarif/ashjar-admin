import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { ReactComponent as ChevronRight } from "../../../assets/ChevronRight.svg";
import { useQuery } from "@apollo/client";

import { GET_ADVANCE_SEARCH_BOOKINGS } from "../../../queries/dashBoardQueries";
import { Link } from "react-router-dom";
import { getDate } from "../../../util/helpers";

function UsersBookingsList() {
    const [userBookingsData, setUserBookingsData] = useState([]);

    const {
        loading: userBookingsLoading,
        error: userBookingsError,
        data: userBookingsResponse,
    } = useQuery(GET_ADVANCE_SEARCH_BOOKINGS, {
        variables: {
            params: {
                _id: null,
                bookingType: null,
                bookingId: null,
                branch: null,
                startTime: null,
                bookingDate: null,
                endTime: null,
                seats: null,
                rate: null,
                userId: null,
                isCancelled: null,
                createdAt: null,
            },
            pagination: {
                pageNo: 0,
                itemsPerPage: 3,
            },
        },
    });

    useEffect(() => {
        if (!userBookingsLoading && !userBookingsError) {
            // Set the branches data

            setUserBookingsData(userBookingsResponse.AdvanceSearchBooking.bookings);
        }
    }, [userBookingsLoading, userBookingsError, userBookingsResponse]);

    return (
        <div className="latest-bookings flex flex-col gap-4 border rounded-xl border-borderColor shadow-md py-6 px-4">
            <div className="flex justify-between items-center">
                <span className="text-xl text-mediumGray">Latest Bookings</span>
                <Link
                    to="/dashboard/bookings"
                    className="rounded-xl py-2 px-3 flex gap-3 items-center border border-borderColor bg-primaryLight"
                >
                    <span className="text-lg text-dark">View All</span>
                    <ChevronRight className="h-6 w-6 text-light" />
                </Link>
            </div>
            <div className="h-[1px] w-full border-t border-light"></div>
            <div className="border rounded-xl">
                <TableContainer>
                    <Table variant="simple">
                        <Thead className="h-[60px]">
                            <Tr>
                                <Th>Booking ID</Th>
                                <Th>Booking Type</Th>
                                <Th>Requestee</Th>
                                <Th>Date</Th>
                                <Th>Seats</Th>
                                <Th>Cost</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {userBookingsData.map((booking, index) => (
                                <Tr key={index}>
                                    <Td>{booking.bookingNumber || booking._id}</Td>
                                    <Td>{booking.bookingType}</Td>
                                    <Td>{booking.userId.name}</Td>
                                    <Td>{getDate(booking.bookingDate)}</Td>
                                    <Td> {booking.seats}</Td>
                                    <Td>SAR {booking.rate}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default UsersBookingsList;
