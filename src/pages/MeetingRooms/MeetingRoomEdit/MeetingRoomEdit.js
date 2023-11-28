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
                <div className="flex justify-between items-center">
                    <div className="text-left text-2xl">Opening Timings</div>
                    <button className="rounded-lg border border-borderColor px-3 py-2 bg-primaryLight flex gap-2.5 items-center">
                        <span className="text-lg leading-normal">Add Custom Dates</span>
                        <PlusIcon className="h-4 w-4 text-dark fill-dark " />
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {openDays.map((day, index) => (
                        <div key={index} className="flex gap-4 justify-between items-center h-9">
                            <span className="text-xl leading-normal text-mediumGray">{day.day}</span>

                            <div className="timeSelector flex items-center w-fit gap-9">
                                <div className="start-time flex py-2 px-4 items-center justify-center gap-3 w-full">
                                    <div className="border rounded border-mediumGray grid place-content-center">
                                        <Input
                                            id="starthour"
                                            variant="unstyled"
                                            value={day.startTime}
                                            className="text-xs 
																						input text-mediumGray leading-[18px] h-5  mx-1 my-0.5 "
                                            onChange={(event) =>
                                                handleTimeChange(index, "startTime", event.target.value)
                                            }
                                            type="time"
                                        />
                                    </div>

                                    {/* <span className="text-xs text-center font-normal">:</span>

                                    <div className="border rounded border-mediumGray grid place-content-center">
                                        <Input
                                            id="starthour"
                                            variant="unstyled"
                                            value={getMinutes(day.startTime)}
                                            className="text-xs text-mediumGray leading-[12px] h-5 max-w-[20px] mx-1 my-0.5"
                                            onChange={(event) => console.log(event.target.value)}
                                            maxLength={2}
                                        />
                                    </div> */}

                                    <div className="border rounded h-full w-[70px] flex">
                                        <label
                                            className={
                                                getAMPM(day.startTime) === "AM"
                                                    ? "bg-primary font-xs rounded-l"
                                                    : ""
                                            }>
                                            <input
                                                type="radio"
                                                value="AM"
                                                className="absolute hidden"
                                                checked={getAMPM(day.startTime) === "AM"}
                                                onChange={(event) =>
                                                    handleAMPMChange(index, day.startTime, event.target.value)
                                                }
                                            />
                                            <span className="block text-xs text-[#666666] px-2 py-1 font-medium">
                                                AM
                                            </span>
                                        </label>
                                        <label
                                            className={
                                                getAMPM(day.startTime) === "PM" ? "bg-primary rounded-r" : ""
                                            }>
                                            <input
                                                className="absolute hidden"
                                                type="radio"
                                                value="PM"
                                                checked={getAMPM(day.startTime) === "PM"}
                                                onChange={(event) => setStartAMPM(event.target.value)}
                                            />
                                            <span className="block text-xs text-[#666666] px-2 py-1 font-medium">
                                                PM
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <span className="text-base text-center font-normal">to</span>

                                <div className="end-time flex py-2 px-4 items-center justify-center gap-3 w-full">
                                    <div className="border rounded border-mediumGray grid place-content-center">
                                        <Input
                                            id="endhour"
                                            variant="unstyled"
                                            value={day.endTime}
                                            className="text-xs 
																						input
																						text-mediumGray leading-[18px] h-5 mx-1  my-0.5"
                                            onChange={(event) =>
                                                handleTimeChange(index, "endTime", event.target.value)
                                            }
                                            type="time"
                                            style={inputStyle}
                                        />
                                    </div>

                                    {/* <span className="text-xs text-center font-normal">:</span>

                                    <div className="border rounded border-mediumGray grid place-content-center">
                                        <Input
                                            id="endminute"
                                            variant="unstyled"
                                            value={getMinutes(day.endTime)}
                                            className="text-xs text-mediumGray leading-[12px] h-5 max-w-[20px] mx-1 my-0.5"
                                            onChange={(event) => console.log(event.target.value)}
                                        />
                                    </div> */}

                                    <div className="border rounded h-full w-[70px] flex">
                                        <label
                                            className={
                                                getAMPM(day.endTime) === "AM"
                                                    ? "bg-primary font-xs rounded-l"
                                                    : ""
                                            }>
                                            <input
                                                type="radio"
                                                value="AM"
                                                className="absolute hidden"
                                                checked={getAMPM(day.startTime) === "AM"}
                                                onChange={(event) => setEndAMPM(event.target.value)}
                                            />
                                            <span className="block text-xs text-[#666666] px-2 py-1 font-medium">
                                                AM
                                            </span>
                                        </label>
                                        <label
                                            className={
                                                getAMPM(day.endTime) === "PM" ? "bg-primary rounded-r" : ""
                                            }>
                                            <input
                                                className="absolute hidden"
                                                type="radio"
                                                value="PM"
                                                checked={getAMPM(day.startTime) === "PM"}
                                                onChange={(event) => setEndAMPM(event.target.value)}
                                            />
                                            <span className="block text-xs text-[#666666] px-2 py-1 font-medium">
                                                PM
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
