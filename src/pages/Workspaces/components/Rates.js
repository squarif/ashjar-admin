import { Input } from "@chakra-ui/react";

import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";

import { useRecoilState, useRecoilValue } from "recoil";
// import { workshopRequestPayload } from "../../../stores/workshopRequestPayload";

// import { useState } from "react";
import {
    editWorkspaceRequest,
    workspaceBaseRatesState,
    workspaceCustomRatesState,
} from "../../../stores/workspaceStore";

function WorkspaceRates() {
    // const [requestPayload, setWorkShopRequestPayload] = useRecoilState(workshopRequestPayload);

    const [requestPayload, setNewWorkspacePayload] = useRecoilState(editWorkspaceRequest);

    const [baseRates, setBaseRates] = useRecoilState(workspaceBaseRatesState);
    const [customRates, setCustomRates] = useRecoilState(workspaceCustomRatesState);

    function handleNewBaseRate() {
        let newRate = {
            startTime: "Dec 19 2023",
            endTime: "Dec 23 2023",
            rate: "69",
        };

        let updatedRates = [...baseRates, newRate];

        //  console.log("updatedRates", updatedRates);

        setBaseRates(updatedRates, () => {
            //  console.log("updatedRates state", baseRates);
        });
    }

    function handleNewCustomRate() {
        let newRate = {
            dateStart: "Dec 19 2023",
            dateEnd: "Dec 23 2023",
            rate: "69",
        };

        let updatedRates = [...baseRates, newRate];

        //  console.log("updatedRates", updatedRates);

        setBaseRates(updatedRates, () => {
            //  console.log("updatedRates state", baseRates);
        });
    }

    function handleCustomRateChange(index, value) {
        let updatedRates = [...baseRates];

        updatedRates[index] = { ...updatedRates[index], rate: value };

        setBaseRates(updatedRates);
    }

    function handleBaseRateChange(value) {
        let updatedRequest = { ...requestPayload };

        updatedRequest.ratesPerHour = value;

        setNewWorkspacePayload(updatedRequest);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div className="text-left text-2xl">baseRates</div>
                <button
                    className="rounded-lg border border-borderColor px-6 py-4 bg-primaryLight flex items-center"
                    onClick={() => handleNewRate()}>
                    <span className="text-lg leading-normal">Add Custom Dates</span>
                    <PlusIcon className="h-4 w-4 text-dark fill-dark " />
                </button>
            </div>

            <div className="border rounded-xl border-borderColor divide-y-[1px] divide-borderColor ">
                <span className="block base-rate px-6 py-4 text-lg text-dark">Base Rate</span>

                <div className="divide-y-[1px] divide-[#E3E3E3] px-6 py-4">
                    {baseRates.map((rate, index) => (
                        <div key={index} className="base-rate py-4 flex  items-baseline justify-between ">
                            <span className="base-rate text-lg text-mediumGray">
                                {rate.startTime} - {rate.endTime}
                            </span>
                            <div className="rate flex gap-2.5 items-baseline">
                                <span className="">SAR</span>
                                <div className="title rounded-xl border overflow-hidden px-3 max-w-[70px]">
                                    <Input
                                        variant="unstyled"
                                        value={rate.rate}
                                        placeholder="Rate"
                                        type="number"
                                        className="py-2 text-xl text-primary leading-6 text-center"
                                        onChange={(event) =>
                                            handleCustomRateChange(index, event.target.value)
                                        }
                                    />
                                </div>
                                <span className="">/ hr</span>
                            </div>
                        </div>
                    ))}
                    <button
                        className="rounded-lg border border-borderColor px-6 py-2 bg-primaryLight flex items-center"
                        onClick={() => handleNewBaseRate()}>
                        <span className="text-lg leading-normal">Add New Time</span>
                        <PlusIcon className="h-4 w-4 text-dark fill-dark " />
                    </button>
                </div>

                {customRates.map((customRate, index) => (
                    <div className="divide-y-[1px] divide-borderColor">
                        <div className="custom-rate px-6 py-4 flex  items-baseline justify-between ">
                            <span className="custom-rate text-lg text-dark">
                                {customRate.startDate} - {customRate.endDate}
                            </span>
                        </div>
                        <div className="divide-y-[1px] divide-[#E3E3E3] px-6">
                            {customRate.ratesInSlot.map((slotRate, index) => (
                                <div
                                    key={index}
                                    className="custom-slotRate py-4 flex  items-baseline justify-between ">
                                    <span className="custom-slotRate text-lg text-mediumGray">
                                        {slotRate.startTime} - {slotRate.endTime}
                                    </span>
                                    <div className="slotRate flex gap-2.5 items-baseline">
                                        <span className="">SAR</span>
                                        <div className="title rounded-xl border overflow-hidden px-3 max-w-[70px]">
                                            <Input
                                                variant="unstyled"
                                                value={slotRate.rate}
                                                placeholder="Rate"
                                                type="number"
                                                className="py-2 text-xl text-primary leading-6 text-center"
                                                onChange={(event) =>
                                                    handleCustomRateChange(index, event.target.value)
                                                }
                                            />
                                        </div>
                                        <span className="">/ hr</span>
                                    </div>
                                </div>
                            ))}

                            <button
                                className="rounded-lg border border-borderColor px-6 py-2 bg-primaryLight flex items-center"
                                onClick={() => handleNewCustomRate()}>
                                <span className="text-lg leading-normal">Add New Time</span>
                                <PlusIcon className="h-4 w-4 text-dark fill-dark " />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkspaceRates;
