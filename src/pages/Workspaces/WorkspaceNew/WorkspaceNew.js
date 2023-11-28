import { Input } from "@chakra-ui/react";

import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { ReactComponent as EqualIcon } from "../../../assets/EqualIcon.svg";
import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";

import { Textarea } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";

import { useState } from "react";

import {
    workspaceAmenitiesState,
    workspacePicturesState,
    newWorkspaceRequest,
    workspaceOpenDaysState,
    workspaceBaseRatesState,
    workspaceCustomRatesState,
} from "../../../stores/workspaceStore";

import { CREATE_WORKSPACE } from "../../../queries/workspaceQueries";
import { useMutation } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import PicturesGrid from "../../../components/PicturesGrid";
import WorkspaceRates from "../components/Rates";

import Amenities from "../components/Amenities";

function WorkspaceNew() {
    const [newWorkspaceRequestPayload, setNewWorkspacePayload] = useRecoilState(newWorkspaceRequest);

    const [pictures, setPictures] = useRecoilState(workspacePicturesState);
    const [openDays, setOpenDays] = useRecoilState(workspaceOpenDaysState);
    const amenities = useRecoilValue(workspaceAmenitiesState);
    const [baseRates, setBaseRates] = useRecoilState(workspaceBaseRatesState);
    const [customRates, setCustomRates] = useRecoilState(workspaceCustomRatesState);

    const [startAMPM, setStartAMPM] = useState("AM");
    const [endAMPM, setEndAMPM] = useState("AM");

    let { state } = useLocation();

    const navigate = useNavigate();

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

    const [createWorkspace] = useMutation(CREATE_WORKSPACE);
    async function handleAddWorkspace() {
        // "name"
        // "description"
        // "openDays"
        // "branch"
        // "totalSeats"
        // "ratePerInterval"
        // "baseRates"
        // "customRates"
        // "amenities"
        // "pictures"
        // "slotsInterval"

        let payload = {
            ...newWorkspaceRequestPayload,
            openDays: openDays,
            branch: state.branch_id,
            baseRates: baseRates,
            customRates: customRates,
            amenities: amenities,
            pictures: pictures,
        };

        console.log("payload", payload);
        try {
            // console.log("CREATE_BRANCH", CREATE_BRANCH);
            const { data } = await createWorkspace({
                mutation: CREATE_WORKSPACE,
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
        <div className="flex flex-col gap-8">
            <div className="title border rounded-2xl border-light px-8 py-12 flex flex-col gap-8">
                <div className="title rounded-xl border border-light overflow-hidden px-4">
                    <Input
                        variant="unstyled"
                        value={newWorkspaceRequestPayload.name}
                        placeholder="Enter Workspace Name"
                        className="py-4"
                        onChange={(event) =>
                            setNewWorkspacePayload({
                                ...newWorkspaceRequestPayload,
                                name: event.target.value,
                            })
                        }
                    />
                </div>

                <div className="flex flex-row gap-4">
                    <div className="cost flex flex-col w-fit gap-1.5">
                        <span className="text-sm text-mediumGray">Total Seats</span>
                        <div className="border rounded-2xl border-light px-4">
                            <Input
                                id="cost"
                                variant="unstyled"
                                type="number"
                                value={newWorkspaceRequestPayload.totalSeats}
                                className="py-4 max-w-[143px]"
                                onChange={(event) =>
                                    setNewWorkspacePayload({
                                        ...newWorkspaceRequestPayload,
                                        totalSeats: parseInt(event.target.value),
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="cost flex flex-col w-fit gap-1.5">
                        <span className="text-sm text-mediumGray">Rate per Interval</span>
                        <div className="border rounded-2xl border-light px-4">
                            <Input
                                id="cost"
                                variant="unstyled"
                                type="number"
                                value={newWorkspaceRequestPayload.ratePerInterval}
                                className="py-4 max-w-[143px]"
                                onChange={(event) =>
                                    setNewWorkspacePayload({
                                        ...newWorkspaceRequestPayload,
                                        ratePerInterval: parseInt(event.target.value),
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="description flex gap-7 flex-col border rounded-2xl border-light px-8 py-12">
                <div className="text-left text-2xl">Description</div>
                <div className="border rounded-2xl bordr-light px-8 py-12">
                    <Textarea
                        value={newWorkspaceRequestPayload.description}
                        onChange={(event) =>
                            setNewWorkspacePayload({
                                ...newWorkspaceRequestPayload,
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
                <WorkspaceRates />
            </div>
            <div className="amenities border rounded-2xl border-light px-8 py-12 ">
                <Amenities />
            </div>

            <PicturesGrid picturesState={workspacePicturesState} />

            <div className="buttons  ">
                <button
                    className="py-2 px-3 bg-primary flex justify-center items-center gap-2 rounded-xl"
                    onClick={() => handleAddWorkspace()}>
                    <span className="text-white text-xl">Add Workspace</span>
                    <PlusIcon className="text-white" />
                </button>
            </div>
        </div>
    );
}

export default WorkspaceNew;
