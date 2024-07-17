import { useState } from "react";
import { Input, Spinner, useToast } from "@chakra-ui/react";

import { ReactComponent as ChevronRight } from "../../assets/ChevronRight.svg";
import { ReactComponent as ClockIcon } from "../../assets/ClockIcon.svg";
import { ReactComponent as TickIcon } from "../../assets/TickIcon.svg";
import { ReactComponent as CloseIcon } from "../../assets/CloseIcon.svg";
import { ReactComponent as EditIcon } from "../../assets/EditIcon.svg";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Textarea } from "@chakra-ui/react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TermsAndConditions from "./components/TermsAndConditions";
import LandingPage from "./components/LandingPage";
import CancellationPolicy from "./components/CancellationPolicy";
import AboutPage from "./components/AboutPage";
import { SEND_NOTIFICATION } from "../../queries/notificationsQueries";
import { useMutation } from "@apollo/client";

// import { useQuery } from "@apollo/client";
// import { GET_BRANCHES } from "./queries";

function AnnouncementPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(0);
    const [edit, setEdit] = useState(false);

    const [value, setValue] = useState("");
    const [sendPushNotification, { data, loading, error}] = useMutation(SEND_NOTIFICATION)

    let handleInputChange = (e) => {
        let inputValue = e.target.value;
        setValue(inputValue);
    };

    const toast = useToast()

    async function sendNotification(){
        try{

            await sendPushNotification({
                mutation: SEND_NOTIFICATION,
                variables:{
                    input:{
                        message: value
                    }
                }
            }).then(data =>{
                console.log({data})
                toast({
                    title: "Notification Sent",
                    status: "success"
                })
            })



        }catch(error){
            console.log({error})
            toast({
                title: "Error",
                description: error.message,
                status: "error"
            })
        }
    }

    // console.log("value", value);

    return (
        <div className="workshop-requests">
            <Breadcrumbs />
            <div className="announcementPage flex flex-col gap-8">
                <div className="flex flex-col gap-6  border border-borderColor shadow-lg py-12 px-8 rounded-2xl">
                    <div className="flex gap-6 items-center">
                        <span className="text-2xl">Enter Broadcast</span>
                        <button
                            onClick={() => setEdit(!edit)}
                            className="p-2 h-fit hover:bg-primaryLight rounded-lg">
                            <EditIcon className="text-mediumGray h-8 w-8" />
                        </button>
                    </div>

                    {edit ? (
                        <div className="flex flex-col gap-8">
                            <Textarea
                                value={value}
                                onChange={handleInputChange}
                                placeholder="Enter announcement"
                                className="!border !border-borderColor !text-mediumGray !rounded-xl !p-5 !leading-6 "
                                variant="unstyled"
                            />
                            <div className="flex flex-row gap-6 justify-end w-full">
                                <button
                                    onClick={() => setEdit(false)}
                                    className="flex flex-row gap-2 py-2 px-3 items-center rounded-lgborder border-borderColor bg-errorLight">
                                    <span className="text-sm text-mediumGray font-medium">Cancel</span>
                                    <CloseIcon className="text-error h-5 w-5" />
                                </button>
                                <button onClick={ sendNotification } className="flex flex-row gap-2 py-2 px-3 items-center rounded-lgborder border-borderColor bg-primaryLight">
                                    {loading ? (
                                        <Spinner color="green" className="" />
                                    ) : (
                                        <span className="text-sm text-mediumGray font-medium">
                                            Confirm Changes
                                        </span>
                                    )}
                                    <TickIcon className="text-primary h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-8">
                            <div className="border border-borderColor text-mediumGray rounded-xl p-5 leading-6">
                                {value}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AnnouncementPage;
