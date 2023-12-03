import { Input, useToast } from "@chakra-ui/react";

import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { ReactComponent as EqualIcon } from "../../../assets/EqualIcon.svg";
import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";

import { Textarea } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";

import Amenities from "./components/Amenities";
import { useState } from "react";
import MeetingRoomRates from "./components/Rates";
import {
    meetingRoomAmenitiesState,
    meetingRoomOpenDaysState,
    meetingRoomRatesState,
    editMeetingRoomRequest,
    meetingRoomPicturesState,
} from "../../../stores/meetingRoomStore";

import { EDIT_MEETING_ROOM } from "../../../queries/meetingRoomQueries";
import { useMutation } from "@apollo/client";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PicturesUpload from "../../../components/PictureUpload";
import PicturesGrid from "../../../components/PicturesGrid";
import OpenDays from "../../../components/OpenDays";

function MeetingRoomNew() {
    const [editMeetingRoomRequestPayload, setEditMeetingRoomPayload] = useRecoilState(editMeetingRoomRequest);
    const [openDays, setOpenDays] = useRecoilState(meetingRoomOpenDaysState);
    const rates = useRecoilValue(meetingRoomRatesState);
    const amenities = useRecoilValue(meetingRoomAmenitiesState);
    const [pictures, setPictures] = useRecoilState(meetingRoomPicturesState);
    const navigate = useNavigate();
    const toast = useToast();

    const [startAMPM, setStartAMPM] = useState("AM");
    const [endAMPM, setEndAMPM] = useState("AM");

    // let { state } = useLocation();
    let params = useParams();

    //  console.log("branch id", params);

    const handleTimeChange = (dayIndex, field, value) => {
        const updatedOpenDays = JSON.parse(JSON.stringify(openDays));
        updatedOpenDays[dayIndex][field] = value;
        setOpenDays(updatedOpenDays);
    };

    const handleAMPMChange = (dayIndex, field, value) => {
        const updatedOpenDays = JSON.parse(JSON.stringify(openDays));

        updatedOpenDays[dayIndex][field] = value;
        setOpenDays(updatedOpenDays);
    };

    const inputStyle = {
        /* Hide the time input's clock icon */
        WebkitAppearance: "none",
    };

    function getAMPM(time) {
        if (time.substring(0, 2) > 12) {
            return "PM";
        } else {
            return "AM";
        }
    }

    const [editMeetingRoom] = useMutation(EDIT_MEETING_ROOM);
    async function handleEditMeetingRoom() {
        let payload = {
            ...editMeetingRoomRequestPayload,
            customRates: rates.map(({ __typename, ...rest }) => rest),
            openDays: openDays.map(({ __typename, ...rest }) => rest),
            amenities: amenities.map(({ __typename, ...rest }) => rest),
            pictures: pictures,
            branch: params.id,
        };

        if (payload.__typename) delete payload["__typename"];
        if (payload.slotsBooked) delete payload["slotsBooked"];

        //  console.log("payload", payload);

        try {
            // console.log("CREATE_BRANCH", CREATE_BRANCH);
            const { data } = await editMeetingRoom({
                mutation: EDIT_MEETING_ROOM,
                variables: {
                    input: payload,
                },
                // client: client,
            });

            console.log(data);

            toast({
                title: "Meeting Room Updated!",
                status: "success",
            });

            navigate(`/meeting-rooms/${editMeetingRoomRequestPayload._id}`);
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
        <div className="flex flex-col gap-8">
            <div className="title border rounded-2xl border-light px-8 py-12 flex flex-col gap-8">
                <div className="title mb-6 rounded-xl border overflow-hidden px-4">
                    <Input
                        variant="unstyled"
                        value={editMeetingRoomRequestPayload.name}
                        placeholder="Enter Meeting Room Name"
                        className="py-4"
                        onChange={(event) =>
                            setEditMeetingRoomPayload({
                                ...editMeetingRoomRequestPayload,
                                name: event.target.value,
                            })
                        }
                    />
                </div>
                <div className="cost flex gap-12 items-center">
                    <div className="border rounded-2xl border-light px-4">
                        <Input
                            id="cost"
                            variant="unstyled"
                            type="number"
                            value={editMeetingRoomRequestPayload.totalSeats}
                            className="py-4 max-w-[143px]"
                            onChange={(event) =>
                                setEditMeetingRoomPayload({
                                    ...editMeetingRoomRequestPayload,
                                    totalSeats: parseInt(event.target.value),
                                })
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="description flex gap-7 flex-col border rounded-2xl border-light px-8 py-12">
                <div className="text-left text-2xl">Description</div>
                <div className="border rounded-2xl bordr-light px-8 py-12">
                    <Textarea
                        value={editMeetingRoomRequestPayload.description}
                        onChange={(event) =>
                            setEditMeetingRoomPayload({
                                ...editMeetingRoomRequestPayload,
                                description: event.target.value,
                            })
                        }
                        placeholder="Here is a sample placeholder"
                        size="sm"
                    />
                </div>
            </div>

            <div className="timings border rounded-2xl border-light px-8 py-12 flex flex-col gap-6">
                <OpenDays state={meetingRoomOpenDaysState} />
            </div>

            <div className="rates border rounded-2xl border-light px-8 py-12 ">
                <MeetingRoomRates />
            </div>
            <div className="amenities border rounded-2xl border-light px-8 py-12 ">
                <Amenities />
            </div>

            <PicturesGrid picturesState={meetingRoomPicturesState} />

            <div className="buttons  ">
                <button
                    className="p-4 bg-primary flex justify-center items-center gap-4 flex-col rounded-xl"
                    onClick={() => handleEditMeetingRoom()}>
                    <span className="text-white text-xl">Edit Meeting Room </span>
                </button>
            </div>
        </div>
    );
}

export default MeetingRoomNew;
