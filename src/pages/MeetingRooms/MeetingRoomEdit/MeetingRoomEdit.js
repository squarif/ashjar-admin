import { Input, useToast } from "@chakra-ui/react";

import { ReactComponent as ChevronRight } from "../../../assets/ChevronRight.svg";

import { Textarea } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";

import Amenities from "../components/Amenities";
import { useEffect, useState } from "react";
import {
    meetingRoomAmenitiesState,
    meetingRoomOpenDaysState,
    meetingRoomRatesState,
    editMeetingRoomRequest,
    meetingRoomPicturesState,
} from "../../../stores/meetingRoomStore";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { EDIT_MEETING_ROOM } from "../../../queries/meetingRoomQueries";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import PicturesGrid from "../../../components/PicturesGrid";
import OpenDays from "../../../components/OpenDays";
import MeetingRoomRates from "../components/Rates";
import { GET_BRANCHES } from "../../../queries/branchesQueries";

function MeetingRoomEdit() {
    const [editMeetingRoomRequestPayload, setEditMeetingRoomPayload] = useRecoilState(editMeetingRoomRequest);
    const openDays = useRecoilValue(meetingRoomOpenDaysState);
    const pictures = useRecoilValue(meetingRoomPicturesState);
    const rates = useRecoilValue(meetingRoomRatesState);
    const amenities = useRecoilValue(meetingRoomAmenitiesState);

    const navigate = useNavigate();

    const toast = useToast();

    const [selectedBranch, setSelectedBranch] = useState(editMeetingRoomRequestPayload.branch);
    const [branchData, setBranchData] = useState([]);
    const { loading: branchesLoading, error: branchesError, data } = useQuery(GET_BRANCHES);
    useEffect(() => {
        if (!branchesLoading && !branchesError) {
            setBranchData(data.branches);
        }
    }, [branchesLoading, branchesError, data]);

    console.log(editMeetingRoomRequestPayload);

    const [editMeetingRoom] = useMutation(EDIT_MEETING_ROOM);
    async function handleEditMeetingRoom() {
        let payload = {
            ...editMeetingRoomRequestPayload,
            customRates: rates.map(({ __typename, ...rest }) => rest),
            openDays: openDays.map(({ __typename, ...rest }) => rest),
            amenities: amenities.map(({ __typename, ...rest }) => rest),
            pictures: pictures,
            branch: editMeetingRoomRequestPayload.branch._id,
        };

        if (payload.__typename) delete payload["__typename"];
        if (payload.slotsBooked) delete payload["slotsBooked"];

        console.log("payload", payload);

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
                <div className="title rounded-xl border border-light overflow-hidden px-4">
                    <Input
                        variant="unstyled"
                        value={editMeetingRoomRequestPayload.name}
                        placeholder="Enter Meeting Room Name"
                        style={{ fontSize: 24 }}
                        className="py-4"
                        onChange={(event) =>
                            setEditMeetingRoomPayload({
                                ...editMeetingRoomRequestPayload,
                                name: event.target.value,
                            })
                        }
                    />
                </div>

                <div className="flex gap-8">
                    <div className="flex flex-col gap-1 w-fit">
                        <span className="text-sm text-mediumGray">Total Seats</span>
                        <div className="border rounded-xl border-light px-4">
                            <Input
                                id="cost"
                                variant="unstyled"
                                type="number"
                                value={editMeetingRoomRequestPayload.totalSeats}
                                style={{ fontSize: 20 }}
                                className="py-2.5 max-w-[143px]"
                                onChange={(event) =>
                                    setEditMeetingRoomPayload({
                                        ...editMeetingRoomRequestPayload,
                                        totalSeats: parseInt(event.target.value),
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="location flex flex-col gap-1">
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
                    className="p-4 bg-primary flex justify-center items-center gap-4 flex-col rounded-xl"
                    onClick={() => handleEditMeetingRoom()}>
                    <span className="text-white text-xl">Edit Meeting Room </span>
                </button>
            </div>
        </div>
    );
}

export default MeetingRoomEdit;
