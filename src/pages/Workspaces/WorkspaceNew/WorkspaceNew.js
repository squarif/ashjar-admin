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
import OpenDays from "../../../components/OpenDays";

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
                <OpenDays state={workspaceOpenDaysState} />
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
