import { ReactComponent as EditIcon } from "../../../assets/EditIcon.svg";

import { useQuery } from "@apollo/client";
import { GET_MEETING_ROOM } from "../../../queries/nurseryQueries";
import { Link, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
// import {
//     editMeetingRoomRequest,
//     nurseryAmenitiesState,
//     nurseryOpenDaysState,
//     nurseryPicturesState,
//     nurseryRatesState,
// } from "../../../stores/nurseryStore";
import { useEffect, useState } from "react";
import { GET_NURSERY } from "../../../queries/nurseryQueries";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { editNurseryData, nurseryPictures } from "../../../stores/nurseryStore";
import Loader from "../../../components/Loader";

function NurseryDetails() {
    const { id } = useParams();

    let [pictures, setPictures] = useRecoilState(nurseryPictures);
    let [_, setEditNurseryData] = useRecoilState(editNurseryData);

    const {
        loading: nurseryLoading,
        error: nurseryError,
        data,
    } = useQuery(GET_NURSERY, {
        variables: { id },
    });

    let nurseryData = data?.nursery;

    useEffect(() => {
        if (!nurseryLoading && !nurseryError) {
            setPictures(nurseryData.pictures ? nurseryData.pictures : []);
            setEditNurseryData(nurseryData);
        }
    }, [nurseryLoading, nurseryError, nurseryData, data]);

    if (nurseryLoading)
        return (
            <div className="h-[400px]">
                <Loader />
            </div>
        );
    return (
        <div>
            {nurseryLoading ? (
                "Loading Nursery Data"
            ) : (
                <div className="flex flex-col border border-borderColor rounded-2xl p-8 gap-8">
                    <div className="flex gap-8">
                        <Breadcrumbs locationName={nurseryData.name} id={id} />
                        <Link
                            className="p-2 active:bg-primaryLight h-fit rounded-lg"
                            to={`/nurseries/${nurseryData._id}/edit`}>
                            <EditIcon className="text-primary" />
                        </Link>
                    </div>

                    <div className="pictures grid grid-cols-5 grid-rows-2 gap-6">
                        {pictures.length ? (
                            pictures.map((picture, index) =>
                                index === 0 ? (
                                    <div className="relative overflow-hidden rounded-2xl border col-span-3 row-span-2">
                                        <img alt="" src={picture} />
                                        {/* <div className="bg-white h-[30px] w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-50">
                                            <span className="text-dark text-xs">
                                                SAR {nurseryData.ratesPerHour} / period
                                            </span>
                                        </div> */}
                                    </div>
                                ) : (
                                    <div className="overflow-hidden border rounded-2xl">
                                        <img className="" alt="" src={picture} />
                                    </div>
                                )
                            )
                        ) : (
                            <img
                                className="object-contain opacity-25 mx-auto col-span-3 row-span-2"
                                src="https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png"
                                alt="workspace"
                            />
                        )}
                    </div>

                    <div className="header flex flex-col gap-8">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-6 flex-col w-[50%]">
                                <div className="flex gap-4 items-baseline">
                                    {/* <span className=" text-[32px] leading-normal text-dark">
                                        {nurseryData.name}
                                    </span>
                                    <Link
                                        to={`/nurseries/${nurseryData._id}/edit`}
                                        className="edit-button text-primary">
                                        Edit
                                    </Link> */}
                                </div>

                                <div className="details capitalize p-8 w-full rounded-xl border border-light flex flex-col gap-6">
                                    <div className="flex justify-between">
                                        <div className="text-base text-mediumGray">Number of Seats</div>
                                        <div className="">{nurseryData.seats}</div>
                                    </div>
                                    {/* <div className="flex justify-between">
                                        <div className="text-base text-mediumGray">Price / Seat</div>
                                        <div className="">{nurseryData.priceRatePerHour}</div>
                                    </div> */}
                                    {/*
                                <div className="flex justify-between">
                                    <div className="text-base text-mediumGray">Genders</div>
                                    <div className="">{nurseryData.gender}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-base text-mediumGray">Age Group</div>
                                    <div className="">{nurseryData.ageGroup}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-base text-mediumGray">duration</div>
                                    <div className="">{nurseryData.duration.hours}</div>
                                </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NurseryDetails;
