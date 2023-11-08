// import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as PlusIcon } from "../../assets/PlusIcon.svg";
import { GET_BRANCH } from "../../queries/branchesQueries";
import { useQuery } from "@apollo/client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Breadcrumbs from "../../components/Breadcrumbs";

function BranchDetail() {
    // let data = [
    //     {
    //         type: "Workspaces",
    //         items: [
    //             {
    //                 title: "Worksapce 1",
    //                 cost: 230,
    //                 capacity: 24,
    //                 image: "",
    //             },
    //             {
    //                 title: "Worksapce 1",
    //                 cost: 230,
    //                 capacity: 24,
    //                 image: "",
    //             },
    //             {
    //                 title: "Worksapce 1",
    //                 cost: 230,
    //                 capacity: 24,
    //                 image: "",
    //             },
    //             {
    //                 title: "Worksapce 1",
    //                 cost: 230,
    //                 capacity: 24,
    //                 image: "",
    //             },
    //             {
    //                 title: "Worksapce 1",
    //                 cost: 230,
    //                 capacity: 24,
    //                 image: "",
    //             },
    //         ],
    //     },
    //     {
    //         type: "Meeting Rooms",
    //         items: [
    //             {
    //                 title: "Meeting Room 1",
    //                 cost: 230,
    //                 capacity: 24,
    //                 image: "",
    //             },
    //             {
    //                 title: "Meeting Room 2",
    //                 cost: 230,
    //                 capacity: 24,
    //                 image: "",
    //             },
    //             {
    //                 title: "Meeting Room 3",
    //                 cost: 230,
    //                 capacity: 24,
    //                 image: "",
    //             },
    //         ],
    //     },
    // ];

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
                <Breadcrumbs locationName={data.branch.name} id={id} />
                <div className="body border justify-start rounded-xl border-borderColor py-12 px-8 shadow-md flex flex-col gap-12">
                    <div className="flex gap-2.5">
                        <div>Icon</div>
                        <div>{data.branch.location}</div>
                        <div>aankh</div>Location
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
                                        <PlusIcon className="h-6 w-6" />
                                        <span className="font-Adam text-white text-xl leading-6">
                                            Add New
                                        </span>
                                    </Link>
                                </div>
                                {data.branch.meetingRooms.length ? (
                                    <div className="flex gap-6 overflow-auto ">
                                        {data.branch.meetingRooms.map((item, index) => (
                                            <Link
                                                to={`/meeting-rooms/${item._id}`}
                                                key={index}
                                                className="rounded-xl h-fit border border-borderColor  min-w-[302px] overflow-hidden">
                                                <div className="relative h-[134px] overflow-hidden ">
                                                    <img
                                                        className="object-contain"
                                                        src="https://images.inc.com/uploaded_files/image/1920x1080/getty_517610514_353435.jpg"
                                                        alt="workspace"
                                                    />

                                                    <div className="bg-white h-[30px] w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-50">
                                                        <span className="font-Adam text-dark text-xs">
                                                            SAR {item.ratesPerHour} / period
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="h-fit py-2.5 px-3 gap-1.5 flex flex-col">
                                                    <span className="font-Adam w-fit text-lg text-dark">
                                                        {item.name}
                                                    </span>
                                                    <div className="w-fit">
                                                        <span className="font-Adam w-fit text-left text-sm text-light">
                                                            {item.totalSeats}
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
                                        <PlusIcon className="h-6 w-6" />
                                        <span className="font-Adam text-white text-xl leading-6">
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

                                                    <div className="bg-white h-[30px] w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-50">
                                                        <span className="font-Adam text-dark text-xs">
                                                            SAR {workspace.ratesPerHour} / period
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="h-fit py-2.5 px-3 gap-1.5 flex flex-col">
                                                    <span className="font-Adam w-fit text-lg text-dark">
                                                        {workspace.name}
                                                    </span>
                                                    <div className="w-fit">
                                                        <span className="font-Adam w-fit text-left text-sm text-light">
                                                            {workspace.totalSeats}
                                                        </span>
                                                    </div>
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
