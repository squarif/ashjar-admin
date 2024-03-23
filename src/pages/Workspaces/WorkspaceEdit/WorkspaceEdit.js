import { Input } from "@chakra-ui/react";

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
    const [editWorkspaceRequestPayload, setEditWorkspacePayload] = useRecoilState(editWorkspaceRequest);
    const openDays = useRecoilValue(workspaceOpenDaysState);
    const customOpenHours = useRecoilValue(workspaceCustomOpenHoursState);
    const pictures = useRecoilValue(workspacePicturesState);

    const baseRates = useRecoilValue(workspaceBaseRatesState);
    const customRates = useRecoilValue(workspaceCustomRatesState);
    const amenities = useRecoilValue(workspaceAmenitiesState);

    let params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!Object.keys(editWorkspaceRequestPayload).length) {
            navigate(`/workspaces/${params.id}`);
        }
    }, [editWorkspaceRequestPayload]);

    console.log(editWorkspaceRequestPayload.branch);
    const [selectedBranch, setSelectedBranch] = useState(editWorkspaceRequestPayload.branch);
    const [branchData, setBranchData] = useState([]);
    const { loading: branchesLoading, error: branchesError, data } = useQuery(GET_BRANCHES);
    useEffect(() => {
        if (!branchesLoading && !branchesError) {
            setBranchData(data.branches);
        }
    }, [branchesLoading, branchesError, data]);

    const [editWorkspace, { createData, loading, error }] = useMutation(EDIT_WORKSPACE);
    async function handleEditWorkspace() {
        let customRatesPayload = customRates.map((rate) => ({
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
                <div className="title rounded-xl border overflow-hidden px-4">
                    <Input
                        variant="unstyled"
                        value={editWorkspaceRequestPayload.name}
                        placeholder="Enter Workspace Name"
                        className="py-4"
                        style={{ fontSize: 24 }}
                        onChange={(event) =>
                            setEditWorkspacePayload({
                                ...editWorkspaceRequestPayload,
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
                                value={editWorkspaceRequestPayload.totalSeats}
                                className="py-[9px] max-w-[143px]"
                                onChange={(event) =>
                                    setEditWorkspacePayload({
                                        ...editWorkspaceRequestPayload,
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
                <div className="text-left text-2xl font-Adam">Description</div>

                <Textarea
                    value={editWorkspaceRequestPayload.description}
                    onChange={(event) =>
                        setEditWorkspacePayload({
                            ...editWorkspaceRequestPayload,
                            description: event.target.value,
                        })
                    }
                    placeholder="Here is a sample placeholder"
                    size="sm"
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
                    onClick={() => navigate(`/meeting-rooms`)}>
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
                        onClick={() => handleEditWorkspace()}>
                        <span className="text-white text-xl">Update Workspace </span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default WorkspaceNew;
