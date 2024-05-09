import { Input, useToast } from "@chakra-ui/react";

import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { ReactComponent as EqualIcon } from "../../../assets/EqualIcon.svg";
import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";
import { ReactComponent as ChevronRight } from "../../../assets/ChevronRight.svg";

import { Textarea } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { useEffect, useState } from "react";

import {
    workspaceAmenitiesState,
    workspacePicturesState,
    newWorkspaceRequest,
    workspaceOpenDaysState,
    workspaceBaseRatesState,
    workspaceCustomRatesState,
    workspaceCustomOpenHoursState,
} from "../../../stores/workspaceStore";

import { CREATE_WORKSPACE } from "../../../queries/workspaceQueries";
import { useMutation, useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import PicturesGrid from "../../../components/PicturesGrid";
import WorkspaceRates from "../components/Rates";

import Amenities from "../../../components/Amenities";
import OpenDays from "../../../components/OpenDays";
import { GET_BRANCHES } from "../../../queries/branchesQueries";
import Loader from "../../../components/Loader";

function WorkspaceNew() {
    const [newWorkspaceRequestPayload, setNewWorkspacePayload] =
        useRecoilState(newWorkspaceRequest);

    let [amenities, setAmenitiesData] = useRecoilState(workspaceAmenitiesState);
    let [baseRates, setBaseRates] = useRecoilState(workspaceBaseRatesState);
    let [customRates, setCustomRates] = useRecoilState(workspaceCustomRatesState);
    let [openDays, setOpenDays] = useRecoilState(workspaceOpenDaysState);
    let [customHours, setCustomOpenHours] = useRecoilState(workspaceCustomOpenHoursState);
    let [pictures, setPictures] = useRecoilState(workspacePicturesState);

    useEffect(() => {
        setAmenitiesData([]);
        setBaseRates([]);
        setCustomRates([]);
        setOpenDays([]);
        setCustomOpenHours([]);
        setPictures([]);
    }, []);

    console.log({ newWorkspaceRequest, pictures, openDays, baseRates, customRates, customHours });

    const navigate = useNavigate();
    const toast = useToast();

    const [selectedBranch, setSelectedBranch] = useState({
        name: "",
    });
    const [branchData, setBranchData] = useState([]);
    const { loading: branchesLoading, error: branchesError, data } = useQuery(GET_BRANCHES);
    useEffect(() => {
        if (!branchesLoading && !branchesError) {
            setBranchData(data.branches);
        }
    }, [branchesLoading, branchesError, data]);

    function validateInputs() {
        console.log({
            newWorkspaceRequestPayload,
            baseRates,
            check: baseRates.length,
        });
        if (!newWorkspaceRequestPayload.name.length) {
            toast({
                title: "workspace name cannot be empty",
                status: "error",
            });
            return false;
        }

        if (!newWorkspaceRequestPayload.description) {
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

        if (!newWorkspaceRequestPayload.totalSeats) {
            toast({
                title: "Please enter seats",
                status: "error",
            });
            return false;
        }

        if (
            amenities.some(amenity => {
                return !amenity.name || !amenity.type || !amenity.picture;
            })
        ) {
            toast({
                title: "Amenity name cannot be empty",
                status: "error",
            });
            return false;
        }

        if (baseRates.length < 1 || baseRates.some(rate => !rate.rate || rate.rate < 0)) {
            toast({
                title: "Rates Null: Add Morning, Afternoon & Evening Rates",
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

    const [createWorkspace, { createData, loading, error }] = useMutation(CREATE_WORKSPACE);
    async function handleAddWorkspace() {
        // "name"
        // "description"
        // "openDays"
        // "customOpenHours"
        // "branch"
        // "totalSeats"
        // "ratePerInterval"
        // "baseRates"
        // "customRates"
        // "amenities"
        // "pictures"
        // "slotsInterval"
        //

        if (validateInputs() === false) {
            return;
        }

        let payload = {
            ...newWorkspaceRequestPayload,
            openDays: openDays,
            branch: selectedBranch._id,
            baseRates: baseRates,
            customRates: customRates,
            amenities: amenities,
            pictures: pictures,
            customOpenHours: customHours,
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
            navigate(`/workspaces`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="title border rounded-2xl border-light px-8 py-12 flex flex-col gap-8">
                <div className="title flex flex-row rounded-xl border border-light overflow-hidden px-4">
                    <div className="w-[500px]">
                        <Input
                            variant="unstyled"
                            value={newWorkspaceRequestPayload.name}
                            placeholder="Enter Workspace Name"
                            className="py-4"
                            style={{ fontSize: 24 }}
                            onChange={event =>
                                setNewWorkspacePayload({
                                    ...newWorkspaceRequestPayload,
                                    name: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="border-l border-gray-300"></div>
                    <Input
                        value={newWorkspaceRequestPayload.nameArabic}
                        placeholder="ادخل اسم القاعة"
                        className="py-6 text-dark text-[24px] leading-none flex-1 text-right"
                        onChange={event =>
                            setNewWorkspacePayload({
                                ...newWorkspaceRequestPayload,
                                nameArabic: event.target.value,
                            })
                        }
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
                                value={newWorkspaceRequestPayload.totalSeats}
                                className="py-[9px] max-w-[143px]"
                                onChange={event =>
                                    setNewWorkspacePayload({
                                        ...newWorkspaceRequestPayload,
                                        totalSeats: parseInt(event.target.value),
                                    })
                                }
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
                        value={newWorkspaceRequestPayload.description}
                        onChange={event =>
                            setNewWorkspacePayload({
                                ...newWorkspaceRequestPayload,
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
                    value={newWorkspaceRequestPayload.descriptionArabic}
                    onChange={event =>
                        setNewWorkspacePayload({
                            ...newWorkspaceRequestPayload,
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
                    onClick={() => navigate(`/workspaces`)}
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
                        className="py-2 px-3 bg-primary flex justify-center items-center gap-2 rounded-xl"
                        onClick={() => handleAddWorkspace()}
                    >
                        <span className="text-white text-xl">Add Workspace</span>
                        <PlusIcon className="text-white" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default WorkspaceNew;
