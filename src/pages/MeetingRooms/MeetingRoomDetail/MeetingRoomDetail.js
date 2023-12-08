import { ReactComponent as ClockIcon } from "../../../assets/ClockIcon.svg";
import { ReactComponent as EditIcon } from "../../../assets/EditIcon.svg";
import { ReactComponent as MapsIcon } from "../../../assets/MapsIcon.svg";

import { useQuery } from "@apollo/client";
import { GET_MEETING_ROOM } from "../../../queries/meetingRoomQueries";
import { Link, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
    editMeetingRoomRequest,
    meetingRoomAmenitiesState,
    meetingRoomOpenDaysState,
    meetingRoomPicturesState,
    meetingRoomRatesState,
} from "../../../stores/meetingRoomStore";
import { useEffect } from "react";
import Loader from "../../../components/Loader";
import Maps from "../../../components/Maps";

function MeetingRoomDetails() {
    const { id } = useParams();
    let [amenities, setAmenitiesData] = useRecoilState(meetingRoomAmenitiesState);
    let [rates, setRatesData] = useRecoilState(meetingRoomRatesState);
    let [openDays, setOpenDays] = useRecoilState(meetingRoomOpenDaysState);
    let [pictures, setPictures] = useRecoilState(meetingRoomPicturesState);
    let [editMeetingRoom, setEditMeetingRoomPayload] = useRecoilState(editMeetingRoomRequest);

    const {
        loading: meetingRoomLoading,
        error: meetingRoomError,
        data,
    } = useQuery(GET_MEETING_ROOM, {
        variables: { id },
    });

    let meetingRoomData = data?.MeetingRoom;

    useEffect(() => {
        if (!meetingRoomLoading && !meetingRoomError) {
            //  console.log("askjdnasjdnj");

            //  console.log("meetingRoomData.amenities", meetingRoomData.amenities);
            //  console.log("meetingRoomData.customRates", meetingRoomData.customRates);
            //  console.log("meetingRoomData.openDays", meetingRoomData.openDays);
            //  console.log("meetingRoomData.pictures", meetingRoomData.pictures);

            setAmenitiesData(meetingRoomData.amenities);
            setRatesData(meetingRoomData.customRates);
            setOpenDays(meetingRoomData.openDays);
            setPictures(meetingRoomData.pictures);
            setEditMeetingRoomPayload(meetingRoomData);

            // let loc = JSON.parse(meetingRoomData.branch.location);
            // console.log(loc, typeof loc);
        }
    }, [meetingRoomLoading, meetingRoomError, meetingRoomData, data]);

    if (meetingRoomLoading)
        return (
            <div className="h-[400px]">
                <Loader />
            </div>
        );

    return (
        <div>
            {meetingRoomLoading ? (
                "Loading Meeting Room Data"
            ) : (
                <div className="grid border border-borderColor rounded-2xl grid-cols-10 p-8 divide-x-2 gap-8">
                    <div className="col-span-7 flex flex-col gap-8">
                        <div className="pictures grid grid-cols-5 grid-rows-2 gap-6">
                            {pictures.map((picture, index) =>
                                index === 0 ? (
                                    <div className="relative overflow-hidden rounded-2xl border col-span-3 row-span-2">
                                        <img alt="" src={picture} />
                                        <div className="bg-white h-[30px] w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-50">
                                            <span className="text-dark text-xs">
                                                SAR {meetingRoomData.ratesPerHour} / period
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="overflow-hidden border rounded-2xl">
                                        <img className="" alt="" src={picture} />
                                    </div>
                                )
                            )}
                        </div>

                        <div className="header flex flex-col gap-8">
                            <div className="flex justify-between items-center gap-6">
                                <div className="flex gap-5 items-center">
                                    <span className=" text-[32px] leading-normal text-dark">
                                        {meetingRoomData.name}
                                    </span>

                                    <span className="py-4 text-[24px] text leading-normal text-dark">
                                        {meetingRoomData.totalSeats}
                                    </span>

                                    <Link
                                        to={`/meeting-rooms/${meetingRoomData._id}/edit`}
                                        className="edit-button text-primary">
                                        <EditIcon className="text-primary" />
                                    </Link>
                                </div>

                                {/* <button className="rounded-xl font-sm font-medium text-dark border border-borderColor shadow-md px-3 py-2">
                                    View Schedule
                                </button> */}
                            </div>
                        </div>

                        <div className="h-[1px] w-full border-t border-borderColor"></div>

                        <div className="body flex gap-8 flex-col">
                            <div className="text-left text-mediumGray text-lg">
                                {meetingRoomData.description}
                            </div>

                            <div className="h-[1px] w-full border-t border-borderColor"></div>

                            <div className="text-left text-2xl">Amenities</div>

                            <div className="flex gap-12 items-center">
                                {meetingRoomData.amenities.map((amenity) => (
                                    <span className="capitalize text-sm text-dark font-normal leading-6">
                                        {amenity.name}
                                    </span>
                                ))}
                            </div>

                            <div className="h-[1px] w-full border-t border-borderColor"></div>

                            <div className="text-left text-2xl">Location</div>
                            <div className="h-[300px] w-full rounded-2xl overflow-hidden">
                                <Maps center={JSON.parse(meetingRoomData.branch.location).location} />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 px-8 flex flex-col gap-6 ">
                        <div className="time-left flex gap-4 items-center justify-between  w-full py-3">
                            <span className=" text-xl leading-6 text-dark">Opening Timings</span>
                            <ClockIcon className="h-6 w-6 text-mediumGray font-normal" />
                        </div>
                        <div className="w-full h-[1px] border-t border-borderColor"></div>
                        <div className="flex flex-col gap-4">
                            {meetingRoomData.openDays.map((day, index) => (
                                <div key={index} className="flex justify-between gap-5">
                                    <span className="text-dark text-lg leading-normal">{day.day}</span>
                                    <span className="text-dark text-lg leading-normal">
                                        {day.startTime} - {day.endTime}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MeetingRoomDetails;
