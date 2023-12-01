import { ReactComponent as ClockIcon } from "../../../assets/ClockIcon.svg";
import { ReactComponent as TickIcon } from "../../../assets/TickIcon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";

import { useRecoilState, useRecoilValue } from "recoil";
import { workshopRequestPayload } from "../../../stores/workshopStore";

import { workshopAmenities } from "../../../stores/workshopStore";
import { GET_WORKSHOP_REQUEST } from "../../../queries/workshopQueries";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loader from "../../../components/Loader";

function WorkshopDetails() {
    // const [requestPayload, setWorkShopRequestPayload] = useRecoilState(workshopRequestPayload);

    const amenities = useRecoilValue(workshopAmenities);

    const params = useParams();
    let id = params.id;

    //  console.log("ID", params.id);

    let { loading, error, data } = useQuery(GET_WORKSHOP_REQUEST, {
        variables: { id },
    });

    let workshopRequest = data?.workshopRequest;

    //  console.log("workshopRequest", workshopRequest);

    function statusBadge(status) {
        //  console.log(status);
        if (status.includes("pending")) {
            return (
                <div className="border rounded-xl bg-[#F0F0EE] border-light flex gap-2 py-1.5 px-3 items-center ">
                    <ClockIcon className="h-4 w-4" />
                    <span className="text-sm leading-4 text-gray-600"> Pending</span>
                </div>
            );
        }
        if (status.includes("approved")) {
            return (
                <div className="border rounded-xl bg-primaryLight border-light flex gap-2 py-1.5 px-3 items-center ">
                    <TickIcon className="h-4 w-4" />
                    <span className="text-sm leading-4 text-gray-600"> Approved</span>
                </div>
            );
        }
        if (status.includes("rejected")) {
            return (
                <div className="border rounded-xl bg-errorLight border-light flex gap-2 py-1.5 px-3 items-center ">
                    <CloseIcon className="h-4 w-4" />
                    <span className="text-sm leading-4 text-gray-600"> Rejected</span>
                </div>
            );
        }
    }

    return (
        <div>
            {loading ? (
                <div className="h-[400px]">
                    <Loader />
                </div>
            ) : (
                <div className="grid  grid-cols-10 p-8 divide-x-2 gap-8">
                    <div className="col-span-7 flex flex-col gap-8">
                        <div className="pictures grid grid-cols-5 grid-rows-2 gap-6">
                            <div className="overflow-hidden rounded-2xl border col-span-3 row-span-2">
                                <img alt="" src="" />
                            </div>
                            <div className="overflow-hidden border rounded-2xl"></div>
                        </div>

                        <div className="header flex flex-col gap-8">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-5 items-baseline">
                                    <span className="py-4 text-[32px] leading-normal text-dark">
                                        {workshopRequest.name}
                                    </span>
                                    <div> {statusBadge(workshopRequest.approvalStatus)}</div>
                                    <button className="edit-button"> edit </button>
                                </div>

                                <button className="rounded-xl font-sm font-medium text-error border border-error bg-errorLight px-3 py-2">
                                    Cancel Workshop
                                </button>
                            </div>
                        </div>

                        <div className="h-[1px] w-full border-t border-borderColor"></div>

                        <div className="body flex gap-8 flex-col">
                            <div className="flex gap-8">
                                {workshopRequest.timing.map((timing) => (
                                    <div className="flex gap-4 items-center">
                                        <ClockIcon className="h-5 w-5" />
                                        <span className="text-base text-center align-middle leading-5 text-dark">
                                            {timing.date}
                                            {timing.startTime}-{timing.endTime}
                                        </span>
                                    </div>
                                ))}

                                {/* <div className="flex gap-4 items-center">
                                    <ClockIcon className="h-5 w-5" />
                                    <span className="text-base leading-6 text-dark">Male and Female</span>
                                </div> */}
                                {/* <div className="flex gap-4 items-center">
                                    <ClockIcon className="h-5 w-5" />
                                    <span className="text-base leading-6 text-dark">Ages 12+</span>
                                </div> */}
                            </div>

                            <div className="text-left text-mediumGray text-lg">
                                {workshopRequest.description}
                            </div>

                            <div className="h-[1px] w-full border-t border-borderColor"></div>

                            <div className="text-left text-2xl">Amenities</div>

                            <div className="flex gap-12 items-center">
                                {amenities.map((amenity) => (
                                    <span className="capitalize text-sm text-dark font-normal leading-6">
                                        {amenity}
                                    </span>
                                ))}
                            </div>

                            <div className="h-[1px] w-full border-t border-borderColor"></div>

                            <div className="text-left text-2xl">Location</div>

                            <div className="flex gap-12 items-center">
                                <div className=""></div>
                                <div className=""></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 px-8 flex flex-col gap-11 ">
                        <div className="time-left flex gap-4 items-center justify-center border rounded-xl bg-errorLight w-full py-3">
                            <ClockIcon className="h-6 w-6 text-mediumGray font-normal" />
                            <span className=" text-2xl leading-6 text-mediumGray">2 hours left</span>
                        </div>
                        <div className="graph"></div>
                        <div className="border rounded-xl h-full">
                            <div className="flex px-6 py-11 border-b justify-between">
                                <span className="">User</span>
                                <span className="">Seats</span>
                            </div>
                            <div className="flex px-6 py-11 border-b justify-between pr-10">
                                <span className="text-mediumGray text-base leading-normal">User B</span>
                                <span className="text-mediumGray text-base leading-normal">3</span>
                            </div>

                            <div className="flex px-6 py-11 border-b justify-between pr-10">
                                <span className="text-mediumGray text-base leading-normal">User C</span>
                                <span className="text-mediumGray text-base leading-normal">4</span>
                            </div>

                            <div className="flex px-6 py-11 border-b justify-between pr-10">
                                <span className="text-mediumGray text-base leading-normal">User D</span>
                                <span className="text-mediumGray text-base leading-normal">5</span>
                            </div>

                            <div className="flex px-6 py-11 border-b justify-between pr-10">
                                <span className="text-mediumGray text-base leading-normal">User E</span>
                                <span className="text-mediumGray text-base leading-normal">2</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WorkshopDetails;
