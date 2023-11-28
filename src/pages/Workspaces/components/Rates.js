import { Input } from "@chakra-ui/react";

import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";

import { useRecoilState, useRecoilValue } from "recoil";
// import { workshopRequestPayload } from "../../../stores/workshopRequestPayload";

// import { useState } from "react";
import { workspaceBaseRatesState, workspaceCustomRatesState } from "../../../stores/workspaceStore";
import { useState } from "react";

function WorkspaceRates() {
    const [baseRates, setBaseRates] = useRecoilState(workspaceBaseRatesState);
    const [customRates, setCustomRates] = useRecoilState(workspaceCustomRatesState);

    const inputStyle = {
        /* Hide the time input's clock icon */
        WebkitAppearance: "none",
    };

    //////////////////////////// Base rates
    function handleNewBaseRate() {
        let newRate = {
            startTime: "",
            endTime: "",
            rate: null,
        };

        let updatedRates = [...baseRates, newRate];

        setBaseRates(updatedRates);
    }

    const handleBaseTimeChange = (dayIndex, field, value) => {
        const updatedBaseRates = JSON.parse(JSON.stringify(baseRates));
        updatedBaseRates[dayIndex][field] = value;
        setBaseRates(updatedBaseRates);
    };

    function handleBaseRateChange(index, value) {
        let updatedRates = [...baseRates];

        updatedRates[index] = { ...updatedRates[index], rate: parseInt(value) };

        setBaseRates(updatedRates);
    }

    ////////////////////////// Custom Rates

    function handleAddNewCustomDate() {
        let newDate = {
            startDate: "",
            endDate: "",
            ratesInSlot: [
                {
                    startTime: "",
                    endTime: "",
                    rate: null,
                },
            ],
        };

        let updatedRates = [...customRates, newDate];

        setCustomRates(updatedRates);
    }

    function handleCustomDateChange(customDateIndex, field, value) {
        const updatedCustomDate = JSON.parse(JSON.stringify(customRates));
        updatedCustomDate[customDateIndex][field] = value;

        setCustomRates(updatedCustomDate);
    }

    function handleNewCustomTime(index) {
        let newTime = {
            startTime: "",
            endTime: "",
            rate: null,
        };

        let updatedRates = JSON.parse(JSON.stringify(customRates));

        updatedRates[index].ratesInSlot.push(newTime);
        setCustomRates(updatedRates);
    }

    const handleCustomTimeChange = (slotIndex, customDateIndex, field, value) => {
        const updatedCustomRates = JSON.parse(JSON.stringify(customRates));

        updatedCustomRates[customDateIndex].ratesInSlot[slotIndex][field] = value;
        setCustomRates(updatedCustomRates);
    };

    function handleCustomRateChange(slotIndex, customDateIndex, value) {
        const updatedCustomRates = JSON.parse(JSON.stringify(customRates));
        updatedCustomRates[customDateIndex].ratesInSlot[slotIndex].rate = parseInt(value);
        setCustomRates(updatedCustomRates);
    }

    function getDate(value) {
        if (value.includes("-")) {
            return value;
        } else {
            const date = new Date(parseInt(value));
            return date.toISOString().slice(0, 10);
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div className="text-left text-2xl">Base Rates</div>
                <button
                    className="rounded-lg border border-borderColor px-6 py-4 bg-primaryLight flex items-center"
                    onClick={() => handleAddNewCustomDate()}>
                    <span className="text-lg leading-normal">Add Custom Dates</span>
                    <PlusIcon className="h-4 w-4 text-dark fill-dark " />
                </button>
            </div>

            <div className="border rounded-xl border-borderColor divide-y-[1px] divide-borderColor ">
                <span className="block base-rate px-6 py-4 text-lg text-dark">Base Rate</span>

                <div className="divide-y-[1px] divide-[#E3E3E3] px-6 py-4">
                    {baseRates.map((rate, index) => (
                        <div key={index} className="base-rate py-4 flex  items-baseline justify-between ">
                            <div className="timeSelector flex items-center w-fit">
                                <div className="start-time flex py-2 px-4 items-center justify-center gap-3 w-full">
                                    <div className="border rounded border-mediumGray grid place-content-center">
                                        <Input
                                            id="starthour"
                                            variant="unstyled"
                                            value={rate.startTime}
                                            className="text-xs 
																						input text-mediumGray leading-[18px] h-5  mx-1 my-0.5 "
                                            onChange={(event) =>
                                                handleBaseTimeChange(index, "startTime", event.target.value)
                                            }
                                            type="time"
                                        />
                                    </div>
                                </div>

                                <span className="text-base text-center font-normal">-</span>

                                <div className="end-time flex py-2 px-4 items-center justify-center gap-3 w-full">
                                    <div className="border rounded border-mediumGray grid place-content-center">
                                        <Input
                                            id="endhour"
                                            variant="unstyled"
                                            value={rate.endTime}
                                            className="text-xs 
																						input
																						text-mediumGray leading-[18px] h-5 mx-1  my-0.5"
                                            onChange={(event) =>
                                                handleBaseTimeChange(index, "endTime", event.target.value)
                                            }
                                            type="time"
                                            style={inputStyle}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="rate flex gap-2.5 items-baseline">
                                <span className="">SAR</span>
                                <div className="title rounded-xl border overflow-hidden px-3 max-w-[70px]">
                                    <Input
                                        variant="unstyled"
                                        value={rate.rate}
                                        placeholder="Rate"
                                        type="number"
                                        className="py-2 text-xl text-primary leading-6 text-center"
                                        onChange={(event) => handleBaseRateChange(index, event.target.value)}
                                    />
                                </div>
                                <span className="">/ hr</span>
                            </div>
                        </div>
                    ))}
                    <button
                        className="rounded-lg border border-borderColor gap-2 px-6 py-2 bg-primaryLight flex items-center"
                        onClick={() => handleNewBaseRate()}>
                        <span className="text-lg leading-normal">Add New Time</span>
                        <PlusIcon className="h-4 w-4 text-dark fill-dark " />
                    </button>
                </div>

                {customRates.map((customRate, customDateIndex) => (
                    <div className="divide-y-[1px] divide-borderColor" key={customDateIndex}>
                        <div className="custom-rate px-6 py-4 flex gap-2  items-baseline justify-between w-fit">
                            {/* <span className="custom-rate text-lg text-dark">
                                {customRate.startDate} - {customRate.endDate}
                            </span> */}

                            <div className="border rounded border-mediumGray px-2">
                                <Input
                                    variant="unstyled"
                                    type="date"
                                    id="start"
                                    name="date-start"
                                    value={getDate(customRate.startDate)}
                                    className="max-w-[200px] text-lg text-dark"
                                    onChange={(event) =>
                                        handleCustomDateChange(
                                            customDateIndex,
                                            "startDate",
                                            event.target.value
                                        )
                                    }
                                />
                                {/* max={customRate.endDate} */}
                            </div>

                            <span className="text-lg text-dark">-</span>

                            <div className="border rounded border-mediumGray px-2">
                                <Input
                                    variant="unstyled"
                                    type="date"
                                    id="end"
                                    name="date-end"
                                    value={getDate(customRate.endDate)}
                                    className="max-w-[200px] text-lg text-dark"
                                    onChange={(event) =>
                                        handleCustomDateChange(customDateIndex, "endDate", event.target.value)
                                    }
                                />
                                {/* min={customRate.startDate} */}
                            </div>
                        </div>
                        <div className="divide-y-[1px] divide-[#E3E3E3] px-6 py-4">
                            {customRate.ratesInSlot.map((slotRate, slotIndex) => (
                                <div
                                    key={slotIndex}
                                    className="custom-slotRate py-4 flex  items-baseline justify-between ">
                                    <div className="timeSelector flex items-center w-fit">
                                        <div className="start-time flex py-2 px-4 items-center justify-center gap-3 w-full">
                                            <div className="border rounded border-mediumGray grid place-content-center">
                                                <Input
                                                    id="starthour"
                                                    variant="unstyled"
                                                    value={slotRate.startTime}
                                                    className="text-xs 
																						input text-mediumGray leading-[18px] h-5  mx-1 my-0.5 "
                                                    onChange={(event) =>
                                                        handleCustomTimeChange(
                                                            slotIndex,
                                                            customDateIndex,
                                                            "startTime",
                                                            event.target.value
                                                        )
                                                    }
                                                    type="time"
                                                />
                                            </div>
                                        </div>

                                        <span className="text-base text-center font-normal">-</span>

                                        <div className="end-time flex py-2 px-4 items-center justify-center gap-3 w-full">
                                            <div className="border rounded border-mediumGray grid place-content-center">
                                                <Input
                                                    id="endhour"
                                                    variant="unstyled"
                                                    value={slotRate.endTime}
                                                    className="text-xs 
																						input
																						text-mediumGray leading-[18px] h-5 mx-1  my-0.5"
                                                    onChange={(event) =>
                                                        handleCustomTimeChange(
                                                            slotIndex,
                                                            customDateIndex,
                                                            "endTime",
                                                            event.target.value
                                                        )
                                                    }
                                                    type="time"
                                                    style={inputStyle}
                                                />
                                            </div>
                                        </div>
                                    </div>
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
                                                    handleCustomRateChange(
                                                        slotIndex,
                                                        customDateIndex,
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <span className="">/ hr</span>
                                    </div>
                                </div>
                            ))}

                            <button
                                className="rounded-lg border border-borderColor gap-2 px-6 py-2 bg-primaryLight flex items-center"
                                onClick={() => handleNewCustomTime(customDateIndex)}>
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
