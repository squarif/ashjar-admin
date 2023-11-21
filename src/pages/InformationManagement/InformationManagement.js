import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";

import { ReactComponent as ChevronRight } from "../../assets/ChevronRight.svg";
import { ReactComponent as ClockIcon } from "../../assets/ClockIcon.svg";
import { ReactComponent as TickIcon } from "../../assets/TickIcon.svg";
import { ReactComponent as CloseIcon } from "../../assets/CloseIcon.svg";
import { ReactComponent as EditIcon } from "../../assets/EditIcon.svg";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TermsAndConditions from "./components/TermsAndConditions";
import LandingPage from "./components/LandingPage";
import CancellationPolicy from "./components/CancellationPolicy";
import AboutPage from "./components/AboutPage";
import { useQuery } from "@apollo/client";
import { GET_INFO } from "../../queries/informationManagement";
import { useRecoilState } from "recoil";
import { editInformationManagementRequest } from "../../stores/informationManagement";

// import { useQuery } from "@apollo/client";
// import { GET_BRANCHES } from "./queries";

function InformationManagement() {
    // let { loading, error, data } = useQuery(GET_BRANCHES);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [value, setValue] = useState("");
    const [infoData, setInfoData] = useState([]);

    const [_, setEditInfoRequest] = useRecoilState(editInformationManagementRequest);

    const { loading: infoLoading, error: infoError, data } = useQuery(GET_INFO);
    useEffect(() => {
        if (!infoLoading && !infoError) {
            // Set the info data
            console.log("data", data.informationManagementAll[0]);
            console.log("data", data.informationManagementAll[0].aboutAshjarSpace);
            console.log("data", data.informationManagementAll[0].cancellationPolicy);
            console.log("data", data.informationManagementAll[0].termsAndConditions);

            setInfoData(data.informationManagementAll[0]);
            setEditInfoRequest(data.informationManagementAll[0]);
        }
    }, [infoLoading, infoError, data]);

    const requestList = [
        {
            title: "Terms and Conditions",
        },
        {
            title: "Cancellation Policy",
        },
        {
            title: "About Ashjar Space",
        },
        {
            title: "Landing Page",
        },
    ];

    function selectItem(index) {
        if (selectedItem === index) {
            setSelectedItem();
        } else {
            setSelectedItem(index);
        }
    }

    const listItems = requestList.map((item, index) => (
        <button
            key={index}
            onClick={() => selectItem(index)}
            className={
                index === selectedItem
                    ? "flex p-6 w-full justify-between items-center rounded-xl border border-primary shadow-md"
                    : "flex p-6 w-full justify-between items-center rounded-xl border border-transparent"
            }>
            <div className="flex flex-col text-xl justify-start gap-4">{item.title}</div>

            <ChevronRight className={index === selectedItem ? "text-primary" : "text-light"} />
        </button>
    ));

    function renderSelectedItem(selectedItem) {
        if (selectedItem == null) {
            return <div>No Item Selected</div>;
        } else {
            if (selectedItem === 0) {
                return <TermsAndConditions data={infoData.termsAndConditions} />;
            } else if (selectedItem === 1) {
                return <CancellationPolicy data={infoData.cancellationPolicy} />;
            } else if (selectedItem === 2) {
                return <AboutPage data={infoData.aboutAshjarSpace} />;
            } else if (selectedItem === 3) {
                return <LandingPage data={infoData.landingPage} />;
            }
        }
    }

    return (
        <div className="workshop-requests">
            <Breadcrumbs />
            <div className="InformationManagement grid grid-cols-6 gap-6 h-[100%]">
                <div className="col-span-2">
                    <div className="h-full flex-col relative shadow-md flex border rounded-2xl p-4">
                        {listItems}
                    </div>
                </div>
                <div className="relative shadow-md border rounded-2xl px-8 py-12 col-span-4">
                    {renderSelectedItem(selectedItem)}
                </div>
            </div>
        </div>
    );
}

export default InformationManagement;
