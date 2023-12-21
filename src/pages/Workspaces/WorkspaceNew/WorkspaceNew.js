import { Input } from "@chakra-ui/react";

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
} from "../../../stores/workspaceStore";

import { CREATE_WORKSPACE } from "../../../queries/workspaceQueries";
import { useMutation, useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import PicturesGrid from "../../../components/PicturesGrid";
import WorkspaceRates from "../components/Rates";

import Amenities from "../components/Amenities";
import OpenDays from "../../../components/OpenDays";
import { GET_BRANCHES } from "../../../queries/branchesQueries";
import Loader from "../../../components/Loader";

function WorkspaceNew() {
    const [newWorkspaceRequestPayload, setNewWorkspacePayload] = useRecoilState(newWorkspaceRequest);

    const [pictures, setPictures] = useRecoilState(workspacePicturesState);
    const [openDays, setOpenDays] = useRecoilState(workspaceOpenDaysState);
    const [baseRates, setBaseRates] = useRecoilState(workspaceBaseRatesState);
    const [customRates, setCustomRates] = useRecoilState(workspaceCustomRatesState);
    const amenities = useRecoilValue(workspaceAmenitiesState);

    const navigate = useNavigate();

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

    const [createWorkspace, { createData, loading, error }] = useMutation(CREATE_WORKSPACE);
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
            openDays: openDays.map(({ __typename, ...rest }) => rest),
            branch: selectedBranch._id,
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
            navigate(`/workspaces`);
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
                        style={{ fontSize: 24 }}
                        onChange={(event) =>
                            setNewWorkspacePayload({
                                ...newWorkspaceRequestPayload,
                                name: event.target.value,
                            })
                        }
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
                                onChange={(event) =>
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
                                            <MenuItem key={index} onClick={() => setSelectedBranch(branch)}>
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

            <div className="description flex gap-7 flex-col border rounded-2xl border-light px-8 py-12">
                <div className="text-left text-2xl">Description</div>

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

            <div className="buttons flex gap-6 w-full justify-end">
                <button
                    className="p-4 bg-errorLight flex justify-center items-center gap-2 flex-row rounded-xl"
                    onClick={() => navigate(`/workspaces`)}>
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
                        onClick={() => handleAddWorkspace()}>
                        <span className="text-white text-xl">Add Workspace</span>
                        <PlusIcon className="text-white" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default WorkspaceNew;
