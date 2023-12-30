import { ReactComponent as ClockIcon } from "../../../assets/ClockIcon.svg";
import { ReactComponent as TickIcon } from "../../../assets/TickIcon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { ReactComponent as UserIcon } from "../../../assets/UserIcon.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/CalendarIcon.svg";
import { ReactComponent as EditIcon } from "../../../assets/EditIcon.svg";

import { useRecoilState, useRecoilValue } from "recoil";
import { workshopRequestPayload } from "../../../stores/workshopStore";

import { workshopAmenities } from "../../../stores/workshopStore";
import { GET_WORKSHOP_REQUEST } from "../../../queries/workshopQueries";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loader from "../../../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Maps from "../../../components/Maps";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect } from "react";

function WorkshopDetails() {
    // const [workshopRequest, setWorkShopRequest] = useRecoilState(workshopRequestPayload);
    const [requestPayload, setWorkShopRequestPayload] = useRecoilState(workshopRequestPayload);

    const amenities = useRecoilValue(workshopAmenities);

    const params = useParams();
    let id = params.id;

    const {
        loading: workshopLoading,
        error: workshopError,
        data,
    } = useQuery(GET_WORKSHOP_REQUEST, {
        variables: { id },
    });

    let workshopRequest = data?.workshopRequest;

    console.log("workshopData", workshopRequest);

    useEffect(() => {
        if (!workshopLoading && !workshopError) {
            console.log("askjdnasjdnj", data);
            //  console.log("workshopData.amenities", workshopData.amenities);
            //  console.log("workshopData.customRates", workshopData.customRates);
            //  console.log("workshopData.openDays", workshopData.openDays);

            setWorkShopRequestPayload(data.workshopRequest);
        }
    }, [workshopLoading, workshopError, data]);

    const pieData = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
    ];

    const COLORS = ["#E4E8EF", "#B0C478"];

    function statusBadge(status) {
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

    console.log("workshopRequest", workshopRequest);

    if (workshopLoading) {
        return (
            <div className="h-[400px]">
                <Loader />
            </div>
        );
    }
    return (
        <div className="grid  grid-cols-10 p-8 divide-x-2 gap-8">
            <div className="col-span-7 flex flex-col gap-8">
                <div className="pictures grid grid-cols-5 grid-rows-2 gap-6">
                    {workshopRequest.pictures &&
                        workshopRequest.pictures?.map((picture, index) =>
                            index === 0 ? (
                                <div className="relative overflow-hidden rounded-2xl border col-span-3 row-span-2">
                                    <img alt="" src={picture} />
                                    <div className="bg-white h-[30px] w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-50">
                                        <span className="text-dark text-xs">
                                            SAR {workshopRequest.pricePerSeat} / period
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

                <div className="header flex justify-between items-center">
                    <div className="flex gap-5 items-baseline">
                        <span className=" text-[32px] leading-none text-dark">{workshopRequest.name}</span>
                        <div> {statusBadge(workshopRequest.approvalStatus)}</div>
                        <Link
                            to={`/workshops/${workshopRequest._id}/edit`}
                            className="edit-button text-primary h-7 w-7">
                            <EditIcon className="text-primary" />
                        </Link>
                    </div>

                    <button className="rounded-xl font-sm font-medium text-error border border-error bg-errorLight px-3 py-2">
                        Cancel Workshop
                    </button>
                </div>

                <div className="h-[1px] w-full border-t border-borderColor"></div>

                <div className="body flex gap-8 flex-col">
                    <div className="flex gap-8">
                        {workshopRequest.bookings?.map((timing, index) => (
                            <div key={index} className="flex gap-4 items-center">
                                <ClockIcon className="h-5 w-5" />
                                <span className="text-base text-center align-middle leading-5 text-dark">
                                    {timing.date}
                                    {"   "}
                                    {timing.startTime} to {timing.endTime}
                                </span>
                            </div>
                        ))}

                        <div className="flex gap-4 items-center">
                            <UserIcon className="h-5 w-5" />
                            <span className="text-base leading-6 text-dark">{workshopRequest.gender}</span>
                        </div>

                        <div className="flex gap-4 items-center">
                            <CalendarIcon className="h-5 w-5" />
                            <span className="text-base leading-6 text-dark">
                                {workshopRequest.ageGroup.min} to {workshopRequest.ageGroup.max}
                            </span>
                        </div>
                    </div>

                    <div className="text-left text-mediumGray text-lg">{workshopRequest.description}</div>

                    <div className="h-[1px] w-full border-t border-borderColor"></div>

                    <div className="text-left text-2xl">Amenities</div>

                    <div className="flex gap-12 items-center">
                        {amenities.map((amenity) => (
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={JSON.parse(amenity.picture)}
                                    className="text-[#838481]"
                                />
                                <span className="capitalize text-sm text-dark font-normal leading-6">
                                    {amenity}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="h-[1px] w-full border-t border-borderColor"></div>

                    <div className="text-left text-2xl">Location</div>
                    <div className="h-[300px] w-full rounded-2xl overflow-hidden">
                        {workshopRequest.branch && (
                            <Maps center={JSON.parse(workshopRequest.branch.location).location} />
                        )}
                    </div>
                </div>
            </div>
            <div className="col-span-3 px-8 flex flex-col gap-11 ">
                <div className="time-left flex gap-4 items-center justify-center border rounded-xl bg-errorLight w-full py-3">
                    <ClockIcon className="h-6 w-6 text-mediumGray font-normal" />
                    <span className=" text-2xl leading-6 text-mediumGray">2 hours left</span>
                </div>
                <div className="graph">
                    <ResponsiveContainer width="50%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={20}
                                outerRadius={40}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="border rounded-xl h-full">
                    <div className="flex px-6 py-11 border-b justify-between">
                        <span className="">User</span>
                        <span className="">Seats</span>
                    </div>
                    {workshopRequest.bookingByCustomers.map((user) => (
                        <div className="flex px-6 py-11 border-b justify-between pr-10">
                            <span className="text-mediumGray text-base leading-normal">
                                {user.userId.name}
                            </span>
                            <span className="text-mediumGray text-base leading-normal">{user.noOfSeats}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WorkshopDetails;
