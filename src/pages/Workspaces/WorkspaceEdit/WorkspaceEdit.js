import { Input } from "@chakra-ui/react";

import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { ReactComponent as EqualIcon } from "../../../assets/EqualIcon.svg";
import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";

import { Textarea } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";

import Amenities from "../components/Amenities";
import { useEffect, useState } from "react";
import {
    workspaceAmenitiesState,
    workspaceOpenDaysState,
    editWorkspaceRequest,
    workspacePicturesState,
    workspaceBaseRatesState,
    workspaceCustomRatesState,
} from "../../../stores/workspaceStore";

import { EDIT_WORKSPACE } from "../../../queries/workspaceQueries";
import { useMutation } from "@apollo/client";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import WorkspaceRates from "../components/Rates";
import PicturesUpload from "../../../components/PictureUpload";
import PicturesGrid from "../../../components/PicturesGrid";
import OpenDays from "../../../components/OpenDays";

function WorkspaceNew() {
    const [editWorkspaceRequestPayload, setEditWorkspacePayload] = useRecoilState(editWorkspaceRequest);
    const [openDays, setOpenDays] = useRecoilState(workspaceOpenDaysState);
    const baseRates = useRecoilValue(workspaceBaseRatesState);
    const customRates = useRecoilValue(workspaceCustomRatesState);
    const amenities = useRecoilValue(workspaceAmenitiesState);
    const [pictures, setPictures] = useRecoilState(workspacePicturesState);

    const [startAMPM, setStartAMPM] = useState("AM");
    const [endAMPM, setEndAMPM] = useState("AM");

    // let { state } = useLocation();
    let params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!Object.keys(editWorkspaceRequestPayload).length) {
            navigate(`/workspaces/${params.id}`);
        }
    }, [editWorkspaceRequestPayload]);

    const [editWorkspace] = useMutation(EDIT_WORKSPACE);
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
            amenities: amenities.map(({ __typename, ...rest }) => rest),
            pictures: pictures,
            branch: params.id,
        };

        if (payload.__typename) delete payload["__typename"];
        if (payload.slotsBooked) delete payload["slotsBooked"];

        console.log("payload", payload);
        try {
            // console.log("CREATE_BRANCH", CREATE_BRANCH);
            const { data } = await editWorkspace({
                mutation: EDIT_WORKSPACE,
                variables: {
                    input: payload,
                },
                // client: client,
            });
            //  console.log(data);

            navigate(`/workspaces/${params.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="title border rounded-2xl border-light px-8 py-12 flex flex-col gap-8">
                <div className="title mb-6 rounded-xl border overflow-hidden px-4">
                    <Input
                        variant="unstyled"
                        value={editWorkspaceRequestPayload.name}
                        placeholder="Enter Workspace Name"
                        className="py-4"
                        onChange={(event) =>
                            setEditWorkspacePayload({
                                ...editWorkspaceRequestPayload,
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
                            value={editWorkspaceRequestPayload.totalSeats}
                            className="py-4 max-w-[143px]"
                            onChange={(event) =>
                                setEditWorkspacePayload({
                                    ...editWorkspaceRequestPayload,
                                    totalSeats: parseInt(event.target.value),
                                })
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="description flex gap-7 flex-col border rounded-2xl border-light px-8 py-12">
                <div className="text-left text-2xl font-Adam">Description</div>
                <div className="border rounded-2xl bordr-light px-8 py-12">
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
                    className="p-4 bg-primary flex justify-center items-center gap-4 flex-col rounded-xl"
                    onClick={() => handleEditWorkspace()}>
                    <span className="text-white text-xl">Edit Workspace </span>
                </button>
            </div>
        </div>
    );
}

export default WorkspaceNew;
