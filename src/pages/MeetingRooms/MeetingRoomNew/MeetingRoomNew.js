import { Input, useToast } from "@chakra-ui/react";

import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { ReactComponent as EqualIcon } from "../../../assets/EqualIcon.svg";
import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";
import { ReactComponent as ChevronRight } from "../../../assets/ChevronRight.svg";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { Textarea } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";

import Amenities from "../../../components/Amenities";

import { useEffect, useState } from "react";
import MeetingRoomRates from "../components/Rates";
import {
    meetingRoomAmenitiesState,
    newMeetingRoomRequest,
    meetingRoomOpenDaysState,
    meetingRoomRatesState,
    meetingRoomPicturesState,
    meetingRoomCustomOpenHoursState,
} from "../../../stores/meetingRoomStore";

import { CREATE_MEETING_ROOM } from "../../../queries/meetingRoomQueries";
import { useMutation, useQuery } from "@apollo/client";
import Breadcrumbs from "../../../components/Breadcrumbs";
import PicturesGrid from "../../../components/PicturesGrid";
import OpenDays from "../../../components/OpenDays";
import { GET_BRANCHES } from "../../../queries/branchesQueries";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";

function MeetingRoomNew() {
    const [newMeetingRoomRequestPayload, setNewMeetingRoomPayload] =
        useRecoilState(newMeetingRoomRequest);

    let [amenities, setAmenitiesData] = useRecoilState(meetingRoomAmenitiesState);
    let [rates, setRatesData] = useRecoilState(meetingRoomRatesState);
    let [openDays, setOpenDays] = useRecoilState(meetingRoomOpenDaysState);
    let [pictures, setPictures] = useRecoilState(meetingRoomPicturesState);
    let [customOpenHours, setCustomOpenHours] = useRecoilState(meetingRoomCustomOpenHoursState);

    useEffect(() => {
        setAmenitiesData([]);
        setRatesData([]);
        setOpenDays([]);
        setPictures([]);
        setCustomOpenHours([]);
    }, []);
    const [arabicDescription, setArabicDescription] = useState();

    const toast = useToast();

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

    function validateInputs() {
        if (!newMeetingRoomRequestPayload.name.length) {
            toast({
                title: "Meetin Room name cannot be empty",
                status: "error",
            });
            return false;
        }

        if (!newMeetingRoomRequestPayload.ratesPerHour) {
            toast({
                title: "Meetin Room name cannot be empty",
                status: "error",
            });
            return false;
        }

        if (!newMeetingRoomRequestPayload.description) {
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

        if (!newMeetingRoomRequestPayload.totalSeats) {
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

        if (rates.some(rate => !rate.rate || rate.rate < 0)) {
            toast({
                title: "Custom Rates cannot be null",
                status: "error",
            });
            return false;
        }

        return true;
    }

    const [createMeetingRoom, { createData, loading, error }] = useMutation(CREATE_MEETING_ROOM);
    async function handleAddMeetingRoom() {
        console.log("payload", newMeetingRoomRequestPayload);

        if (validateInputs() === false) {
            return;
        }

        let payload = {
            ...newMeetingRoomRequestPayload,
            customRates: rates.map(({ __typename, ...rest }) => rest),
            openDays: openDays.map(({ __typename, ...rest }) => rest),
            customOpenHours: customOpenHours.map(({ __typename, ...rest }) => rest),
            amenities: amenities.map(({ __typename, ...rest }) => rest),
            pictures: pictures,
            branch: selectedBranch._id,
            ratesPerHour: parseFloat(newMeetingRoomRequestPayload.ratesPerHour),
        };

        if ("__typename" in payload) delete payload["__typename"];

        console.log("new payload", payload);
        try {
            // console.log("CREATE_BRANCH", CREATE_BRANCH);
            const { data } = await createMeetingRoom({
                mutation: CREATE_MEETING_ROOM,
                variables: {
                    input: payload,
                },
                // client: client,
            });
            // console.log(data);

            toast({
                title: "New Meeting Room Created!",
                status: "success",
            });

            navigate(`/branches/${selectedBranch._id}`);
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
        <div className="new-meeting-room">
            <Breadcrumbs />
            <div className="flex flex-col gap-8">
                <div className="title border rounded-2xl border-light px-8 py-12 flex flex-col gap-8">
                    <div className="flex flex-row justify-evenly rounded-xl border border-light px-4">
                        <div className="w-[500px]">
                            <Input
                                variant="unstyled"
                                value={newMeetingRoomRequestPayload.name}
                                placeholder="Enter Meeting Room Name"
                                style={{ fontSize: 24 }}
                                className="py-4"
                                onChange={event =>
                                    setNewMeetingRoomPayload({
                                        ...newMeetingRoomRequestPayload,
                                        name: event.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="border-l border-gray-300"></div>
                        <Input
                            value={newMeetingRoomRequestPayload.nameArabic}
                            placeholder="ادخل اسم القاعة"
                            className="py-6 text-dark text-[24px] leading-none flex-1 text-right"
                            onChange={event =>
                                setNewMeetingRoomPayload({
                                    ...newMeetingRoomRequestPayload,
                                    nameArabic: event.target.value,
                                })
                            }
                            variant="unstyled"
                            dir="rtl" // Right-to-left text direction
                        />
                    </div>
                    <div className="flex gap-8">
                        <div className="flex flex-col w-fit gap-1">
                            <span className="text-sm text-mediumGray">Total Seats</span>
                            <div className="border rounded-xl border-light px-4">
                                <Input
                                    id="cost"
                                    variant="unstyled"
                                    type="number"
                                    value={newMeetingRoomRequestPayload.totalSeats}
                                    style={{ fontSize: 20 }}
                                    className="py-2.5 max-w-[143px]"
                                    onChange={event =>
                                        setNewMeetingRoomPayload({
                                            ...newMeetingRoomRequestPayload,
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
                                                <span className="text-dark">
                                                    {selectedBranch.name}
                                                </span>
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

                <div className="description  flex gap-7 flex-row border rounded-2xl border-light px-8 py-12">
                    <div className=" w-[450px]">
                        <div className="text-left text-2xl">Description</div>
                        <Textarea
                            variant="unstyled"
                            value={newMeetingRoomRequestPayload.description}
                            onChange={event =>
                                setNewMeetingRoomPayload({
                                    ...newMeetingRoomRequestPayload,
                                    description: event.target.value,
                                })
                            }
                            placeholder="Please write description here"
                            size="sm"
                            style={{ borderRadius: 16 }}
                        />
                    </div>
                    <div className="border-l border-gray-300"></div> {/* Vertical Line */}
                    <Textarea
                        variant="unstyled"
                        value={newMeetingRoomRequestPayload.descriptionArabic}
                        onChange={event =>
                            setNewMeetingRoomPayload({
                                ...newMeetingRoomRequestPayload,
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
                        openDaysState={meetingRoomOpenDaysState}
                        customOpenHoursState={meetingRoomCustomOpenHoursState}
                    />
                </div>

                <div className="rates border rounded-2xl border-light px-8 py-12 ">
                    <MeetingRoomRates state={newMeetingRoomRequest} />
                </div>
                <div className="amenities border rounded-2xl border-light px-8 py-12 ">
                    <Amenities state={meetingRoomAmenitiesState} />
                </div>

                <PicturesGrid picturesState={meetingRoomPicturesState} />

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
                            className="py-2 px-3 bg-primary flex justify-center items-center gap-2 flex-row rounded-xl"
                            onClick={() => handleAddMeetingRoom()}
                        >
                            <span className="text-white text-xl">Add Meeting Room </span>
                            <PlusIcon className="text-white" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MeetingRoomNew;
