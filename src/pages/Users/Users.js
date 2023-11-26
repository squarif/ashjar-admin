import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Input } from "@chakra-ui/react";
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

function UserRow(props) {
    let user = props.user;

    const [showOptions, setshowOptions] = useState(false);

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
        } catch (error) {
            console.log(error);
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

    return (
        <Tr>
            <Td>{user._id}</Td>
            <Td>{user.name}</Td>
            <Td>{user.numberOfBookings}</Td>
            <Td>
                {user.phoneNumber} l{showOptions}
            </Td>
            <Td>{statusBadge(user.isBlocked)}</Td>
            <Td className="relative">
                <button onClick={() => setshowOptions(!showOptions)}>
                    <VerticalDots />
                </button>
                {showOptions ? (
                    <div className="right-12 shadow-lg flex w-[126px] absolute bg-white z-10 flex-col rounded-lg text-dark text-sm text-center border border-borderColor">
                        <button className="p-3 pb-2.5 flex justify-between items-center">
                            <span>View History</span>
                            <ClockIcon />
                        </button>
                        <div className="border-b h-[1px] mx-3"></div>
                        <button
                            onClick={() => handleChangeUserStatus()}
                            className="p-3 pt-2.5 flex justify-between items-center">
                            <span>Block User</span>
                            <ClockIcon />
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </Td>
        </Tr>
    );
}

function Users() {
    const [searchQuery, setSearchQuery] = useState("");
    const [userData, setUserData] = useState([]);
    const { loading: usersLoading, error: usersError, data } = useQuery(GET_USERS);

    useEffect(() => {
        if (!usersLoading && !usersError) {
            // Set the branches data
            //  console.log("users data", data);
            setUserData(data.users);
        } else {
            //  console.log("ERRRRR", usersError, usersLoading, data);
        }
    }, [usersLoading, usersError, data]);

    if (usersLoading)
        return (
            <div className="h-[400px]">
                <Loader />
            </div>
        );
    return (
        <div>
            <div className="flex justify-between">
                <Breadcrumbs />
            </div>

            {!usersLoading ? (
                userData ? (
                    <div className="flex flex-col gap-8">
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

                        <div className="border rounded-xl">
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
                                        {userData.map((user, index) => (
                                            <UserRow user={user} key={index} />
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
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
