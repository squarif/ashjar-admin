import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Input, useToast } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { ReactComponent as CloseIcon } from "../../assets/CloseIcon.svg";
import { ReactComponent as TickIcon } from "../../assets/TickIcon.svg";
import { ReactComponent as ClockIcon } from "../../assets/ClockIcon.svg";
import { ReactComponent as EditIcon } from "../../assets/EditIcon.svg";
import { ReactComponent as ChevronRight } from "../../assets/ChevronRight.svg";
import { ReactComponent as VerticalDots } from "../../assets/VerticalDots.svg";
import { ReactComponent as SendIcon } from "../../assets/SendIcon.svg";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

// import { EDIT_USER, GET_COUPONS } from "../../queries/couponQueries";
import { useMutation, useQuery } from "@apollo/client";
import client from "../../apollo";
import Loader from "../../components/Loader";

function AddCoupon({ setAddCoupon }) {
    const [code, setCode] = useState("20off");
    const [discount, setDiscount] = useState({
        type: "percent",
        value: null,
    });
    const [type, setType] = useState("workspace");
    const [numberOfUses, setNumberOfUses] = useState(1);
    const [startDate, setStartDate] = useState("2024-01-01");
    const [expiryData, setExpiryData] = useState("2024-01-01");

    return (
        <div className="">
            <div
                onClick={() => setAddCoupon(false)}
                className="fixed bg-dark bg-opacity-50 top-0 bottom-0 left-0 right-0 w-[100vw] h-[100vh] backdrop-blur-sm"></div>

            <div className="top-0 bottom-0 left-0 right-0 p-8 mx-auto my-auto gap-12 shadow-lg flex w-fit h-fit absolute bg-white z-10 flex-col rounded-lg text-mediumGray text-sm text-center border border-borderColor">
                <span className="text-[32px] text-mediumGray text-left">Add New Coupon</span>

                <div className="flex flex-col gap-6">
                    <div className="flex gap-6">
                        <div className="flex flex-col w-fit gap-1.5">
                            <span className="text-sm text-mediumGray text-left leading-none">Code</span>
                            <div className="border rounded-xl border-light px-4">
                                <Input
                                    id="code"
                                    variant="unstyled"
                                    type="string"
                                    value={code}
                                    style={{ fontSize: 18 }}
                                    className="py-2.5 !w-[184px] !h-14"
                                    onChange={(event) => setCode(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-fit gap-1.5">
                            <span className="text-sm text-mediumGray text-left leading-none">Discount</span>
                            <div className="border rounded-xl border-light flex items-center">
                                <Menu autoSelect={false} closeOnBlur>
                                    <MenuButton as="button" className="h-fit rounded-xl flex justify-between">
                                        <div className="flex pl-4 w-[125px] py-3 items-center justify-between text-lg">
                                            {discount.type ? (
                                                <span className="text-mediumGray capitalize">
                                                    {discount.type}
                                                </span>
                                            ) : (
                                                <span className="text-mediumGray">Select a branch</span>
                                            )}

                                            <ChevronRight className="rotate-90 h-7 text-light " />
                                        </div>
                                    </MenuButton>
                                    <MenuList className="MenuList inset-0 w-[125px] left-[-200px] text-lg">
                                        <MenuItem
                                            onClick={() =>
                                                setDiscount({
                                                    type: "percent",
                                                    value: null,
                                                })
                                            }>
                                            Percent
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                setDiscount({
                                                    type: "amount",
                                                    value: null,
                                                })
                                            }>
                                            Amount
                                        </MenuItem>
                                    </MenuList>
                                </Menu>

                                <div className="border border-r border-light h-[80%] w-[1px] mr-2"></div>

                                <Input
                                    id="cost"
                                    variant="unstyled"
                                    type="number"
                                    placeholder="Enter Percentage"
                                    value={discount.value}
                                    style={{ fontSize: 18 }}
                                    className="py-2.5 min-w-[215px] !h-14 placeholder:text-lg"
                                    onChange={(event) =>
                                        setDiscount({ ...discount, value: event.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col w-fit gap-1.5">
                            <span className="text-sm text-mediumGray text-left leading-none">Type</span>
                            <div className="border rounded-xl border-light">
                                <Menu autoSelect={false} closeOnBlur>
                                    <MenuButton as="button" className="h-[60px] rounded-xl  ">
                                        <div className="flex pl-4 w-[218px] items-center justify-between text-lg">
                                            {type ? (
                                                <span className="text-mediumGray capitalize">{type}</span>
                                            ) : (
                                                <span className="text-mediumGray">Select a branch</span>
                                            )}
                                            <ChevronRight className="rotate-90 h-7 text-light " />
                                        </div>
                                    </MenuButton>
                                    <MenuList className="MenuList inset-0 w-[312px] left-[-200px] text-lg">
                                        <MenuItem onClick={() => setType("workspace")}>Workspace</MenuItem>
                                        <MenuItem onClick={() => setType("meeting room")}>
                                            Meeting Room
                                        </MenuItem>
                                        <MenuItem onClick={() => setType("Nursery")}>Nursery</MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>
                        </div>
                        <div className="flex flex-col w-fit gap-1.5">
                            <span className="text-sm text-mediumGray text-left leading-none">
                                Number of uses
                            </span>
                            <div className="border rounded-xl border-light px-4">
                                <Input
                                    id="code"
                                    variant="unstyled"
                                    type="number"
                                    value={numberOfUses}
                                    style={{ fontSize: 18 }}
                                    className="!w-[184px] !h-[60px]"
                                    onChange={(event) => setNumberOfUses(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col w-fit gap-1.5">
                            <span className="text-sm text-mediumGray text-left leading-none">
                                Starting Date
                            </span>
                            <div className="border rounded-xl border-light px-4">
                                <Input
                                    id="code"
                                    variant="unstyled"
                                    type="date"
                                    value={startDate}
                                    style={{ fontSize: 18 }}
                                    className="py-2.5 !w-[184px] !h-14"
                                    onChange={(event) => setStartDate(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-fit gap-1.5">
                            <span className="text-sm text-mediumGray text-left leading-none">
                                Expiry Date
                            </span>
                            <div className="border rounded-xl border-light px-4">
                                <Input
                                    id="code"
                                    variant="unstyled"
                                    type="date"
                                    value={expiryData}
                                    style={{ fontSize: 18 }}
                                    className="py-2.5 !w-[184px] !h-14"
                                    onChange={(event) => setExpiryData(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-6">
                    <button
                        onClick={() => setAddCoupon(false)}
                        className="py-2.5 px-3 flex justify-center items-center gap-2 rounded-lg border border-error">
                        <span className="text-mediumGray text-sm font-medium">Cancel</span>
                    </button>
                    <button className="py-2.5 px-3 bg-primary flex justify-center items-center gap-2 rounded-lg">
                        <span className="text-white text-sm font-medium">Add Coupon</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

function EditCoupon(props) {
    const [code, setCode] = useState(props.code);
    const [discount, setDiscount] = useState(props.discount);
    const [startDate, setStartDate] = useState(props.startDate);
    const [expiryData, setExpiryData] = useState(props.expiryData);

    return (
        <div className="">
            <div
                onClick={() => props.setEditCoupon(false)}
                className="fixed bg-dark bg-opacity-50 top-0 bottom-0 left-0 right-0 w-[100vw] h-[100vh] backdrop-blur-sm"></div>

            <div className="top-0 bottom-0 left-0 right-0 p-8 mx-auto my-auto gap-12 shadow-lg flex w-fit h-fit absolute bg-white z-10 flex-col rounded-lg text-mediumGray text-sm text-center border border-borderColor">
                <span className="text-[32px] text-mediumGray text-left">Add New Coupon</span>

                <div className="flex flex-col gap-6">
                    <div className="flex gap-6">
                        <div className="flex flex-col w-fit gap-1.5">
                            <span className="text-sm text-mediumGray text-left leading-none">Code</span>
                            <div className="border rounded-xl border-light px-4">
                                <Input
                                    id="code"
                                    variant="unstyled"
                                    type="string"
                                    value={code}
                                    style={{ fontSize: 18 }}
                                    className="py-2.5 !w-[184px] !h-14"
                                    onChange={(event) => setCode(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-fit gap-1.5">
                            <span className="text-sm text-mediumGray text-left leading-none">Discount</span>
                            <div className="border rounded-xl border-light flex items-center">
                                <Menu autoSelect={false} closeOnBlur>
                                    <MenuButton as="button" className="h-fit rounded-xl flex justify-between">
                                        <div className="flex pl-4 w-[125px] py-3 items-center justify-between text-lg">
                                            {discount.type ? (
                                                <span className="text-mediumGray capitalize">
                                                    {discount.type}
                                                </span>
                                            ) : (
                                                <span className="text-mediumGray">Select type</span>
                                            )}

                                            <ChevronRight className="rotate-90 h-7 text-light " />
                                        </div>
                                    </MenuButton>
                                    <MenuList className="MenuList inset-0 w-[125px] left-[-200px] text-lg">
                                        <MenuItem
                                            onClick={() =>
                                                setDiscount({
                                                    type: "percent",
                                                    value: null,
                                                })
                                            }>
                                            Percent
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                setDiscount({
                                                    type: "amount",
                                                    value: null,
                                                })
                                            }>
                                            Amount
                                        </MenuItem>
                                    </MenuList>
                                </Menu>

                                <div className="border border-r border-light h-[80%] w-[1px] mr-2"></div>

                                <Input
                                    id="cost"
                                    variant="unstyled"
                                    type="number"
                                    placeholder="Enter Percentage"
                                    value={discount.value}
                                    style={{ fontSize: 18 }}
                                    className="py-2.5 min-w-[215px] !h-14 placeholder:text-lg"
                                    onChange={(event) =>
                                        setDiscount({ ...discount, value: event.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col w-fit gap-1.5">
                            <span className="text-sm text-mediumGray text-left leading-none">
                                Starting Date
                            </span>
                            <div className="border rounded-xl border-light px-4">
                                <Input
                                    id="code"
                                    variant="unstyled"
                                    type="date"
                                    value={startDate}
                                    style={{ fontSize: 18 }}
                                    className="py-2.5 !w-[184px] !h-14"
                                    onChange={(event) => setStartDate(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-fit gap-1.5">
                            <span className="text-sm text-mediumGray text-left leading-none">
                                Expiry Date
                            </span>
                            <div className="border rounded-xl border-light px-4">
                                <Input
                                    id="code"
                                    variant="unstyled"
                                    type="date"
                                    value={expiryData}
                                    style={{ fontSize: 18 }}
                                    className="py-2.5 !w-[184px] !h-14"
                                    onChange={(event) => setExpiryData(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-6">
                    <button
                        onClick={() => props.setEditCoupon(false)}
                        className="py-2.5 px-3 flex justify-center items-center gap-2 rounded-lg border border-error">
                        <span className="text-mediumGray text-sm font-medium">Cancel</span>
                    </button>
                    <button className="py-2.5 px-3 bg-primary flex justify-center items-center gap-2 rounded-lg">
                        <span className="text-white text-sm font-medium">Add Coupon</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

function CouponRow(props) {
    let coupon = props.coupon;

    const [showOptions, setShowOptions] = useState(false);
    const toast = useToast();

    // const [addCoupon] = useMutation(EDIT_USER);
    async function handleChangeCouponStatus() {
        let payload = {
            _id: coupon._id,
            isExpired: !coupon.isExpired,
        };

        try {
            // const { data } = await addCoupon({
            //     mutation: EDIT_USER,
            //     variables: {
            //         input: payload,
            //     },
            // });
            //  console.log(data);
            toast({
                title: !coupon.isExpired ? "Coupon Expired!" : "Coupon Unexpired!",
                status: "success",
            });
            setShowOptions(false);
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: error.message,
                status: "error",
            });
        }
    }

    function handleSendToUsers() {
        console.log("HADNDLE SEND TO USERS");
    }

    function statusBadge(isExpired) {
        if (isExpired) {
            return (
                <div className="border rounded-xl bg-errorLight border-light flex gap-2 py-1.5 px-3 items-center ">
                    <CloseIcon className="h-4 w-4 text-error" />
                    <span className="text-sm leading-4 text-gray-600"> Expired</span>
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
            <Td>{coupon._id}</Td>
            <Td>{coupon.code}</Td>
            <Td>{coupon.discount}</Td>
            <Td>{coupon.expiry}</Td>
            <Td>{statusBadge(coupon.isExpired)}</Td>
            <Td className="relative">
                <button onClick={() => setShowOptions(!showOptions)}>
                    <VerticalDots />
                </button>
                {showOptions ? (
                    <div className="">
                        <div
                            onClick={() => setShowOptions(false)}
                            className="fixed top-0 bottom-0 left-0 right-0 w-[100vw] h-[100vh] "></div>
                        <div className="right-12 shadow-lg flex w-fit absolute bg-white z-10 flex-col rounded-lg text-mediumGray text-sm text-center border border-borderColor">
                            <button
                                onClick={() => handleChangeCouponStatus()}
                                className="p-3 pb-2.5 gap-2 flex justify-between items-center">
                                <span>Expire Token</span>
                                <ClockIcon className="text-mediumGray" />
                            </button>
                            <div className="border-b h-[1px] mx-3"></div>
                            <button className="p-3 pt-2.5 gap-2 flex justify-between items-center">
                                <span>Edit Coupon</span>
                                <EditIcon className="h-[14px] w-[14px] text-mediumGray" />
                            </button>
                            <div className="border-b h-[1px] mx-3"></div>
                            <button
                                onClick={() => handleSendToUsers()}
                                className="p-3 pt-2.5 gap-2 flex justify-between items-center">
                                <span>Send to Users</span>
                                <SendIcon className="text-mediumGray" />
                            </button>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </Td>
        </Tr>
    );
}

function CouponsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [couponsData, setCouponsData] = useState([
        {
            _id: "123",
            code: "abc288",
            discount: "25%",
            expiry: "2023-12-17T03:24:00",
            expired: false,
        },
        {
            _id: "123",
            code: "abc288",
            discount: "25%",
            expiry: "2023-12-17T03:24:00",
            expired: false,
        },
        {
            _id: "123",
            code: "abc288",
            discount: "25%",
            expiry: "2022-12-17T03:24:00",
            expired: false,
        },
    ]);
    const [addCoupon, setAddCoupon] = useState(true);

    // const { loading: couponsLoading, error: couponsError, data } = useQuery(GET_COUPONS);

    // useEffect(() => {
    //     if (!couponsLoading && !couponsError) {
    //         // Set the branches data
    //         //  console.log("coupons data", data);
    //         setCouponsData(data.coupons);
    //     } else {
    //         //  console.log("ERRRRR", couponsError, couponsLoading, data);
    //     }
    // }, [couponsLoading, couponsError, data]);

    // if (couponsLoading)
    //     return (
    //         <div className="h-[400px]">
    //             <Loader />
    //         </div>
    //     );

    return (
        <div>
            <div className="flex justify-between items-center">
                <Breadcrumbs />
                <button
                    onClick={() => setAddCoupon(true)}
                    className="py-2.5 px-3 bg-primary flex justify-center items-center gap-2 rounded-lg">
                    <span className="text-white text-xl font-medium">Add Coupon</span>
                </button>
            </div>
            {couponsData ? (
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
                                            <span className="text-light"> Coupon ID</span>
                                        </Th>
                                        <Th>
                                            <span className="text-light"> Code</span>
                                        </Th>
                                        <Th>
                                            <span className="text-light"> Discount</span>
                                        </Th>
                                        <Th>
                                            <span className="text-light"> Expiry Date</span>
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
                                    {couponsData.map((coupon, index) => (
                                        <CouponRow coupon={coupon} index={index} key={index} />
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            ) : (
                "No Coupons"
            )}

            {addCoupon && <AddCoupon setAddCoupon={() => setAddCoupon(false)} />}
        </div>
    );
}

export default CouponsPage;
