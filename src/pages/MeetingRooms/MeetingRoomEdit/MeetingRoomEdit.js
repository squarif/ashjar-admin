import { Input, useToast } from "@chakra-ui/react";

import { Textarea } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";

import Amenities from "../components/Amenities";
import { useState } from "react";
import {
    meetingRoomAmenitiesState,
    meetingRoomOpenDaysState,
    meetingRoomRatesState,
    editMeetingRoomRequest,
    meetingRoomPicturesState,
} from "../../../stores/meetingRoomStore";

import { EDIT_MEETING_ROOM } from "../../../queries/meetingRoomQueries";
import { useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import PicturesGrid from "../../../components/PicturesGrid";
import OpenDays from "../../../components/OpenDays";
import MeetingRoomRates from "../components/Rates";

function MeetingRoomNew() {
    const [editMeetingRoomRequestPayload, setEditMeetingRoomPayload] = useRecoilState(editMeetingRoomRequest);
    const [openDays, setOpenDays] = useRecoilState(meetingRoomOpenDaysState);
    const rates = useRecoilValue(meetingRoomRatesState);
    const amenities = useRecoilValue(meetingRoomAmenitiesState);
    const [pictures, setPictures] = useRecoilState(meetingRoomPicturesState);
    const navigate = useNavigate();
    const toast = useToast();

    const [editMeetingRoom] = useMutation(EDIT_MEETING_ROOM);
    async function handleEditMeetingRoom() {
        let payload = {
            ...editMeetingRoomRequestPayload,
            customRates: rates.map(({ __typename, ...rest }) => rest),
            openDays: openDays.map(({ __typename, ...rest }) => rest),
            amenities: amenities.map(({ __typename, ...rest }) => rest),
            pictures: pictures,
            branch: editMeetingRoomRequestPayload.branch._id,
        };

        if (payload.__typename) delete payload["__typename"];
        if (payload.slotsBooked) delete payload["slotsBooked"];

        console.log("payload", payload);

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
                <div className="title rounded-xl border border-light overflow-hidden px-4">
                    <Input
                        variant="unstyled"
                        value={editMeetingRoomRequestPayload.name}
                        placeholder="Enter Meeting Room Name"
                        style={{ fontSize: 24 }}
                        className="py-4"
                        onChange={(event) =>
                            setEditMeetingRoomPayload({
                                ...editMeetingRoomRequestPayload,
                                name: event.target.value,
                            })
                        }
                    />
                </div>
                <div className="flex flex-col gap-1 w-fit">
                    <span className="text-sm text-mediumGray">Total Seats</span>
                    <div className="border rounded-2xl border-light px-4">
                        <Input
                            id="cost"
                            variant="unstyled"
                            type="number"
                            value={editMeetingRoomRequestPayload.totalSeats}
                            style={{ fontSize: 20 }}
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
