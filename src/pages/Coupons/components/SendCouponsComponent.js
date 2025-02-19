import { useState, useEffect } from "react";
import { Input, useToast } from "@chakra-ui/react";
import { GET_USERS } from "../../../queries/userQueries";
// import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";
import { useQuery } from "@apollo/client";
import { QRCodeSVG } from "qrcode.react";
import { useRecoilState, useRecoilValue } from "recoil";
import { sendCouponState } from "../../../stores/couponsStore";
import { Pagination } from "antd";

function SendCouponsComponent() {
    const [sendCoupon, setSendCoupon] = useRecoilState(sendCouponState);
    const [searchQuery, setSearchQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const itemsPerPage = 8;

    const [selectedList, setSelectedList] = useState([]);

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

    function filteredList(items) {
        return items.filter(
            (item) =>
                item.name.toLowerCase().includes(searchQuery) ||
                item._id.toLowerCase().includes(searchQuery) ||
                item.phoneNumber.includes(searchQuery)
        );
    }

    function paginatedList(items) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredList(items.slice(startIndex, endIndex));
    }

    const toast = useToast();

    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState("");
    const [msg, setMessage] = useState("");
    const [qrcode, setQRCode] = useState(false);

    function handleSelectUser(user) {
        console.log("handleSelectUser", user);

        setSelectedList([...selectedList, user]);
    }

    function handleDeselectUser(index) {
        const updatedList = JSON.parse(JSON.stringify(selectedList));
        updatedList.splice(index, 1);
        setSelectedList(updatedList);
    }

    const getQRCode = async () => {
        setLoading(true);

        // whatsappApi
        //     .start({ qrCodeData: true, session: false, showBrowser: false })
        //     .then(async (qrCodeData) => {
        //         console.log(qrCodeData); // show data used to generate QR Code
        //         // res.send(qrCodeData);
        //         setQRCode(qrCodeData);
        //         await whatsappApi.waitQRCode();

        //         const phones = [phone];
        //         const message = msg;

        //         await whatsappApi.send(phones, message);
        //         await whatsappApi.end();
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        // const res = await axios.post("/api", { phone, msg });

        setLoading(false);
    };
    function handleSendCoupon(user) {
        // Regex expression to remove all characters which are NOT alphanumeric
        // let number = user.phoneNumber.replace(/[^\w\s]/gi, "").replace(/ /g, "");

        // Appending the phone number to the URL
        // let url = `https://web.whatsapp.com/send?phone=${+923318549269}`;
        let url = `https://web.whatsapp.com/send?phone=${user.phoneNumber}`;

        // console.log("coupon", sendCoupon.couponCode);
        // Appending the message to the URL by encoding it
        url += `&text=${encodeURI(sendCoupon.couponCode)}&app_absent=0`;

        // console.log("URL", url);
        // Open our newly created URL in a new tab to send the message
        window.open(url);
    }

    return (
        <div className="">
            <div
                onClick={() => setSendCoupon(null)}
                className="fixed bg-dark bg-opacity-50 top-0 bottom-0 left-0 right-0 w-[100vw] h-[100vh] backdrop-blur-sm"></div>

            <div className="top-0 bottom-0 left-0 right-0 p-8 mx-auto my-auto gap-12 shadow-lg flex w-fit h-fit absolute bg-white z-10 flex-col rounded-lg text-mediumGray text-sm text-center border border-borderColor">
                <span className="text-[32px] text-mediumGray text-left">Add New Coupon</span>

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 flex flex-col gap-4">
                        <div className="Search rounded-xl border overflow-hidden px-4 shadow-md ">
                            <Input
                                variant="unstyled"
                                value={searchQuery}
                                placeholder="Search"
                                className=" py-3 px-6 w-[430px] "
                                onChange={(event) => setSearchQuery(event.target.value)}
                            />
                        </div>

                        <div className="rounded-xl border overflow-hidden px-4 shadow-md">
                            <TableContainer className="!overflow-visible !overflow-x-visible !overflow-y-visible">
                                <Table variant="simple">
                                    <Thead className="h-[60px]">
                                        <Tr>
                                            <Th>
                                                <span className="text-light">Name</span>
                                            </Th>
                                            <Th>
                                                <span className="text-light"> Phone Number</span>
                                            </Th>
                                            <Th>
                                                <span className="text-light"></span>
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {paginatedList(userData).map((user, index) => (
                                            <Tr key={index}>
                                                <Td className="text-base leading-none text-mediumGray">
                                                    {user.name}
                                                </Td>

                                                <Td className="text-base leading-none text-mediumGray">
                                                    {user.phoneNumber}
                                                </Td>
                                                {/* <Td>{statusBadge(user.isBlocked)}</Td> */}
                                                {/* <Td className="relative">
                                                    <button
                                                        onClick={() => handleSelectUser(user)}
                                                        className="flex gap-2 px-3 py-2 bg-primaryLight border border-borderColor rounded-xl items-center">
                                                        <PlusIcon className="h-4 w-4 text-primary" />
                                                        <span className="text-base leading-none text-mediumGray">
                                                            Add
                                                        </span>
                                                    </button>
                                                </Td> */}
                                                <Td className="relative">
                                                    <button
                                                        onClick={() => handleSendCoupon(user)}
                                                        className="flex gap-2 px-3 py-2 bg-primaryLight border border-borderColor rounded-xl items-center">
                                                        <PlusIcon className="h-4 w-4 text-primary" />
                                                        <span className="text-base leading-none text-mediumGray">
                                                            Send
                                                        </span>
                                                    </button>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </div>
                        <Pagination
                            className="p-4"
                            defaultCurrent={pageNumber}
                            total={userData.length}
                            pageSize={itemsPerPage}
                            onChange={(x) => setPageNumber(x)}
                        />
                    </div>
                    {/* <div className="col-span-5 rounded-xl border overflow-hidden py-6 shadow-md divide-y divide-borderColor ">
                        <div className="text-base text-mediumGray leading-none mb-4">Selected Users</div>

                        {selectedList.map((user, index) => (
                            <div key={index} className="flex justify-between items-center px-6 py-3">
                                <div>{user.name}</div>
                                <button
                                    onClick={() => handleDeselectUser(index)}
                                    className="border rounded-xl bg-errorLight border-light flex gap-2 py-1.5 px-2 items-center ">
                                    <CloseIcon className="h-4 w-4 text-error" />
                                    <span className="text-sm leading-4 text-gray-600"> Remove</span>
                                </button>
                            </div>
                        ))}
                    </div> */}
                </div>

                <div className="flex justify-end gap-6">
                    <button
                        onClick={() => setSendCoupon(null)}
                        className="py-2.5 px-3 flex justify-center items-center gap-2 rounded-lg border border-error">
                        <span className="text-mediumGray text-sm font-medium">Cancel</span>
                    </button>
                    {/* <button
                        onClick={() => handleCreateCoupon()}
                        className="py-2.5 px-3 bg-primary flex justify-center items-center gap-2 rounded-lg">
                        <span className="text-white text-sm font-medium">Send Coupon</span>
                    </button> */}
                </div>

                {!loading && qrcode && (
                    <div style={{ margin: "100px" }}>
                        <QRCodeSVG value={qrcode} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SendCouponsComponent;
