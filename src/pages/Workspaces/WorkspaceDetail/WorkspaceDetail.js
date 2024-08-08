import { ReactComponent as ClockIcon } from "../../../assets/ClockIcon.svg";
import { ReactComponent as EditIcon } from "../../../assets/EditIcon.svg";

import { useRecoilState } from "recoil";

import { Link, useNavigate, useParams } from "react-router-dom";

import {
    editWorkspaceRequest,
    workspaceAmenitiesState,
    workspaceBaseRatesState,
    workspaceCloseDaysState,
    workspaceCustomOpenHoursState,
    workspaceCustomRatesState,
    workspaceOpenDaysState,
    workspacePicturesState,
} from "../../../stores/workspaceStore";
import { useMutation, useQuery } from "@apollo/client";
import { GET_WORKSPACE, REMOVE_WORKSPACE } from "../../../queries/workspaceQueries";
import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import Maps from "../../../components/Maps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DeleteIcon } from "@chakra-ui/icons";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button,
    useToast,
} from "@chakra-ui/react";

function WorkspaceDetail() {
    // const [workspaceData, setWorkShopRequestPayload] = useRecoilState(workshopRequestPayload);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const { id } = useParams();
    let [amenities, setAmenitiesData] = useRecoilState(workspaceAmenitiesState);
    let [baseRates, setBaseRates] = useRecoilState(workspaceBaseRatesState);
    let [customRates, setCustomRates] = useRecoilState(workspaceCustomRatesState);
    let [openDays, setOpenDays] = useRecoilState(workspaceOpenDaysState);
    let [closeDays, setCloseDays] = useRecoilState(workspaceCloseDaysState)
    let [customOpenHours, setCustomOpenHours] = useRecoilState(workspaceCustomOpenHoursState);
    let [pictures, setPictures] = useRecoilState(workspacePicturesState);
    let [editworkspace, setEditWorkspacePayload] = useRecoilState(editWorkspaceRequest);
    const [removeWorkSpace, {}] = useMutation(REMOVE_WORKSPACE);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const {
        loading: workspaceLoading,
        error: workspaceError,
        data,
    } = useQuery(GET_WORKSPACE, {
        variables: { id },
    });

    let workspaceData = data?.WorkSpace;

    console.log("workspaceData", workspaceData);
    const toast = useToast();
    const navigate = useNavigate();

    async function deleteWorkspace() {
        try {
            setDeleteLoading(true);
            console.log({
                removeId: id,
            });
            const { data } = await removeWorkSpace({
                mutation: REMOVE_WORKSPACE,
                variables: {
                    input: { _id: id },
                },
                // client: client,
            });

            setDeleteLoading(false);
            toast({
                title: "Worskpace Deleted!",
                status: "success",
            });

            navigate("/branches");
        } catch (error) {
            console.log({ error });
            toast({
                title: "Error",
                description: error.message,
                status: "error",
            });
        }
    }

    useEffect(() => {
        if (!workspaceLoading && !workspaceError) {
            //  console.log("askjdnasjdnj");

            //  console.log("workspaceData.amenities", workspaceData.amenities);
            //  console.log("workspaceData.customRates", workspaceData.customRates);
            //  console.log("workspaceData.openDays", workspaceData.openDays);

            setAmenitiesData(workspaceData.amenities);
            setBaseRates(workspaceData.baseRates);
            setCustomRates(workspaceData.customRates);
            setOpenDays(workspaceData.openDays);
            setPictures(workspaceData.pictures);
            setCustomOpenHours(workspaceData.customOpenHours);
            setCloseDays(workspaceData.closeDays);
            setEditWorkspacePayload(workspaceData);
        }
    }, [workspaceLoading, workspaceError, data]);

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

    if (workspaceLoading)
        return (
            <div className="h-[400px]">
                <Loader />
            </div>
        );
    return (
        <div className="grid  grid-cols-10 p-8 divide-x-2 gap-8">
            <div className="col-span-7 flex flex-col gap-8">
                <div className="pictures grid grid-cols-5 grid-rows-2 gap-6">
                    {pictures.map((picture, index) => {
                        return index === 0 ? (
                            <div className="flex relative overflow-hidden rounded-2xl border col-span-3 row-span-2">
                                <img className="object-cover" alt="" src={picture} />
                                {/* <div className="bg-white h-[30px] w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-50">
                                    <span className="text-dark text-xs">
                                        SAR {workspaceData.ratesPerHour} / period
                                    </span>
                                </div> */}
                            </div>
                        ) : (
                            <div className="overflow-hidden border rounded-2xl flex">
                                <img className="object-cover" alt="" src={picture} />
                            </div>
                        );
                    })}
                </div>

                <div className="header flex flex-col gap-8">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-5 items-center">
                            <span className="py-4 text-[32px] leading-normal text-dark">
                                {workspaceData.name}
                            </span>

                            <span className="py-4 text-[24px] text leading-normal text-dark">
                                {workspaceData.totalSeats}
                            </span>

                            <Link
                                to={`/workspaces/${workspaceData._id}/edit`}
                                className="edit-button text-primary"
                            >
                                <EditIcon className="text-primary" />
                            </Link>
                            <Button
                                className=" text-primaryLight"
                                colorScheme="red"
                                onClick={onOpen}
                            >
                                Delete Workspace
                            </Button>

                            <AlertDialog
                                isOpen={isOpen}
                                leastDestructiveRef={cancelRef}
                                onClose={onClose}
                            >
                                <AlertDialogOverlay>
                                    <AlertDialogContent>
                                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                            Delete Workspace
                                        </AlertDialogHeader>

                                        <AlertDialogBody>
                                            Are you sure? You can't undo this action afterwards.
                                        </AlertDialogBody>

                                        <AlertDialogFooter>
                                            <Button ref={cancelRef} onClick={onClose}>
                                                Cancel
                                            </Button>
                                            <Button
                                                colorScheme="red"
                                                onClick={deleteWorkspace}
                                                isLoading={deleteLoading}
                                                ml={3}
                                            >
                                                Delete
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
                        </div>
                    </div>
                </div>

                <div className="h-[1px] w-full border-t border-borderColor"></div>

                <div className="body flex gap-8 flex-col">
                    <div className="text-left text-mediumGray text-lg">
                        {workspaceData.description}
                    </div>

                    <div className="h-[1px] w-full border-t border-borderColor"></div>

                    <div className="text-left text-2xl">Amenities</div>

                    <div className="flex gap-12 items-center">
                        {workspaceData.amenities.map((amenity) => (
                            <div className="flex items-center gap-2">
                                <img
                                    className="object-cover"
                                    height="24"
                                    width="24"
                                    alt=""
                                    src={amenity.picture}
                                />
                                <span className="capitalize text-sm text-dark font-normal leading-6">
                                    {amenity.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="h-[1px] w-full border-t border-borderColor"></div>

                    <div className="text-left text-2xl">Location</div>
                    {workspaceData.branch.location && (
                        <div className="h-[300px] w-full rounded-2xl overflow-hidden">
                            <Maps center={JSON.parse(workspaceData.branch.location).location} />
                        </div>
                    )}
                </div>
            </div>
            <div className="col-span-3 px-8 flex flex-col gap-12 ">
                <div className="flex flex-col gap-6">
                    <div className="time-left flex gap-4 items-center justify-between  w-full">
                        <span className="text-xl leading-6 text-dark">Base Rates</span>
                    </div>
                    <div className="w-full h-[1px] border-t border-borderColor"></div>
                    <div className="flex flex-col gap-4">
                        {workspaceData.baseRates.map((rate, index) => (
                            <div key={index} className="flex justify-between">
                                <span className="text-mediumGray text-lg leading-normal">
                                    {rate.startTime} - {rate.endTime}
                                </span>
                                <span className="text-mediumGray text-lg leading-normal">
                                    SAR {rate.rate}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <div className="time-left flex gap-4 items-center justify-between  w-full">
                            <span className="text-xl leading-6 text-dark">Custom Rates</span>
                        </div>
                        <div className="w-full h-[1px] border-t border-borderColor"></div>
                        <div className="flex flex-col gap-4">
                            {workspaceData.customRates.map((rate, index) => (
                                <div key={index} className="flex justify-between flex-col gap-6">
                                    <span className="text-dark text-lg leading-normal">
                                        From {getDate(rate.startDate)} to {getDate(rate.endDate)}
                                    </span>
                                    <div key={index} className="flex flex-col gap-4">
                                        {rate.ratesInSlot.map((rate, index) => (
                                            <div key={index} className="flex justify-between">
                                                <span className="text-mediumGray text-lg leading-normal">
                                                    {rate.startTime} - {rate.endTime}
                                                </span>
                                                <span className="text-mediumGray text-lg leading-normal">
                                                    SAR {rate.rate}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-6">
                            <div className="time-left flex gap-4 items-center justify-between  w-full">
                                <span className=" text-xl leading-6 text-dark">
                                    Opening Timings
                                </span>
                                <ClockIcon className="h-6 w-6 text-mediumGray font-normal" />
                            </div>
                            <div className="w-full h-[1px] border-t border-borderColor"></div>
                            <div className="flex flex-col gap-4">
                                {workspaceData.openDays.map((day, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span className="text-mediumGray text-lg leading-normal">
                                            {day.day}
                                        </span>
                                        <span className="text-mediumGray text-lg leading-normal">
                                            {day.startTime} - {day.endTime}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="time-left flex gap-4 items-center justify-between  w-full">
                                <span className=" text-xl leading-6 text-dark">Opening Hours</span>
                                <ClockIcon className="h-6 w-6 text-mediumGray font-normal" />
                            </div>
                            <div className="w-full h-[1px] border-t border-borderColor"></div>
                            <div className="flex flex-col gap-4">
                                {workspaceData.customOpenHours.map((day, index) => (
                                    <div key={index} className="flex justify-between gap-5">
                                        <span className="text-mediumGray text-lg leading-normal">
                                            {getDate(day.startDate)} - {getDate(day.endDate)}
                                        </span>
                                        <span className="text-mediumGray text-lg leading-normal">
                                            {day.startTime} - {day.endTime}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkspaceDetail;
