// import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as PlusIcon } from "../../assets/PlusIcon.svg";
import { ReactComponent as EditIcon } from "../../assets/EditIcon.svg";
import { ReactComponent as MapsIcon } from "../../assets/MapsIcon.svg";
import { ReactComponent as EyeIcon } from "../../assets/EyeIcon.svg";
import { ReactComponent as UserIcon } from "../../assets/UserIcon.svg";
import { GET_BRANCH } from "../../queries/branchesQueries";
import { useQuery } from "@apollo/client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Breadcrumbs from "../../components/Breadcrumbs";

function BranchDetail() {
    const { id } = useParams();
    console.log("PARAMSSSS", id);

    let { loading, error, data } = useQuery(GET_BRANCH, {
        variables: { id },
    });

    // const list = data.map((category) => (
    //     <div className="flex flex-col gap-8">
    //         <span className="font-Adam text-primaryDark text-xl">{category.type}</span>
    //         {category.items.map((item) => (
    //             <div> {item}</div>
    //         ))}
    //     </div>
    // ));

    // let view = useState("list");

    if (loading) {
        console.log("data", data);
        return <p>Loading...</p>;
    } else {
        console.log("data loaded", data);
        return (
            <div className="BranchDetail ">
                <div className="flex gap-8">
                    <Breadcrumbs locationName={data.branch.name} id={id} />
                    <Link className="p-2 active:bg-primaryLight h-fit rounded-lg">
                        <EditIcon className="text-primary" />
                    </Link>
                </div>

                <div className="body border  justify-start rounded-xl border-borderColor py-12 px-8 shadow-xl flex flex-col gap-12">
                    <div className="flex gap-2.5 items-center">
                        <MapsIcon />
                        <span className="text-dark text-lg leading-none">{data.branch.location}</span>
                        <EyeIcon />
                    </div>

                    <div className="border-t w-full h-[1px] border-borderColor"></div>

                    {data.branch.workspaces.length === 0 && data.branch.meetingRooms.length === 0 ? (
                        <span className="font-Adam text-xl text-left text-light font-adam">
                            No Associated Spaces
                        </span>
                    ) : (
                        <div className="flex flex-col gap-12">
                            <div className="meetingrooms flex flex-col pb-12 gap-8 border-b border-borderColor">
                                <div className="flex justify-between items-center">
                                    <span className="font-Adam  text-2xl text-dark ">Meeting Rooms</span>
                                    <Link
                                        to={`/meeting-rooms/new`}
                                        state={{ branch_id: data.branch._id }}
                                        className="flex justify-center items-center gap-2 p-3 rounded-xl bg-primary">
                                        <PlusIcon className="h-6 w-6 text-white" />
                                        <span className="font-Adam mt-0.5 text-white font-medium text-xl leading-none">
                                            Add New
                                        </span>
                                    </Link>
                                </div>
                                {data.branch.meetingRooms.length ? (
                                    <div className="flex gap-6 overflow-auto ">
                                        {data.branch.meetingRooms.map((meetingRoom, index) => (
                                            <Link
                                                to={`/meeting-rooms/${meetingRoom._id}`}
                                                key={index}
                                                className="rounded-xl h-fit border border-borderColor  min-w-[302px] overflow-hidden">
                                                <div className="relative h-[134px] overflow-hidden ">
                                                    <img
                                                        className="object-contain"
                                                        src="https://images.inc.com/uploaded_files/image/1920x1080/getty_517610514_353435.jpg"
                                                        alt="workspace"
                                                    />

                                                    <div className="bg-white h-[30px] flex items-center w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-75">
                                                        <span className="font-Adam text-dark text-xs px-2">
                                                            SAR {meetingRoom.ratesPerHour} / period
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="h-fit py-2.5 px-3 gap-1.5 flex flex-col">
                                                    <span className="font-Adam w-fit text-lg text-dark">
                                                        {meetingRoom.name}
                                                    </span>
                                                    <div className="w-fit flex gap-1 items-base">
                                                        <UserIcon className="text-light h-3 w-3" />
                                                        <span className="font-Adam w-fit text-left text-xs text-light">
                                                            {meetingRoom.totalSeats}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="workspaces flex flex-col pb-12 gap-8 border-b border-borderColor">
                                <div className="flex justify-between items-center">
                                    <span className="font-Adam  text-2xl text-dark ">Workspaces</span>
                                    <Link
                                        to={`/workspaces/new`}
                                        state={{ branch_id: data.branch._id }}
                                        className="flex justify-center items-center gap-2 p-3 rounded-xl bg-primary">
                                        <PlusIcon className="h-6 w-6 text-white" />
                                        <span className="font-Adam mt-0.5 text-white text-xl font-medium leading-none">
                                            Add New
                                        </span>
                                    </Link>
                                </div>
                                {data.branch.workspaces.length ? (
                                    <div className="flex gap-6 overflow-auto ">
                                        {data.branch.workspaces.map((workspace, index) => (
                                            <Link
                                                to={`/meeting-rooms/${workspace._id}`}
                                                key={index}
                                                className="rounded-xl h-fit border border-borderColor  min-w-[302px] max-w-[302px]  overflow-hidden">
                                                <div className="relative h-[134px] overflow-hidden ">
                                                    <img
                                                        className="object-contain"
                                                        src="https://images.inc.com/uploaded_files/image/1920x1080/getty_517610514_353435.jpg"
                                                        alt="workspace"
                                                    />

                                                    <div className="bg-white flex items-center h-[30px] w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-75">
                                                        <span className="font-Adam text-dark text-xs px-2">
                                                            SAR {workspace.ratesPerHour} / period
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="h-fit py-2.5 px-3 gap-1.5 flex flex-col">
                                                    <span className="font-Adam w-fit text-lg text-dark">
                                                        {workspace.name}
                                                    </span>
                                                    <UserIcon className="text-light h-3 w-3" />
                                                    <span className="font-Adam w-fit text-left text-xs text-light">
                                                        {workspace.totalSeats}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    "No workspaces"
                                )}
                            </div>
                        </div>
                    )}
                    <div></div>
                </div>
            </div>
        );
    }
}

export default BranchDetail;
