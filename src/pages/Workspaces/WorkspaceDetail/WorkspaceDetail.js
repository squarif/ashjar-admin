import { ReactComponent as ClockIcon } from "../../../assets/ClockIcon.svg";
import { ReactComponent as EditIcon } from "../../../assets/EditIcon.svg";

import { useRecoilState } from "recoil";

import { Link, useParams } from "react-router-dom";

import {
    editWorkspaceRequest,
    workspaceAmenitiesState,
    workspaceBaseRatesState,
    workspaceCustomRatesState,
    workspaceOpenDaysState,
    workspacePicturesState,
} from "../../../stores/workspaceStore";
import { useQuery } from "@apollo/client";
import { GET_WORKSPACE } from "../../../queries/workspaceQueries";
import { useEffect } from "react";
import Loader from "../../../components/Loader";
import Maps from "../../../components/Maps";

function WorkspaceDetail() {
    // const [workspaceData, setWorkShopRequestPayload] = useRecoilState(workshopRequestPayload);

    const { id } = useParams();
    let [amenities, setAmenitiesData] = useRecoilState(workspaceAmenitiesState);
    let [baseRates, setBaseRates] = useRecoilState(workspaceBaseRatesState);
    let [customRates, setCustomRates] = useRecoilState(workspaceCustomRatesState);
    let [openDays, setOpenDays] = useRecoilState(workspaceOpenDaysState);
    let [pictures, setPictures] = useRecoilState(workspacePicturesState);
    let [editworkspace, setEditWorkspacePayload] = useRecoilState(editWorkspaceRequest);

    const {
        loading: workspaceLoading,
        error: workspaceError,
        data,
    } = useQuery(GET_WORKSPACE, {
        variables: { id },
    });

    let workspaceData = data?.WorkSpace;

    useEffect(() => {
        if (!workspaceLoading && !workspaceError) {
            //  console.log("askjdnasjdnj");

            //  console.log("workspaceData.amenities", workspaceData.amenities);
            //  console.log("workspaceData.customRates", workspaceData.customRates);
            //  console.log("workspaceData.openDays", workspaceData.openDays);

            setAmenitiesData(workspaceData.amenities);
            setBaseRates(workspaceData.baseRates);
            setCustomRates(workspaceData.customRates);
            setOpenDays(workspaceData.openDays);
            setPictures(workspaceData.pictures);
            setEditWorkspacePayload(workspaceData);
        }
    }, [workspaceLoading, workspaceError, data]);

    if (workspaceLoading)
        return (
            <div className="h-[400px]">
                <Loader />
            </div>
        );
    return (
        <div className="grid  grid-cols-10 p-8 divide-x-2 gap-8">
            <div className="col-span-7 flex flex-col gap-8">
                <div className="pictures grid grid-cols-5 grid-rows-2 gap-6">
                    {pictures.map((picture, index) => {
                        return index === 0 ? (
                            <div className="flex relative overflow-hidden rounded-2xl border col-span-3 row-span-2">
                                <img className="object-cover" alt="" src={picture} />
                                {/* <div className="bg-white h-[30px] w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-50">
                                    <span className="text-dark text-xs">
                                        SAR {workspaceData.ratesPerHour} / period
                                    </span>
                                </div> */}
                            </div>
                        ) : (
                            <div className="overflow-hidden border rounded-2xl flex">
                                <img className="object-cover" alt="" src={picture} />
                            </div>
                        );
                    })}
                </div>

                <div className="header flex flex-col gap-8">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-5 items-center">
                            <span className="py-4 text-[32px] leading-normal text-dark">
                                {workspaceData.name}
                            </span>

                            <span className="py-4 text-[24px] text leading-normal text-dark">
                                {workspaceData.totalSeats}
                            </span>

                            <Link
                                to={`/workspaces/${workspaceData._id}/edit`}
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
                    <div className="text-left text-mediumGray text-lg">{workspaceData.description}</div>

                    <div className="h-[1px] w-full border-t border-borderColor"></div>

                    <div className="text-left text-2xl">Amenities</div>

                    <div className="flex gap-12 items-center">
                        {workspaceData.amenities.map((amenity) => (
                            <span className="capitalize text-sm text-dark font-normal leading-6">
                                {amenity.name}
                            </span>
                        ))}
                    </div>

                    <div className="h-[1px] w-full border-t border-borderColor"></div>

                    <div className="text-left text-2xl">Location</div>

                    <div className="h-[300px] w-full rounded-2xl overflow-hidden">
                        <Maps center={JSON.parse(workspaceData.branch.location).location} />
                    </div>
                </div>
            </div>
            <div className="col-span-3 px-8 flex flex-col gap-12 ">
                <div className="flex flex-col gap-6">
                    <div className="time-left flex gap-4 items-center justify-between  w-full">
                        <span className="text-xl leading-6 text-dark">Base Rates</span>
                    </div>
                    <div className="w-full h-[1px] border-t border-borderColor"></div>
                    <div className="flex flex-col gap-4">
                        {workspaceData.baseRates.map((rate, index) => (
                            <div className="flex justify-between">
                                <span className="text-dark text-lg leading-normal">
                                    {rate.startTime} - {rate.endTime}
                                </span>
                                <span className="text-dark text-lg leading-normal">SAR {rate.rate}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="time-left flex gap-4 items-center justify-between  w-full">
                        <span className=" text-xl leading-6 text-dark">Opening Timings</span>
                        <ClockIcon className="h-6 w-6 text-mediumGray font-normal" />
                    </div>
                    <div className="w-full h-[1px] border-t border-borderColor"></div>
                    <div className="flex flex-col gap-4">
                        {workspaceData.openDays.map((day, index) => (
                            <div className="flex justify-between">
                                <span className="text-dark text-lg leading-normal">{day.day}</span>
                                <span className="text-dark text-lg leading-normal">
                                    {day.startTime} - {day.endTime}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkspaceDetail;
