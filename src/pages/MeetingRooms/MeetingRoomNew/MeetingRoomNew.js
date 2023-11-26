import { Input } from "@chakra-ui/react";

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
    newMeetingRoomRequest,
    meetingRoomOpenDaysState,
    meetingRoomRatesState,
    meetingRoomPicturesState,
} from "../../../stores/meetingRoomStore";

import { CREATE_MEETING_ROOM } from "../../../queries/meetingRoomQueries";
import { useMutation } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PicturesUpload from "../../../components/PictureUpload";
import PicturesGrid from "../../../components/PicturesGrid";

function MeetingRoomNew() {
    const [newMeetingRoomRequestPayload, setNewMeetingRoomPayload] = useRecoilState(newMeetingRoomRequest);
    const [openDays, setOpenDays] = useRecoilState(meetingRoomOpenDaysState);
    const rates = useRecoilValue(meetingRoomRatesState);
    const amenities = useRecoilValue(meetingRoomAmenitiesState);
    const [pictures, setPictures] = useRecoilState(meetingRoomPicturesState);

    const [startAMPM, setStartAMPM] = useState("AM");
    const [endAMPM, setEndAMPM] = useState("AM");

    let { state } = useLocation();
    let navigate = useNavigate();

    //  console.log("branch id", state);

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

    const [createMeetingRoom] = useMutation(CREATE_MEETING_ROOM);
    async function handleAddMeetingRoom() {
        let payload = {
            ...newMeetingRoomRequestPayload,
            customRates: rates.map(({ __typename, ...rest }) => rest),
            openDays: openDays.map(({ __typename, ...rest }) => rest),
            amenities: amenities.map(({ __typename, ...rest }) => rest),
            pictures: pictures,
            branch: state.branch_id,
        };

        if (payload.__typename) delete payload["__typename"];

        //  console.log("payload", payload);
        try {
            // console.log("CREATE_BRANCH", CREATE_BRANCH);
            const { data } = await createMeetingRoom({
                mutation: CREATE_MEETING_ROOM,
                variables: {
                    input: payload,
                },
                // client: client,
            });
            //  console.log(data);

            navigate(`/branches/${state.branch_id}`);
        } catch (error) {
            console.log(error);
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
                            className="py-4"
                            onChange={(event) =>
                                setNewMeetingRoomPayload({
                                    ...newMeetingRoomRequestPayload,
                                    name: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col w-fit gap-1.5">
                        <span className="text-sm text-mediumGray">Total Seats</span>
                        <div className="border rounded-2xl border-light px-4">
                            <Input
                                id="cost"
                                variant="unstyled"
                                type="number"
                                value={newMeetingRoomRequestPayload.totalSeats}
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
                    <div className="border rounded-2xl bordr-light px-8 py-12">
                        <Textarea
                            value={newMeetingRoomRequestPayload.description}
                            onChange={(event) =>
                                setNewMeetingRoomPayload({
                                    ...newMeetingRoomRequestPayload,
                                    description: event.target.value,
                                })
                            }
                            placeholder="Please write description here"
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
                                                        handleAMPMChange(
                                                            index,
                                                            day.startTime,
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                                <span className="block text-xs text-[#666666] px-2 py-1 font-medium">
                                                    AM
                                                </span>
                                            </label>
                                            <label
                                                className={
                                                    getAMPM(day.startTime) === "PM"
                                                        ? "bg-primary rounded-r"
                                                        : ""
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
                                                    getAMPM(day.endTime) === "PM"
                                                        ? "bg-primary rounded-r"
                                                        : ""
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
