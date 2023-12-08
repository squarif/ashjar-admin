import { Input, useToast } from "@chakra-ui/react";

import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { ReactComponent as EqualIcon } from "../../../assets/EqualIcon.svg";
import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";

import { Textarea } from "@chakra-ui/react";
import DatePicker from "./components/DatePicker/DatePicker";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    totalBookingsSelector,
    workshopAmenities,
    workshopBookingsPayload,
    workshopCategories,
    workshopRequestPayload,
    workshopSelectedBranch,
} from "../../../stores/workshopStore";
import Branches from "./components/Bookings";
import Amenities from "../components/Amenities";

import Categories from "../components/Categories";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_WORKSHOP_REQUEST } from "../../../queries/workshopQueries";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ReactComponent as ChevronRight } from "../../../assets/ChevronRight.svg";
import { useEffect, useState } from "react";
import { GET_BRANCHES } from "../../../queries/branchesQueries";

function WorkshopCreatePost() {
    const [requestPayload, setWorkShopRequestPayload] = useRecoilState(workshopRequestPayload);
    const [workshopBookings, setWorkshopBookings] = useRecoilState(workshopBookingsPayload);

    const amenities = useRecoilValue(workshopAmenities);
    const categories = useRecoilValue(workshopCategories);

    const toast = useToast();
    const navigate = useNavigate();

    console.log("requestPayload", requestPayload);

    const [selectedBranch, setSelectedBranch] = useRecoilState(workshopSelectedBranch);
    const [branchData, setBranchData] = useState([]);
    const { loading: branchesLoading, error: branchesError, data } = useQuery(GET_BRANCHES);
    const totalBookings = useRecoilValue(totalBookingsSelector);

    useEffect(() => {
        if (!branchesLoading && !branchesError) {
            setBranchData(data.branches);
        }
    }, [branchesLoading, branchesError, data]);

    useEffect(() => {
        if (!Object.keys(requestPayload).length) {
            navigate("/workshops/requests");
        }
    }, [requestPayload]);

    const [updateWorkshopRequest] = useMutation(UPDATE_WORKSHOP_REQUEST);
    async function handleUpdateRequest() {
        if (parseInt(requestPayload.seats) === totalBookings) {
            try {
                let payload = {};

                payload = {
                    ...requestPayload,
                    bookings: workshopBookings.map(({ __typename, ...rest }) => rest),
                    amenities: amenities.map(({ __typename, ...rest }) => rest),
                    categories: categories.map(({ __typename, ...rest }) => rest),
                    approvalStatus: "approved",
                    pricePerSeat: requestPayload.pricePerSeat,
                    seats: parseInt(requestPayload.seats),
                    branch: selectedBranch._id,
                };

                if (payload.__typename) delete payload["__typename"];
                delete payload["draft"];
                delete payload["username"];
                delete payload["email"];
                delete payload["phone"];
                delete payload["company"];

                console.log("PAYLOAD", payload);
                const { data } = await updateWorkshopRequest({
                    mutation: UPDATE_WORKSHOP_REQUEST,
                    variables: {
                        input: payload,
                    },
                    // client: client,
                });
                if (data) {
                    toast({
                        title: "Workshop Posted!",
                        status: "success",
                    });

                    navigate("/workshops/requests");
                }
            } catch (error) {
                console.log(error);
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                });
            }
        } else {
            toast({
                title: "Error",
                description: `You need to select ${requestPayload.seats} seats on all days to continue`,
                status: "error",
            });
        }
    }

    function handleCancelRequest() {
        navigate("/workshops/requests");
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="title border rounded-2xl border-light px-8 py-12 flex flex-col gap-8">
                <div className="title mb-6 rounded-xl border overflow-hidden px-4">
                    <Input
                        variant="unstyled"
                        value={requestPayload.name}
                        placeholder="Enter workshop name"
                        className="py-4 "
                        onChange={(event) =>
                            setWorkShopRequestPayload({ ...requestPayload, name: event.target.value })
                        }
                    />
                </div>
                <div className="cost flex gap-12 items-center">
                    <div>
                        <span className="block mb-1.5 text-sm text-mediumGray">Price / Seat</span>
                        <div className="border rounded-2xl border-light px-4">
                            <Input
                                id="cost"
                                variant="unstyled"
                                value={requestPayload.pricePerSeat}
                                className="py-4 max-w-[143px]"
                                onChange={(event) =>
                                    setWorkShopRequestPayload({
                                        ...requestPayload,
                                        pricePerSeat: event.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <CloseIcon className="h-5 w-5 text-mediumGray" />
                    </div>

                    <div>
                        <span className="block mb-1.5 text-sm text-mediumGray">Total Seats</span>
                        <div className="border rounded-2xl border-light px-4">
                            <Input
                                id="seats"
                                type="number"
                                variant="unstyled"
                                value={requestPayload.seats}
                                className="py-4 max-w-[125px]"
                                onChange={(event) =>
                                    setWorkShopRequestPayload({
                                        ...requestPayload,
                                        seats: event.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="">
                        <EqualIcon />
                    </div>
                    <div className="text-primary text-[32px]">
                        SAR {requestPayload.seats * requestPayload.pricePerSeat}
                    </div>
                </div>
            </div>
            <div className="description flex gap-7 flex-col border rounded-2xl border-light px-8 py-12">
                <div className="text-left text-2xl">Description</div>
                <div className="border rounded-2xl bordr-light px-8 py-12">
                    <Textarea
                        value={requestPayload.description ? requestPayload.description : ""}
                        onChange={(event) =>
                            setWorkShopRequestPayload({ ...requestPayload, description: event.target.value })
                        }
                        placeholder="Here is a sample placeholder"
                        size="sm"
                    />
                </div>
            </div>

            <div className="location border rounded-2xl border-light px-8 py-12 flex flex-col gap-6">
                <div className="text-left text-2xl">Location</div>

                <div className="rounded-xl border  w-fit  flex justify-start">
                    <Menu autoSelect={false} closeOnBlur>
                        <MenuButton as="button" className="h-fit rounded-xl border ">
                            <div className="flex px-4 w-[312px] py-3 items-center justify-between">
                                {selectedBranch.name ? (
                                    <span className="text-dark">{selectedBranch.name}</span>
                                ) : (
                                    <span className="text-dark">Select a branch</span>
                                )}

                                <ChevronRight className="rotate-90 h-5 text-dark " />
                            </div>
                        </MenuButton>
                        <MenuList className="MenuList inset-0 w-[312px] left-[-200px]">
                            {branchData.map((branch, index) => {
                                return (
                                    <MenuItem key={index} onClick={() => setSelectedBranch(branch)}>
                                        {branch.name}
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                    </Menu>
                </div>
            </div>

            <div className="timings flex flex-col justify-between border rounded-2xl border-light px-8 py-12 gap-6">
                <div className="text-left text-2xl">Timings</div>

                {requestPayload.seats}

                {typeof requestPayload.seats}
                {totalBookings}

                {typeof totalBookings}
                <DatePicker />

                {/* <div className="border-r border-borderColor w-[1px] h-full"></div> */}

                {/* <div className="">
                    <div className="text-left text-2xl">Branches</div>
                </div> */}
            </div>

            <div className="amenities border rounded-2xl border-light px-8 py-12 ">
                <Amenities />
            </div>
            <div className="categories border rounded-2xl border-light px-8 py-12 ">
                <Categories />
            </div>
            <div className="buttons flex gap-6 w-full justify-end">
                <button
                    className="py-2 px-3 bg-errorLight flex justify-center items-center gap-2 flex-row rounded-xl border border-light"
                    onClick={() => handleCancelRequest()}>
                    <span className="text-mediumGray text-xl leading-none">Cancel </span>
                    <PlusIcon className="text-error rotate-45" />
                </button>
                <button
                    className="py-2 px-3 bg-primaryLight flex justify-center items-center gap-2 flex-row rounded-xl border border-light"
                    onClick={() => handleUpdateRequest()}>
                    <span className="text-mediumGray text-xl">Save as Draft </span>
                </button>
                <button
                    className="py-2 px-3 bg-primary flex justify-center items-center gap-2 flex-row rounded-xl"
                    onClick={() => handleUpdateRequest(true)}>
                    <span className="text-white text-xl leading-none">Create Post </span>
                    <PlusIcon className="text-white" />
                </button>
            </div>
        </div>
    );
}

export default WorkshopCreatePost;
