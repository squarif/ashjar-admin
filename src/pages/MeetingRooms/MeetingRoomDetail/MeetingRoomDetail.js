import { ReactComponent as ClockIcon } from "../../../assets/ClockIcon.svg";
import { ReactComponent as EditIcon } from "../../../assets/EditIcon.svg";

import { useMutation, useQuery } from "@apollo/client";
import { GET_MEETING_ROOM, REMOVE_MEETING_ROOM } from "../../../queries/meetingRoomQueries";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
    editMeetingRoomRequest,
    meetingRoomAmenitiesState,
    meetingRoomCloseDaysState,
    meetingRoomCustomOpenHoursState,
    meetingRoomOpenDaysState,
    meetingRoomPicturesState,
    meetingRoomRatesState,
} from "../../../stores/meetingRoomStore";
import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import Maps from "../../../components/Maps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDate } from "../../../util/helpers";
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
import { DeleteIcon } from "@chakra-ui/icons";

function MeetingRoomDetails() {
    const { id } = useParams();
    let [amenities, setAmenitiesData] = useRecoilState(meetingRoomAmenitiesState);
    let [rates, setRatesData] = useRecoilState(meetingRoomRatesState);
    let [openDays, setOpenDays] = useRecoilState(meetingRoomOpenDaysState);
    let [closeDays, setCloseDays] = useRecoilState(meetingRoomCloseDaysState);
    let [pictures, setPictures] = useRecoilState(meetingRoomPicturesState);
    let [editMeetingRoom, setEditMeetingRoomPayload] = useRecoilState(editMeetingRoomRequest);
    let [customOpenHours, setCustomOpenHours] = useRecoilState(meetingRoomCustomOpenHoursState);

    const {
        loading: meetingRoomLoading,
        error: meetingRoomError,
        data,
    } = useQuery(GET_MEETING_ROOM, {
        variables: { id },
    });

    let meetingRoomData = data?.MeetingRoom;

    console.log("meetingRoomData?", meetingRoomData);

    useEffect(() => {
        if (!meetingRoomLoading && !meetingRoomError) {
            //  console.log("askjdnasjdnj");

            //  console.log("meetingRoomData?.amenities", meetingRoomData?.amenities);
            //  console.log("meetingRoomData?.customRates", meetingRoomData?.customRates);
            //  console.log("meetingRoomData?.openDays", meetingRoomData?.openDays);
            //  console.log("meetingRoomData?.pictures", meetingRoomData?.pictures);

            setAmenitiesData(meetingRoomData?.amenities);
            setRatesData(meetingRoomData?.customRates);
            setOpenDays(meetingRoomData?.openDays);
            setCustomOpenHours(meetingRoomData?.customOpenHours);
            setPictures(meetingRoomData?.pictures);
            setEditMeetingRoomPayload(meetingRoomData);
            setCloseDays(meetingRoomData?.closeDays)

            // let loc = JSON.parse(meetingRoomData?.branch.location);
            // console.log(loc, typeof loc);
        }
    }, [meetingRoomLoading, meetingRoomError, meetingRoomData, data]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [removeMeetingRoom, { removeData, removalloading, remvalError }] =
        useMutation(REMOVE_MEETING_ROOM);

    const toast = useToast();
    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate = useNavigate();

    async function deleteMeetingRoom() {
        try {
            setDeleteLoading(true);
            console.log({
                removeId: id,
                removalloading,
            });
            const { data } = await removeMeetingRoom({
                mutation: REMOVE_MEETING_ROOM,
                variables: {
                    input: { _id: id },
                },
                // client: client,
            });

            setDeleteLoading(false);
            toast({
                title: "Meeting Room Deleted!",
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

    if (meetingRoomLoading)
        return (
            <div className="h-[400px]">
                <Loader />
            </div>
        );
    else
        return (
            <div>
                {meetingRoomLoading ? (
                    "Loading Meeting Room Data"
                ) : (
                    <div className="grid border border-borderColor rounded-2xl grid-cols-10 p-8 divide-x-2 gap-8">
                        <div className="col-span-7 flex flex-col gap-8">
                            <div className="pictures grid grid-cols-5 grid-rows-2 gap-6">
                                {pictures?.map((picture, index) =>
                                    index === 0 ? (
                                        <div className="relative overflow-hidden rounded-2xl border col-span-3 row-span-2">
                                            <img alt="" src={picture} />
                                            <div className="bg-white h-[30px] w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-50">
                                                <span className="text-dark text-xs">
                                                    SAR {meetingRoomData?.ratesPerHour} / period
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="overflow-hidden border rounded-2xl">
                                            <img className="" alt="" src={picture} />
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="header flex flex-col gap-8">
                                <div className="flex justify-between items-center gap-6">
                                    <div className="flex gap-5 items-center">
                                        <span className=" text-[32px] leading-normal text-dark">
                                            {meetingRoomData?.name}
                                        </span>

                                        <span className="py-4 text-[24px] text leading-normal text-dark">
                                            {meetingRoomData?.totalSeats}
                                        </span>

                                        <Link
                                            to={`/meeting-rooms/${meetingRoomData?._id}/edit`}
                                            className="edit-button text-primary"
                                        >
                                            <EditIcon className="text-primary" />
                                        </Link>

                                        <Button
                                            className=" text-primaryLight"
                                            rightIcon={<DeleteIcon />}
                                            colorScheme="red"
                                            onClick={onOpen}
                                            isLoading={false}
                                        >
                                            <div className=" text-primaryLight">
                                                Delete Meeting Room
                                            </div>
                                        </Button>

                                        <AlertDialog
                                            isOpen={isOpen}
                                            leastDestructiveRef={cancelRef}
                                            onClose={onClose}
                                        >
                                            <AlertDialogOverlay>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader
                                                        fontSize="lg"
                                                        fontWeight="bold"
                                                    >
                                                        Delete Meeting Room
                                                    </AlertDialogHeader>

                                                    <AlertDialogBody>
                                                        Are you sure? You can't undo this action
                                                        afterwards.
                                                    </AlertDialogBody>

                                                    <AlertDialogFooter>
                                                        <Button ref={cancelRef} onClick={onClose}>
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            colorScheme="red"
                                                            onClick={deleteMeetingRoom}
                                                            ml={3}
                                                            isLoading={deleteLoading}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialogOverlay>
                                        </AlertDialog>
                                    </div>

                                    {/* <button className="rounded-xl font-sm font-medium text-dark border border-borderColor shadow-md px-3 py-2">
                                    View Schedule
                                </button> */}
                                </div>
                            </div>

                            <div className="h-[1px] w-full border-t border-borderColor"></div>

                            <div className="body flex gap-8 flex-col">
                                <div className="text-left text-mediumGray text-lg">
                                    {meetingRoomData?.description}
                                </div>

                                <div className="h-[1px] w-full border-t border-borderColor"></div>

                                <div className="text-left text-2xl">Amenities</div>

                                <div className="flex gap-12 items-center">
                                    {meetingRoomData?.amenities.map((amenity) => (
                                        <div className="flex items-center gap-2">
                                            {/* <FontAwesomeIcon
                                                icon={JSON.parse(amenity.picture)}
                                                className="text-[#838481]"
/> */}
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
                                <div className="h-[300px] w-full rounded-2xl overflow-hidden">
                                    {meetingRoomData?.branch && (
                                        <Maps
                                            center={
                                                JSON.parse(meetingRoomData?.branch?.location)
                                                    ?.location
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 px-8 flex flex-col gap-12">
                            <div className=" flex flex-col gap-6 ">
                                <div className="time-left flex gap-4 items-center justify-between  w-full py-3">
                                    <span className=" text-xl leading-6 text-dark">
                                        Opening Timings
                                    </span>
                                    <ClockIcon className="h-6 w-6 text-mediumGray font-normal" />
                                </div>
                                <div className="w-full h-[1px] border-t border-borderColor"></div>
                                <div className="flex flex-col gap-4">
                                    {meetingRoomData?.openDays?.map((day, index) => (
                                        <div key={index} className="flex justify-between gap-5">
                                            <span className="text-dark text-lg leading-normal">
                                                {day.day}
                                            </span>
                                            <span className="text-dark text-lg leading-normal">
                                                {day.startTime} - {day.endTime}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className=" flex flex-col gap-6">
                                <div className="time-left flex gap-4 items-center justify-between  w-full py-3">
                                    <span className=" text-xl leading-6 text-dark">
                                        Opening Hours
                                    </span>
                                    <ClockIcon className="h-6 w-6 text-mediumGray font-normal" />
                                </div>
                                <div className="w-full h-[1px] border-t border-borderColor"></div>
                                <div className="flex flex-col gap-4">
                                    {meetingRoomData?.customOpenHours.map((day, index) => (
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
                )}
            </div>
        );
}

export default MeetingRoomDetails;
