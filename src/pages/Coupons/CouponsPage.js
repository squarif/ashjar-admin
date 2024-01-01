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
import Loader from "../../components/Loader";
import { CREATE_COUPON, EDIT_COUPON, GET_COUPONS } from "../../queries/couponsQueries";
import { useRecoilState } from "recoil";
import { couponDataState, couponsDataState } from "../../stores/couponsStore";
import SendCouponsComponent from "./components/SendCouponsComponent";

function getDate(value) {
    if (typeof value === "string") {
        if (value.includes("-")) {
            return value;
        } else {
            const date = new Date(parseInt(value));
            return date.toISOString().slice(0, 10);
        }
    } else {
        return value;
    }
}
function AddCoupon({ setAddCoupon }) {
    const [code, setCode] = useState("20off");
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [type, setType] = useState("workspace");
    const [numberOfUses, setNumberOfUses] = useState(1);
    const [startDate, setStartDate] = useState("2024-01-01");
    const [expiryDate, setExpiryDate] = useState("2024-01-01");
    const [percentageAmountSelector, setPercentageAmountSelector] = useState("percentage");

    const [couponsData, setCouponsData] = useRecoilState(couponsDataState);

    const toast = useToast();

    function handlePercentageOrAmountSelector(type) {
        if (type === "amount") {
            setPercentageAmountSelector("amount");
            setDiscountPercentage(0);
        } else {
            setPercentageAmountSelector("percentage");
            setDiscountAmount(0);
        }
    }

    const [createCoupon] = useMutation(CREATE_COUPON);
    async function handleCreateCoupon() {
        let payload = {
            couponCode: code,
            discountPercentage: parseFloat(discountPercentage),
            discountAmount: parseFloat(discountAmount),
            startingDate: startDate,
            expiryDate: expiryDate,
            duration_in_months: 0,
            numberOfUsers: parseInt(numberOfUses),
            type: type,
        };

        console.log("payload", payload);
        try {
            await createCoupon({
                mutation: CREATE_COUPON,
                variables: {
                    input: payload,
                },
                // client: client,
            }).then((data) => {
                console.log(data);
                let newCouponsData = [...couponsData, data.data.createCoupon];
                setCouponsData(newCouponsData);
                setAddCoupon(false);
            });

            toast({
                title: "New Coupon Created!",
                status: "success",
            });

            //  console.log(data);
            // navigate(`/branches/${state.branch_id}`);
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: error.message,
                status: "error",
            });
        }
    }

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
                                            {/* {percentageAmountSelector === "percentage" ? ( */}
                                            <span className="text-mediumGray capitalize">
                                                {percentageAmountSelector}
                                            </span>
                                            {/* ) : (
                                                <span className="text-mediumGray capitalize">
                                                    {discountAmount}
                                                </span>
                                            )} */}

                                            <ChevronRight className="rotate-90 h-7 text-light " />
                                        </div>
                                    </MenuButton>
                                    <MenuList className="MenuList inset-0 w-[125px] left-[-200px] text-lg">
                                        <MenuItem
                                            onClick={() => handlePercentageOrAmountSelector("percentage")}>
                                            Percent
                                        </MenuItem>
                                        <MenuItem onClick={() => handlePercentageOrAmountSelector("amount")}>
                                            Amount
                                        </MenuItem>
                                    </MenuList>
                                </Menu>

                                <div className="border border-r border-light h-[80%] w-[1px] mr-2"></div>

                                {percentageAmountSelector === "percentage" ? (
                                    <Input
                                        id="cost"
                                        variant="unstyled"
                                        type="number"
                                        placeholder="Enter Percentage"
                                        value={discountPercentage}
                                        style={{ fontSize: 18 }}
                                        className="py-2.5 min-w-[215px] !h-14 placeholder:text-lg"
                                        onChange={(event) => setDiscountPercentage(event.target.value)}
                                    />
                                ) : (
                                    <Input
                                        id="cost"
                                        variant="unstyled"
                                        type="number"
                                        placeholder="Enter Amount"
                                        value={discountAmount}
                                        style={{ fontSize: 18 }}
                                        className="py-2.5 min-w-[215px] !h-14 placeholder:text-lg"
                                        onChange={(event) => setDiscountAmount(event.target.value)}
                                    />
                                )}
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
                                    value={expiryDate}
                                    style={{ fontSize: 18 }}
                                    className="py-2.5 !w-[184px] !h-14"
                                    onChange={(event) => setExpiryDate(event.target.value)}
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
                    <button
                        onClick={() => handleCreateCoupon()}
                        className="py-2.5 px-3 bg-primary flex justify-center items-center gap-2 rounded-lg">
                        <span className="text-white text-sm font-medium">Add Coupon</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

function EditCoupon({ setEditCoupon }) {
    const [couponData, setCouponData] = useRecoilState(couponDataState);

    const [code, setCode] = useState(couponData.couponCode);

    const [discountPercentage, setDiscountPercentage] = useState(couponData.discountPercentage);
    const [discountAmount, setDiscountAmount] = useState(couponData.discountAmount);
    const [startDate, setStartDate] = useState(getDate(couponData.startingDate));
    const [expiryDate, setExpiryDate] = useState(getDate(couponData.expiryDate));
    const [percentageAmountSelector, setPercentageAmountSelector] = useState("percentage");
    const toast = useToast();

    function handlePercentageOrAmountSelector(type) {
        if (type === "amount") {
            setPercentageAmountSelector("amount");
            setDiscountPercentage(0);
        } else {
            setPercentageAmountSelector("percentage");
            setDiscountAmount(0);
        }
    }

    const [editCoupon] = useMutation(EDIT_COUPON);
    async function handleEditCoupon() {
        let payload = {
            _id: couponData._id,
            couponCode: code,
            discountPercentage: parseFloat(discountPercentage),
            discountAmount: parseFloat(discountAmount),
            startingDate: startDate,
            expiryDate: expiryDate,

            isActive: couponData.isActive,
        };

        console.log("payload", payload);

        try {
            await editCoupon({
                mutation: EDIT_COUPON,
                variables: {
                    input: payload,
                },
            }).then((data) => {
                console.log(data);
                setEditCoupon(false);
            });

            toast({
                title: "Coupon Edited!",
                status: "success",
            });
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: error.message,
                status: "error",
            });
        }
    }

    return (
        <div className="">
            <div
                onClick={() => setEditCoupon(false)}
                className="fixed bg-dark bg-opacity-50 top-0 bottom-0 left-0 right-0 w-[100vw] h-[100vh] backdrop-blur-sm"></div>

            <div className="top-0 bottom-0 left-0 right-0 p-8 mx-auto my-auto gap-12 shadow-lg flex w-fit h-fit absolute bg-white z-10 flex-col rounded-lg text-mediumGray text-sm text-center border border-borderColor">
                <span className="text-[32px] text-mediumGray text-left">Edit Coupon</span>
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
                                            {/* {percentageAmountSelector === "percentage" ? ( */}
                                            <span className="text-mediumGray capitalize">
                                                {percentageAmountSelector}
                                            </span>
                                            {/* ) : (
                                                <span className="text-mediumGray capitalize">
                                                    {discountAmount}
                                                </span>
                                            )} */}

                                            <ChevronRight className="rotate-90 h-7 text-light " />
                                        </div>
                                    </MenuButton>
                                    <MenuList className="MenuList inset-0 w-[125px] left-[-200px] text-lg">
                                        <MenuItem
                                            onClick={() => handlePercentageOrAmountSelector("percentage")}>
                                            Percent
                                        </MenuItem>
                                        <MenuItem onClick={() => handlePercentageOrAmountSelector("amount")}>
                                            Amount
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                                <div className="border border-r border-light h-[80%] w-[1px] mr-2"></div>
                                {percentageAmountSelector === "percentage" ? (
                                    <Input
                                        id="cost"
                                        variant="unstyled"
                                        type="number"
                                        placeholder="Enter Percentage"
                                        value={discountPercentage}
                                        style={{ fontSize: 18 }}
                                        className="py-2.5 min-w-[215px] !h-14 placeholder:text-lg"
                                        onChange={(event) => setDiscountPercentage(event.target.value)}
                                    />
                                ) : (
                                    <Input
                                        id="cost"
                                        variant="unstyled"
                                        type="number"
                                        placeholder="Enter Amount"
                                        value={discountAmount}
                                        style={{ fontSize: 18 }}
                                        className="py-2.5 min-w-[215px] !h-14 placeholder:text-lg"
                                        onChange={(event) => setDiscountAmount(event.target.value)}
                                    />
                                )}
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
                                    value={expiryDate}
                                    style={{ fontSize: 18 }}
                                    className="py-2.5 !w-[184px] !h-14"
                                    onChange={(event) => setExpiryDate(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-6">
                    <button
                        onClick={() => setEditCoupon(false)}
                        className="py-2.5 px-3 flex justify-center items-center gap-2 rounded-lg border border-error">
                        <span className="text-mediumGray text-sm font-medium">Cancel</span>
                    </button>
                    <button
                        onClick={() => handleEditCoupon()}
                        className="py-2.5 px-3 bg-primary flex justify-center items-center gap-2 rounded-lg">
                        <span className="text-white text-sm font-medium">Edit Coupon</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

function CouponRow(props) {
    // let coupon = props.coupon;

    let [coupon, setCoupon] = useState(props.coupon);

    const [showOptions, setShowOptions] = useState(false);
    const toast = useToast();

    const [couponData, setCouponData] = useRecoilState(couponDataState);

    const [editCoupon] = useMutation(EDIT_COUPON);
    async function handleChangeCouponStatus() {
        let payload = {
            ...coupon,
            isActive: !coupon.isActive,
        };

        if ("__typename" in payload) delete payload["__typename"];
        if ("createdAt" in payload) delete payload["createdAt"];
        if ("numberOfUsers" in payload) delete payload["numberOfUsers"];
        if ("type" in payload) delete payload["type"];

        try {
            await editCoupon({
                mutation: EDIT_COUPON,
                variables: {
                    input: payload,
                },
            }).then((data) => {
                setCoupon(payload);
            });

            toast({
                title: "Coupon Status Updated!",
                status: "success",
            });
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: error.message,
                status: "error",
            });
        }

        setShowOptions(false);
    }

    function handleSendToUsers() {
        console.log("HADNDLE SEND TO USERS");
    }

    function handleEditCoupon() {
        setCouponData(props.coupon);
        props.setEditCoupon(true);
        setShowOptions(false);
    }

    function statusBadge(isActive) {
        if (!isActive) {
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
            <Td>{coupon.couponCode}</Td>
            <Td>{coupon.discountPercentage}</Td>
            <Td>{getDate(coupon.expiryDate)}</Td>
            <Td>{statusBadge(coupon.isActive)}</Td>
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
                                <span>{coupon.isActive ? "Expire Token" : "Activate Token"}</span>
                                <ClockIcon className="text-mediumGray" />
                            </button>
                            <div className="border-b h-[1px] mx-3"></div>
                            <button
                                onClick={() => handleEditCoupon()}
                                className="p-3 pt-2.5 gap-2 flex justify-between items-center">
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
    const [couponsData, setCouponsData] = useRecoilState(couponsDataState);
    const [addCoupon, setAddCoupon] = useState(false);
    const [editCoupon, setEditCoupon] = useState(false);
    const [sendCoupon, setSendCoupon] = useState(true);

    const { loading: couponsLoading, error: couponsError, data } = useQuery(GET_COUPONS);

    useEffect(() => {
        if (!couponsLoading && !couponsError) {
            // Set the branches data
            //  console.log("coupons data", data);
            setCouponsData(data.coupons);
        } else {
            //  console.log("ERRRRR", couponsError, couponsLoading, data);
        }
    }, [couponsLoading, couponsError, data]);

    if (couponsLoading)
        return (
            <div className="h-[400px]">
                <Loader />
            </div>
        );

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
                        {/* <TableContainer> */}
                        <TableContainer className="!overflow-visible !overflow-x-visible !overflow-y-visible">
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
                                        <CouponRow
                                            coupon={coupon}
                                            index={index}
                                            key={index}
                                            setEditCoupon={() => setEditCoupon(true)}
                                        />
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
            {editCoupon && <EditCoupon setEditCoupon={() => setEditCoupon(false)} />}
            {sendCoupon && <SendCouponsComponent setSendCoupon={() => setSendCoupon(false)} />}
        </div>
    );
}

export default CouponsPage;
