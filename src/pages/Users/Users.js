import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Input, useToast } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { ReactComponent as CloseIcon } from "../../assets/CloseIcon.svg";
import { ReactComponent as TickIcon } from "../../assets/TickIcon.svg";
import { ReactComponent as ClockIcon } from "../../assets/ClockIcon.svg";
import { ReactComponent as ChevronRight } from "../../assets/ChevronRight.svg";
import { ReactComponent as VerticalDots } from "../../assets/VerticalDots.svg";
import { EDIT_USER, GET_USERS } from "../../queries/userQueries";
import { useMutation, useQuery } from "@apollo/client";
import client from "../../apollo";
import Loader from "../../components/Loader";
import { Pagination } from "antd";
import { Link } from "react-router-dom";

function UserRow(props) {
    let user = props.user;

    const [showOptions, setshowOptions] = useState(false);
    const toast = useToast();

    const [editUser] = useMutation(EDIT_USER);
    async function handleChangeUserStatus() {
        let payload = {
            _id: user._id,
            isBlocked: !user.isBlocked,
        };

        //  console.log("payload", payload);

        try {
            const { data } = await editUser({
                mutation: EDIT_USER,
                variables: {
                    input: payload,
                },
            });
            //  console.log(data);
            toast({
                title: !user.isBlocked ? "User Blocked!" : "User Unblocked!",
                status: "success",
            });
            setshowOptions(false);
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: error.message,
                status: "error",
            });
        }
    }

    function statusBadge(isBlocked) {
        if (isBlocked) {
            return (
                <div className="border rounded-xl bg-errorLight border-light flex gap-2 py-1.5 px-3 items-center ">
                    <CloseIcon className="h-4 w-4 text-error" />
                    <span className="text-sm leading-4 text-gray-600"> Blocked</span>
                </div>
            );
        } else {
            return (
                <div className="border rounded-xl bg-primaryLight border-light flex gap-2 py-1.5 px-3 items-center ">
                    <TickIcon className="h-4 w-4 text-primary" />
                    <span className="text-sm leading-4 text-gray-600"> Active</span>
                </div>
            );
        }
    }

    function numberOfBookings() {
        return (
            user.workshopBookings.length +
            user.workspaceBookings.length +
            user.meetingRoomBookings.length +
            user.cancelledMeetingRoomBookings.length +
            user.cancelledWorkshopBookings.length +
            user.cancelledWorkspaceBookings.length
        );
    }

    return (
        <Tr>
            <Td>{user._id}</Td>
            <Td>{user.name}</Td>
            <Td>{numberOfBookings()}</Td>
            <Td>{user.phoneNumber}</Td>
            <Td>{statusBadge(user.isBlocked)}</Td>
            <Td className="">
                <button onClick={() => setshowOptions(!showOptions)}>
                    <VerticalDots />
                </button>
                {showOptions ? (
                    <div className="">
                        <div
                            onClick={() => setshowOptions(false)}
                            className="fixed top-0 bottom-0 left-0 right-0 w-[100vw] h-[100vh] "></div>
                        <div className="right-12 shadow-lg flex w-fit absolute bg-white z-10 flex-col rounded-lg text-dark text-sm text-center border border-borderColor">
                            <Link
                                to={`/dashboard/bookings/users/${user._id}`}
                                className="p-3 pb-2.5 gap-2 flex justify-between items-center">
                                <span>View History</span>
                                <ClockIcon />
                            </Link>
                            <div className="border-b h-[1px] mx-3"></div>
                            <button
                                onClick={() => handleChangeUserStatus()}
                                className="p-3 pt-2.5 gap-2 flex justify-between items-center">
                                {user.isBlocked ? <span>Unblock User</span> : <span>Block User</span>}
                                <CloseIcon className="h-4 w-4 text-error" />
                            </button>
                            <div className="border-b h-[1px] mx-3"></div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </Td>
        </Tr>
    );
}

function Users() {
    const itemsPerPage = 8;
    const [searchQuery, setSearchQuery] = useState("");
    const [userData, setUserData] = useState([]);
    const { loading: usersLoading, error: usersError, data } = useQuery(GET_USERS);
    const [itemsLength, setItemsLength] = useState(0); // No need to update this line
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        if (!usersLoading && !usersError) {
            setUserData(data.users);
        }
    }, [usersLoading, usersError, data]);

    useEffect(() => {
        setItemsLength(filteredList(userData).length);
    }, [searchQuery, userData]);

    function filteredList(items) {
        return items.filter(
            (item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.phoneNumber.includes(searchQuery)
        );
    }

    function paginatedList(items) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredList(items).slice(startIndex, endIndex);
    }

    if (usersLoading)
        return (
            <div className="h-[400px]">
                <Loader />
            </div>
        );
    return (
        <div className="h-full">
            <div className="flex justify-between">
                <Breadcrumbs />
            </div>

            {!usersLoading ? (
                userData ? (
                    <div className="flex flex-col gap-8 h-[90%]">
                        <div className="Search rounded-xl border overflow-hidden px-4 shadow-md shrink-0">
                            <Input
                                variant="unstyled"
                                value={searchQuery}
                                placeholder="Search"
                                className=" py-3 px-6 w-[430px] "
                                onChange={(event) => setSearchQuery(event.target.value)}
                            />
                            <div className="Filter"></div>
                        </div>

                        <div className="border rounded-xl h-full flex flex-col items-center justify-between w-full">
                            <TableContainer>
                                <Table variant="simple">
                                    <Thead className="h-[60px]">
                                        <Tr>
                                            <Th>
                                                <span className="text-light"> User ID</span>
                                            </Th>
                                            <Th>
                                                <span className="text-light"> Name</span>
                                            </Th>
                                            <Th>
                                                <span className="text-light"> Number of Bookings</span>
                                            </Th>
                                            <Th>
                                                <span className="text-light"> Phone Number</span>
                                            </Th>
                                            <Th>
                                                <span className="text-light"> Status</span>
                                            </Th>
                                            <Th>
                                                <span className="text-light"> Action</span>
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {paginatedList(userData).map((user, index) => (
                                            <UserRow user={user} key={index} />
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>

                            <Pagination
                                className="p-4"
                                defaultCurrent={pageNumber}
                                total={itemsLength} // Update to use itemsLength
                                pageSize={itemsPerPage}
                                onChange={(x) => setPageNumber(x)}
                            />
                        </div>
                    </div>
                ) : (
                    "No Users"
                )
            ) : (
                "Loading"
            )}
        </div>
    );
}

export default Users;

