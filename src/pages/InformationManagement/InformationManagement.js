import { useEffect, useState } from "react";

import { ReactComponent as ChevronRight } from "../../assets/ChevronRight.svg";
import Breadcrumbs from "../../components/Breadcrumbs";

import "react-quill/dist/quill.snow.css";
import TermsAndConditions from "./components/TermsAndConditions";
import LandingPage from "./components/LandingPage";
import CancellationPolicy from "./components/CancellationPolicy";
import AboutPage from "./components/AboutPage";
import { useQuery } from "@apollo/client";
import { GET_INFO } from "../../queries/informationManagement";
import { useRecoilState } from "recoil";
import { editInformationManagementRequest, landingPagePictures } from "../../stores/informationManagement";
import Loader from "../../components/Loader";

function InformationManagement() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [infoData, setInfoData] = useState([]);
    const [_, setEditInfoRequest] = useRecoilState(editInformationManagementRequest);
    const [pictures, setPictures] = useRecoilState(landingPagePictures);

    const { loading: infoLoading, error: infoError, data } = useQuery(GET_INFO);
    useEffect(() => {
        if (!infoLoading && !infoError) {
            setInfoData(data.informationManagementAll[0]);
            setEditInfoRequest(data.informationManagementAll[0]);
            setPictures(data.informationManagementAll[0].landingPage.pictures);
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
        if (infoLoading)
            return (
                <div className="h-[400px]">
                    <Loader />
                </div>
            );

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
