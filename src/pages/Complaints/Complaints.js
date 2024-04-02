import { useEffect, useState } from "react";
import { Input, useToast } from "@chakra-ui/react";

import { ReactComponent as ChevronRight } from "../../assets/ChevronRight.svg";
import { ReactComponent as ClockIcon } from "../../assets/ClockIcon.svg";
import { ReactComponent as TickIcon } from "../../assets/TickIcon.svg";
import { ReactComponent as CloseIcon } from "../../assets/CloseIcon.svg";
import { ReactComponent as PlusIcon } from "../../assets/PlusIcon.svg";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COMPLAINTS, UPDATE_COMPLAINT } from "../../queries/complaintQueries";
import Loader from "../../components/Loader";
import PicturesGrid from "../../components/PicturesGrid";
import { complaintPictures } from "../../stores/complaintStore";
import ComplaintPicturesGrid from "../../components/complaintPicturesGrid";

// import { useQuery } from "@apollo/client";
// import { GET_BRANCHES } from "./queries";

function Complaints() {
    // let { loading, error, data } = useQuery(GET_BRANCHES);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [pictures, setPictures] = useRecoilState(complaintPictures);
    const [complaintsList, setComplaintsList] = useState([]);

    const toast = useToast();

    const { loading: complaintsLoading, error: complaintsError, data } = useQuery(GET_COMPLAINTS);
    useEffect(() => {
        if (!complaintsLoading && !complaintsError) {
            // Set the info data

            //  console.log("compalinsts", data);
            // console.log("data", data.informationManagementAll[0]);
            // console.log("data", data.informationManagementAll[0].aboutAshjarSpace);
            // console.log("data", data.informationManagementAll[0].cancellationPolicy);
            // console.log("data", data.informationManagementAll[0].termsAndConditions);

            setComplaintsList(data.complaints);

            // setEditInfoRequest(data.informationManagementAll[0]);
        }
    }, [complaintsLoading, complaintsError, data]);

    const [editComplaintHandler] = useMutation(UPDATE_COMPLAINT);

    async function handleUpdateComplaint(status) {
        let complaint = complaintsList[selectedComplaint];

        let payload = {
            _id: complaint?._id,
            complaintStatus: status,
        };

        if ("__typename" in payload) delete payload["__typename"];

        //  console.log("payload", payload);

        try {
            const { data } = await editComplaintHandler({
                mutation: UPDATE_COMPLAINT,
                variables: {
                    input: payload,
                },
            });

            toast({
                title: "Complaint Updated!",
                status: "success",
            });

            //  console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    function statusBadge(status) {
        if (status.toLowerCase().includes("pending")) {
            return (
                <div className="border rounded-xl bg-[#F0F0EE] border-light flex gap-2 py-1.5 px-3 items-center ">
                    <ClockIcon className="h-4 w-4" />
                    <span className="text-sm leading-4 text-gray-600"> Pending</span>
                </div>
            );
        }
        if (status.toLowerCase().includes("resolved")) {
            return (
                <div className="border rounded-xl bg-primaryLight border-light flex gap-2 py-1.5 px-3 items-center ">
                    <TickIcon className="h-4 w-4" />
                    <span className="text-sm leading-4 text-gray-600"> Resolved</span>
                </div>
            );
        }
        if (status.toLowerCase().includes("rejected")) {
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

    const listItems = complaintsList.map((complaint, index) => {
        //  console.log("complaint", complaint);
        return (
            <button
                key={index}
                onClick={() => selectComplaint(index)}
                className="flex p-6 w-full justify-between items-center"
            >
                <div className="flex flex-col justify-start gap-4">
                    <div className="flex gap-6 items-center">
                        <div className="text-base text-dark leading-5">
                            R-{complaint?.complaintNumber}
                        </div>
                        {statusBadge(complaint?.complaintStatus)}
                    </div>
                    <div className="text-left text-xs text-light">
                        Complaint Type: {complaint?.complaintType}
                    </div>
                </div>

                <ChevronRight />
            </button>
        );
    });

    function renderSelectedComplaint(selectedComplaint) {
        if (selectedComplaint == null) {
            return <div>No Complaint Selected</div>;
        } else {
            let complaint = complaintsList[selectedComplaint];
            setPictures(complaint?.pictures);

            return (
                <div className="grid grid-cols-6 gap-2.5 h-full">
                    <div className="flex col-span-4 flex-col justify-between ">
                        <div className="complaintBody flex flex-col gap-8">
                            <div className="header flex gap-6 items-baseline">
                                <span className="text-dark text-2xl">
                                    {complaint?.complaintTitle}
                                </span>
                                {statusBadge(complaint?.complaintStatus)}
                            </div>
                            <span className="description text-left text-base text-mediumGray">
                                {complaint?.complaintDescription}
                            </span>

                            {pictures?.length ? (
                                <ComplaintPicturesGrid picturesState={complaintPictures} />
                            ) : (
                                "No pictures uploaded"
                            )}
                        </div>
                        <div className="complaintActions mt-6 flex w-full justify-end gap-6">
                            <button
                                disabled={complaint?.complaintStatus === "rejected"}
                                onClick={() => handleUpdateComplaint("rejected")}
                                className="disabled:opacity-75 py-2 flex gap-2.5 items-center px-3 rounded-lg border-light bg-errorLight shadow-md"
                            >
                                <span className="text-sm font-medium text-mediumGray">Reject</span>
                                <CloseIcon className="h-4 w-4 text-error" />
                            </button>
                            <button
                                disabled={complaint?.complaintStatus === "resolved"}
                                onClick={() => handleUpdateComplaint("resolved")}
                                className="disabled:opacity-75 py-2 flex gap-2.5 items-center px-3 rounded-lg border-light bg-primaryLight shadow-md"
                            >
                                <span className="text-sm font-medium text-mediumGray">
                                    Mark as Resolved
                                </span>
                                <TickIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col col-span-2 my-6 p-6 gap-6">
                        <div className="flex justify-between">
                            <div className="text-base text-mediumGray">Name</div>
                            <div className="">{complaint?.userDetail?.name}</div>
                        </div>
                        {/* <div className="flex justify-between">
                            <div className="text-base text-mediumGray">Email</div>
                            <div className="">{complaint?.userDetail?.email}</div>
                        </div> */}
                        <div className="flex justify-between">
                            <div className="text-base text-mediumGray">Phone</div>
                            <div className="">{complaint?.userDetail?.phoneNumber}</div>
                        </div>
                        {/* <div className="flex justify-between">
                            <div className="text-base text-mediumGray">Company</div>
                            <div className="">{complaint?.userDetail.company}</div>
                        </div> */}
                    </div>
                </div>
            );
        }
    }

    if (complaintsLoading)
        return (
            <div className="h-[400px]">
                <Loader />
            </div>
        );

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
                            onChange={event => setSearchQuery(event.target.value)}
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
