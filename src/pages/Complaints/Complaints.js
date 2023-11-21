import { useState } from "react";
import { Input } from "@chakra-ui/react";

import { ReactComponent as ChevronRight } from "../../assets/ChevronRight.svg";
import { ReactComponent as ClockIcon } from "../../assets/ClockIcon.svg";
import { ReactComponent as TickIcon } from "../../assets/TickIcon.svg";
import { ReactComponent as CloseIcon } from "../../assets/CloseIcon.svg";
import { ReactComponent as PlusIcon } from "../../assets/PlusIcon.svg";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

// import { useQuery } from "@apollo/client";
// import { GET_BRANCHES } from "./queries";

function Complaints() {
    // let { loading, error, data } = useQuery(GET_BRANCHES);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    let [pictures, setPictures] = useState([]);

    const complaintsList = [
        {
            id: 1234,
            status: "pending",
            title: "Pottery Class",
            complaintee: {
                name: "Adnan",
                email: "user2@gmail.com",
                phone: "+92318549669",
                company: "Bridglinx",
            },

            description:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ..",
            numberOfSeats: "20",
            cost: "12.0",
            gender: ["Male", "Female"],
            ageGroup: "12+",
            duration: {
                hours: "2",
                minutes: "30",
            },
        },
        {
            id: 1234,
            status: "approved",
            title: "Potions Class",
            complaintee: {
                name: "Adnan",
                email: "user2@gmail.com",
                phone: "+92318549669",
                company: "Bridglinx",
            },
            description:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ..",
            numberOfSeats: "20",
            cost: "12.0",
            gender: ["Male", "Female"],
            ageGroup: "12+",
            duration: {
                hours: "2",
                minutes: "30",
            },
        },
        {
            id: 1234,
            status: "approved",
            title: "Witchcart Class",
            complaintee: {
                name: "Adnan",
                email: "mohid@gmail.com",
                phone: "+92318549669",
                company: "Bridglinx",
            },
            description:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ..",
            numberOfSeats: "20",
            cost: "12.0",
            gender: ["Male", "Female"],
            ageGroup: "12+",
            duration: {
                hours: "2",
                minutes: "30",
            },
        },
        {
            id: 1234,
            status: "rejected",
            title: "Session Class",
            complaintee: {
                name: "Adnan",
                email: "adil@gmail.com",
                phone: "+92318549669",
                company: "Bridglinx",
            },
            description:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ..",
            numberOfSeats: "20",
            cost: "12.0",
            gender: ["Male", "Female"],
            ageGroup: "12+",
            duration: {
                hours: "2",
                minutes: "30",
            },
        },
    ];

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

    function selectComplaint(index) {
        if (selectedComplaint === index) {
            setSelectedComplaint();
        } else {
            setSelectedComplaint(index);
        }
    }

    const listItems = complaintsList.map((complaint, index) => (
        <button
            key={index}
            onClick={() => selectComplaint(index)}
            className="flex p-6 w-full justify-between items-center">
            <div className="flex flex-col justify-start gap-4">
                <div className="flex gap-6 items-center">
                    <div className="text-base text-dark leading-5">R-{complaint.id}</div>
                    {statusBadge(complaint.status)}
                </div>
                <div className="text-left text-xs text-light">
                    Complaint for pottery class from user {complaint.complaintee.email}
                </div>
            </div>

            <ChevronRight />
        </button>
    ));

    function renderSelectedComplaint(selectedComplaint) {
        if (selectedComplaint == null) {
            return <div>No Complaint Selected</div>;
        } else {
            let complaint = complaintsList[selectedComplaint];

            return (
                <div className="grid grid-cols-6 gap-2.5 h-full">
                    <div className="flex col-span-4 flex-col justify-between ">
                        <div className="complaintBody flex flex-col gap-8">
                            <div className="header flex gap-6 items-baseline">
                                <span className="text-dark text-2xl">{complaint.title}</span>
                                <div className="">{statusBadge(complaint.status)}</div>
                            </div>
                            <span className="description text-left text-base text-mediumGray">
                                {complaint.description}
                            </span>
                            {pictures.length ? (
                                <div>
                                    <span className="text-left text-xl text-dark">Pictures</span>
                                    <div className="pictures grid grid-cols-5 grid-rows-2 gap-6">
                                        {pictures?.map((picture, index) =>
                                            index === 0 ? (
                                                <div className="relative overflow-hidden rounded-2xl border col-span-3 row-span-2">
                                                    <img alt="" src={picture} />
                                                </div>
                                            ) : (
                                                <div className="overflow-hidden border rounded-2xl">
                                                    <img className="" alt="" src={picture} />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="complaintActions flex w-full justify-end gap-6">
                            <button className="py-2 flex gap-2.5 items-center px-3 rounded-lg border-light bg-errorLight shadow-md">
                                <span className="text-sm font-medium text-mediumGray">Reject</span>
                                <CloseIcon className="h-4 w-4 text-error" />
                            </button>
                            <Link
                                to="/workshops/complaints/create-post"
                                className="py-2 flex gap-2.5 items-center px-3 rounded-lg border-light bg-primaryLight shadow-md">
                                <span className="text-sm font-medium text-mediumGray">Mark as Resolved</span>
                                <TickIcon className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col col-span-2 my-6 p-6 gap-6">
                        <div className="flex justify-between">
                            <div className="text-base text-mediumGray">Name</div>
                            <div className="">{complaint.complaintee.name}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-base text-mediumGray">Email</div>
                            <div className="">{complaint.complaintee.email}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-base text-mediumGray">Phone</div>
                            <div className="">{complaint.complaintee.phone}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-base text-mediumGray">Company</div>
                            <div className="">{complaint.complaintee.company}</div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="workshop-complaints">
            <Breadcrumbs />
            <div className="Complaints grid grid-cols-6 gap-6 h-[100%]">
                <div className="col-span-2">
                    <div className="Search mb-6 rounded-xl border overflow-hidden px-4 shadow-md ">
                        <Input
                            variant="unstyled"
                            value={searchQuery}
                            placeholder="Search"
                            className=" py-3 px-6 w-[430px] "
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />

                        <div className="Filter"></div>
                    </div>
                    <div className="ComplaintList flex-col relative shadow-md flex border rounded-2xl p-4">
                        {listItems}
                    </div>
                </div>
                <div className="ComplaintBody relative shadow-md border rounded-2xl px-8 py-12 col-span-4 ">
                    {renderSelectedComplaint(selectedComplaint)}
                </div>
            </div>
        </div>
    );
}

export default Complaints;
