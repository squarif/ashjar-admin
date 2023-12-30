import { Input, useToast } from "@chakra-ui/react";

import { ReactComponent as ChevronRight } from "../../../assets/ChevronRight.svg";
import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";

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
    meetingRoomCustomOpenHoursState,
} from "../../../stores/meetingRoomStore";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { EDIT_MEETING_ROOM } from "../../../queries/meetingRoomQueries";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import PicturesGrid from "../../../components/PicturesGrid";
import OpenDays from "../../../components/OpenDays";
import MeetingRoomRates from "../components/Rates";
import { GET_BRANCHES } from "../../../queries/branchesQueries";
import Loader from "../../../components/Loader";

function MeetingRoomEdit() {
    const [editMeetingRoomRequestPayload, setEditMeetingRoomPayload] = useRecoilState(editMeetingRoomRequest);
    const openDays = useRecoilValue(meetingRoomOpenDaysState);
    const pictures = useRecoilValue(meetingRoomPicturesState);
    const rates = useRecoilValue(meetingRoomRatesState);
    const amenities = useRecoilValue(meetingRoomAmenitiesState);
    const customOpenHours = useRecoilValue(meetingRoomCustomOpenHoursState);

    const navigate = useNavigate();
    const params = useParams();
    const toast = useToast();

    useEffect(() => {
        console.log("jsndf;lksand", editMeetingRoomRequestPayload);
        if (!Object.keys(editMeetingRoomRequestPayload).length) {
            navigate(`/meeting-rooms/${params.id}`);
        }

        if (!Object.keys(selectedBranch).length) {
            navigate(`/meeting-rooms/${params.id}`);
        }
    }, [editMeetingRoomRequestPayload]);

    const [selectedBranch, setSelectedBranch] = useState(editMeetingRoomRequestPayload.branch);
    const [branchData, setBranchData] = useState([]);
    const { loading: branchesLoading, error: branchesError, data } = useQuery(GET_BRANCHES);
    useEffect(() => {
        if (!branchesLoading && !branchesError) {
            setBranchData(data.branches);
        }
    }, [branchesLoading, branchesError, data]);

    function validateInputs() {
        if (!editMeetingRoomRequestPayload.name.length) {
            toast({
                title: "Meetin Room name cannot be empty",
                status: "error",
            });
            return false;
        }

        if (!editMeetingRoomRequestPayload.ratesPerHour) {
            toast({
                title: "Meetin Room name cannot be empty",
                status: "error",
            });
            return false;
        }

        if (!editMeetingRoomRequestPayload.description) {
            toast({
                title: "Meetin Room description cannot be empty",
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

        if (!editMeetingRoomRequestPayload.totalSeats) {
            toast({
                title: "Please enter seats",
                status: "error",
            });
            return false;
        }

        if (
            amenities.some((amenity) => {
                return !amenity.name.length;
            })
        ) {
            toast({
                title: "Amenity name cannot be empty",
                status: "error",
            });
            return false;
        }

        if (rates.some((rate) => !rate.rate)) {
            toast({
                title: "Custom Rates cannot be null",
                status: "error",
            });
            return false;
        }

        return true;
    }

    const [editMeetingRoom, { createData, loading, error }] = useMutation(EDIT_MEETING_ROOM);
    async function handleEditMeetingRoom() {
        if (validateInputs() === false) {
            return;
        }

        let payload = {
            ...editMeetingRoomRequestPayload,
            customRates: rates.map(({ __typename, ...rest }) => rest),
            openDays: openDays.map(({ __typename, ...rest }) => rest),
            customOpenHours: customOpenHours.map(({ __typename, ...rest }) => rest),
            amenities: amenities.map(({ __typename, ...rest }) => rest),
            pictures: pictures,
            branch: editMeetingRoomRequestPayload.branch._id,
        };

        if ("__typename" in payload) delete payload["__typename"];
        if ("slotsBooked" in payload) delete payload["slotsBooked"];

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
                                        {selectedBranch ? (
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
                <OpenDays
                    customOpenHoursState={meetingRoomCustomOpenHoursState}
                    openDaysState={meetingRoomOpenDaysState}
                />
            </div>

            <div className="rates border rounded-2xl border-light px-8 py-12 ">
                <MeetingRoomRates state={editMeetingRoomRequest} />
            </div>
            <div className="amenities border rounded-2xl border-light px-8 py-12 ">
                <Amenities />
            </div>

            <PicturesGrid picturesState={meetingRoomPicturesState} />

            <div className="buttons flex gap-6 w-full justify-end">
                <button
                    className="p-4 bg-errorLight flex justify-center items-center gap-2 flex-row rounded-xl"
                    onClick={() => navigate(`/meeting-rooms/${params.id}`)}>
                    <span className="text-mediumGray text-xl">Cancel </span>
                    <CloseIcon className="text-error" />
                </button>

                {loading ? (
                    <div className="h-11 w-[227px] bg-primary rounded-xl">
                        <Loader color="#FFF" />
                    </div>
                ) : (
                    <button
                        className="p-4 bg-primary flex justify-center items-center gap-4 rounded-xl"
                        onClick={() => handleEditMeetingRoom()}>
                        <span className="text-white text-xl">Update Meeting Room </span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default MeetingRoomEdit;
