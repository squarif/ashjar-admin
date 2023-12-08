import { Input, useToast } from "@chakra-ui/react";

import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { ReactComponent as EqualIcon } from "../../../assets/EqualIcon.svg";
import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";

import { Textarea } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";

import Amenities from "../components/Amenities";
import { useState } from "react";
import MeetingRoomRates from "../components/Rates";
import {
    meetingRoomAmenitiesState,
    newMeetingRoomRequest,
    meetingRoomOpenDaysState,
    meetingRoomRatesState,
    meetingRoomPicturesState,
} from "../../../stores/meetingRoomStore";

import { CREATE_MEETING_ROOM } from "../../../queries/meetingRoomQueries";
import { useMutation } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PicturesGrid from "../../../components/PicturesGrid";
import OpenDays from "../../../components/OpenDays";

function MeetingRoomNew() {
    const [newMeetingRoomRequestPayload, setNewMeetingRoomPayload] = useRecoilState(newMeetingRoomRequest);
    const [openDays, setOpenDays] = useRecoilState(meetingRoomOpenDaysState);
    const rates = useRecoilValue(meetingRoomRatesState);
    const amenities = useRecoilValue(meetingRoomAmenitiesState);
    const [pictures, setPictures] = useRecoilState(meetingRoomPicturesState);

    const { state } = useLocation();

    const toast = useToast();

    const [createMeetingRoom] = useMutation(CREATE_MEETING_ROOM);
    async function handleAddMeetingRoom() {
        let payload = {
            ...newMeetingRoomRequestPayload,
            customRates: rates.map(({ __typename, ...rest }) => rest),
            openDays: openDays.map(({ __typename, ...rest }) => rest),
            amenities: amenities.map(({ __typename, ...rest }) => rest),
            pictures: pictures,
            branch: state.branch_id,
            ratesPerHour: parseFloat(newMeetingRoomRequestPayload.ratesPerHour),
        };

        if (payload.__typename) delete payload["__typename"];

        console.log("payload", payload);
        try {
            // console.log("CREATE_BRANCH", CREATE_BRANCH);
            const { data } = await createMeetingRoom({
                mutation: CREATE_MEETING_ROOM,
                variables: {
                    input: payload,
                },
                // client: client,
            });
            console.log(data);

            toast({
                title: "New Meeting Room Created!",
                status: "success",
            });

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
        <div className="new-meeting-room">
            <Breadcrumbs />
            <div className="flex flex-col gap-8">
                <div className="title border rounded-2xl border-light px-8 py-12 flex flex-col gap-8">
                    <div className="title rounded-xl border border-light overflow-hidden px-4">
                        <Input
                            variant="unstyled"
                            value={newMeetingRoomRequestPayload.name}
                            placeholder="Enter Meeting Room Name"
                            style={{ fontSize: 24 }}
                            className="py-4"
                            onChange={(event) =>
                                setNewMeetingRoomPayload({
                                    ...newMeetingRoomRequestPayload,
                                    name: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col w-fit gap-1">
                        <span className="text-sm text-mediumGray">Total Seats</span>
                        <div className="border rounded-2xl border-light px-4">
                            <Input
                                id="cost"
                                variant="unstyled"
                                type="number"
                                value={newMeetingRoomRequestPayload.totalSeats}
                                style={{ fontSize: 20 }}
                                className="py-4 max-w-[143px]"
                                onChange={(event) =>
                                    setNewMeetingRoomPayload({
                                        ...newMeetingRoomRequestPayload,
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
                        variant="unstyled"
                        value={newMeetingRoomRequestPayload.description}
                        onChange={(event) =>
                            setNewMeetingRoomPayload({
                                ...newMeetingRoomRequestPayload,
                                description: event.target.value,
                            })
                        }
                        placeholder="Please write description here"
                        size="sm"
                        style={{ borderRadius: 16 }}
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
                        className="py-2 px-3 bg-primary flex justify-center items-center gap-2 flex-row rounded-xl"
                        onClick={() => handleAddMeetingRoom()}>
                        <span className="text-white text-xl">Add Meeting Room </span>
                        <PlusIcon className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MeetingRoomNew;
