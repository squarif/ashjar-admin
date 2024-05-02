import { Input, useToast } from "@chakra-ui/react";

import { ReactComponent as ChevronRight } from "../../../assets/ChevronRight.svg";
import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";

import { Textarea } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import Amenities from "../../../components/Amenities";
import { useEffect, useState } from "react";
import {
    workspaceAmenitiesState,
    workspaceOpenDaysState,
    editWorkspaceRequest,
    workspacePicturesState,
    workspaceBaseRatesState,
    workspaceCustomRatesState,
    workspaceCustomOpenHoursState,
} from "../../../stores/workspaceStore";

import { EDIT_WORKSPACE } from "../../../queries/workspaceQueries";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import WorkspaceRates from "../components/Rates";
import PicturesGrid from "../../../components/PicturesGrid";
import OpenDays from "../../../components/OpenDays";
import { GET_BRANCHES } from "../../../queries/branchesQueries";
import Loader from "../../../components/Loader";

function WorkspaceNew() {
    const [editWorkspaceRequestPayload, setEditWorkspacePayload] =
        useRecoilState(editWorkspaceRequest);
    const openDays = useRecoilValue(workspaceOpenDaysState);
    const customOpenHours = useRecoilValue(workspaceCustomOpenHoursState);
    const pictures = useRecoilValue(workspacePicturesState);

    const baseRates = useRecoilValue(workspaceBaseRatesState);
    const customRates = useRecoilValue(workspaceCustomRatesState);
    const amenities = useRecoilValue(workspaceAmenitiesState);
    const [totalSeatsInput, setTotalSeatsInput] = useState(editWorkspaceRequestPayload.totalSeats);

    let params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!Object.keys(editWorkspaceRequestPayload).length) {
            navigate(`/workspaces/${params.id}`);
        }
    }, [editWorkspaceRequestPayload]);

    // Other state variables and hooks...

    useEffect(() => {
        setTotalSeatsInput(editWorkspaceRequestPayload.totalSeats);
    }, [editWorkspaceRequestPayload.totalSeats]);

    console.log(editWorkspaceRequestPayload.branch);
    const [selectedBranch, setSelectedBranch] = useState(editWorkspaceRequestPayload.branch);
    const [branchData, setBranchData] = useState([]);
    const { loading: branchesLoading, error: branchesError, data } = useQuery(GET_BRANCHES);
    useEffect(() => {
        if (!branchesLoading && !branchesError) {
            setBranchData(data.branches);
        }
    }, [branchesLoading, branchesError, data]);

    const toast = useToast();
    function validateInputs() {
        if (!editWorkspaceRequestPayload.name.length) {
            toast({
                title: "workspace name cannot be empty",
                status: "error",
            });
            return false;
        }

        if (!editWorkspaceRequestPayload.description) {
            toast({
                title: "workspace description cannot be empty",
                status: "error",
            });
            return false;
        }

        if (!selectedBranch._id) {
            toast({
                title: "Please select a branch",
                status: "error",
            });
            return false;
        }

        if (editWorkspaceRequestPayload.totalSeats < 0) {
            toast({
                title: "Please enter seats",
                status: "error",
            });
            return false;
        }

        if (
            amenities.some(amenity => {
                return !amenity.name.length;
            })
        ) {
            toast({
                title: "Amenity name cannot be empty",
                status: "error",
            });
            return false;
        }

        console.log({ baseRates });

        if (baseRates.length < 1 || baseRates.some(rate => !rate.rate || rate.rate < 0)) {
            toast({
                title: "Rates Error: Add Morning, Afternoon & Evening Rates",
                status: "error",
            });
            return false;
        }

        function isOverlapping(interval1, interval2) {
            // Convert start and end times to milliseconds
            const [startHour1, startMinute1] = interval1.startTime.split(":").map(Number);
            const [endHour1, endMinute1] = interval1.endTime.split(":").map(Number);
            const [startHour2, startMinute2] = interval2.startTime.split(":").map(Number);
            const [endHour2, endMinute2] = interval2.endTime.split(":").map(Number);

            // Convert start and end times to total minutes
            const start1 = startHour1 * 60 + startMinute1;
            const end1 = endHour1 * 60 + endMinute1;
            const start2 = startHour2 * 60 + startMinute2;
            const end2 = endHour2 * 60 + endMinute2;

            // Check if start time is smaller than end time within each interval
            if (start1 >= end1 || start2 >= end2) {
                toast({
                    title: "Invalid interval: Start time must be smaller than end time",
                    status: "error",
                });
                return true;
            }

            // Check for overlap (or adjacency)
            return end1 > start2 && start1 < end2;
        }

        // Check for overlapping intervals
        for (let i = 0; i < baseRates.length; i++) {
            for (let j = i + 1; j < baseRates.length; j++) {
                if (isOverlapping(baseRates[i], baseRates[j])) {
                    toast({
                        title: "Overlapping intervals found in base rates",
                        status: "error",
                    });
                    return false;
                }
            }
        }

        return true;
    }

    const [editWorkspace, { createData, loading, error }] = useMutation(EDIT_WORKSPACE);
    async function handleEditWorkspace() {
        if (validateInputs() === false) {
            return;
        }

        let customRatesPayload = customRates.map(rate => ({
            ...rate,
            ratesInSlot: rate.ratesInSlot.map(({ __typename, ...rest }) => rest),
        }));

        let payload = {
            ...editWorkspaceRequestPayload,
            baseRates: baseRates.map(({ __typename, ...rest }) => rest),
            customRates: customRatesPayload.map(({ __typename, ...rest }) => rest),
            openDays: openDays.map(({ __typename, ...rest }) => rest),
            customOpenHours: customOpenHours.map(({ __typename, ...rest }) => rest),
            amenities: amenities.map(({ __typename, ...rest }) => rest),
            pictures: pictures,
            branch: editWorkspaceRequestPayload.branch._id,
            totalSeats: totalSeatsInput,
        };

        if ("__typename" in payload) delete payload["__typename"];
        if ("slotsBooked" in payload) delete payload["slotsBooked"];

        console.log("payload", payload);
        try {
            const { data } = await editWorkspace({
                mutation: EDIT_WORKSPACE,
                variables: {
                    input: payload,
                },
            });

            navigate(`/workspaces/${params.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="title border rounded-2xl border-light px-8 py-12 flex flex-col gap-8">
                <div className="title flex flex-row rounded-xl border overflow-hidden px-4">
                    <div className="w-[500px]">
                        <Input
                            variant="unstyled"
                            value={editWorkspaceRequestPayload.name}
                            placeholder="Enter Workspace Name"
                            className="py-4"
                            style={{ fontSize: 24 }}
                            onChange={event =>
                                setEditWorkspacePayload({
                                    ...editWorkspaceRequestPayload,
                                    name: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="border-l border-gray-300"></div>
                    <Input
                        value={editWorkspaceRequestPayload.nameArabic}
                        placeholder="ادخل اسم القاعة"
                        className="py-6 text-dark text-[24px] leading-none flex-1 text-right"
                        onChange={event => setTotalSeatsInput(parseInt(event.target.value))}
                        variant="unstyled"
                        dir="rtl" // Right-to-left text direction
                    />
                </div>
                <div className="flex flex-row gap-4">
                    <div className="cost flex flex-col w-fit gap-1">
                        <span className="text-sm text-mediumGray">Total Seats</span>
                        <div className="border rounded-xl border-light px-4">
                            <Input
                                id="cost"
                                variant="unstyled"
                                type="number"
                                style={{ fontSize: 20 }}
                                value={totalSeatsInput}
                                className="py-[9px] max-w-[143px]"
                                onChange={event => {
                                    setEditWorkspacePayload({
                                        ...editWorkspaceRequestPayload,
                                        totalSeats: parseInt(event.target.value),
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="cost flex flex-col w-fit gap-1">
                        <span className="text-sm text-mediumGray">Location</span>

                        <div className="rounded-xl border border-light  w-fit  flex justify-start">
                            <Menu autoSelect={false} closeOnBlur>
                                <MenuButton as="button" className="h-fit rounded-xl  ">
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
                                            <MenuItem
                                                key={index}
                                                onClick={() => setSelectedBranch(branch)}
                                            >
                                                {branch.name}
                                            </MenuItem>
                                        );
                                    })}
                                </MenuList>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>

            <div className="description flex gap-7 flex-row border rounded-2xl border-light px-8 py-12">
                <div className=" w-[450px]">
                    <div className="text-left text-2xl font-Adam">Description</div>
                    <Textarea
                        variant="unstyled"
                        value={editWorkspaceRequestPayload.description}
                        onChange={event =>
                            setEditWorkspacePayload({
                                ...editWorkspaceRequestPayload,
                                description: event.target.value,
                            })
                        }
                        placeholder="Please write description here"
                        size="sm"
                    />
                </div>
                <div className="border-l border-gray-300"></div> {/* Vertical Line */}
                <Textarea
                    variant="unstyled"
                    value={editWorkspaceRequestPayload.descriptionArabic}
                    onChange={event =>
                        setEditWorkspacePayload({
                            ...editWorkspaceRequestPayload,
                            descriptionArabic: event.target.value,
                        })
                    }
                    placeholder="يرجى إدخال الوصف هنا"
                    size="sm"
                    style={{ borderRadius: 16 }}
                    className="flex-1 text-right" // Align text to the right
                    dir="rtl" // Right-to-left text direction
                />
            </div>

            <div className="timings border rounded-2xl border-light px-8 py-12 flex flex-col gap-6">
                <OpenDays
                    openDaysState={workspaceOpenDaysState}
                    customOpenHoursState={workspaceCustomOpenHoursState}
                />
            </div>

            <div className="rates border rounded-2xl border-light px-8 py-12 ">
                <WorkspaceRates />
            </div>
            <div className="amenities border rounded-2xl border-light px-8 py-12 ">
                <Amenities state={workspaceAmenitiesState} />
            </div>

            <PicturesGrid picturesState={workspacePicturesState} />

            <div className="buttons flex gap-6 w-full justify-end">
                <button
                    className="p-4 bg-errorLight flex justify-center items-center gap-2 flex-row rounded-xl"
                    onClick={() => navigate(`/meeting-rooms`)}
                >
                    <span className="text-mediumGray text-xl">Cancel </span>
                    <CloseIcon className="text-error" />
                </button>
                {loading ? (
                    <div className="h-11 w-[227px] bg-primary rounded-xl">
                        <Loader color="#FFF" />
                    </div>
                ) : (
                    <button
                        className="p-4 bg-primary flex justify-center items-center gap-4 flex-col rounded-xl"
                        onClick={() => handleEditWorkspace()}
                    >
                        <span className="text-white text-xl">Update Workspace </span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default WorkspaceNew;
