import { Input } from "@chakra-ui/react";

import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";

import { useRecoilState, useRecoilValue } from "recoil";
// import { workshopRequestPayload } from "../../../../stores/workshopStore";

// import { useState } from "react";
import { meetingRoomRatesState, newMeetingRoomRequest } from "../../../stores/meetingRoomStore";

function MeetingRoomRates() {
    // const [requestPayload, setWorkShopRequestPayload] = useRecoilState(workshopRequestPayload);

    const [requestPayload, setNewMeetingRoomPayload] = useRecoilState(newMeetingRoomRequest);

    const [rates, setRates] = useRecoilState(meetingRoomRatesState);

    function handleNewRate() {
        let newRate = {
            startDate: new Date(),
            endDate: new Date(),
            rate: null,
        };

        let updatedRates = [...rates, newRate];

        //  console.log("updatedRates", updatedRates);

        setRates(updatedRates, () => {
            //  console.log("updatedRates state", rates);
        });
    }

    function handleBaseRateChange(value) {
        let updatedRequest = { ...requestPayload };

        updatedRequest.ratesPerHour = value;

        setNewMeetingRoomPayload(updatedRequest);
    }

    function handleCustomDateChange(customDateIndex, field, value) {
        const updatedCustomDate = JSON.parse(JSON.stringify(rates));
        updatedCustomDate[customDateIndex][field] = value;

        setRates(updatedCustomDate);
    }

    function handleCustomRateChange(index, value) {
        let updatedRates = [...rates];

        updatedRates[index] = { ...updatedRates[index], rate: parseFloat(value) };

        setRates(updatedRates);
    }

    function getDate(value) {
        console.log("getDate", value);
        if (typeof value === "string") {
            if (value.includes("-")) {
                return value;
            } else {
                const date = new Date(parseInt(value));
                return date.toISOString().slice(0, 10);
            }
        } else {
            return value;
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div className="text-left text-2xl">Rates</div>
                <button
                    className="rounded-lg border border-borderColor px-6 py-4 bg-primaryLight flex items-center"
                    onClick={() => handleNewRate()}>
                    <span className="text-lg leading-normal">Add Custom Rate</span>
                    <PlusIcon className="h-4 w-4 text-dark fill-dark " />
                </button>
            </div>

            <div className="border rounded-xl border-borderColor divide-y-[1px] divide-borderColor">
                <div className="base-rate px-6 py-4 flex  items-baseline justify-between ">
                    <span className="base-rate text-lg text-mediumGray">Base Rate</span>
                    <div className="rate flex gap-2.5 items-baseline">
                        <span className="">SAR</span>
                        <div className="title rounded-xl border overflow-hidden px-3 max-w-[70px]">
                            <Input
                                variant="unstyled"
                                value={requestPayload.ratesPerHour}
                                type="number"
                                placeholder="Enter workshop name"
                                className="py-2 text-xl text-primary leading-6 text-center"
                                onChange={(event) => handleBaseRateChange(event.target.value)}
                            />
                        </div>
                        <span className="">/ hr</span>
                    </div>
                </div>

                {rates.map((rate, index) => (
                    <div key={index} className="base-rate px-6 py-4 flex  items-baseline justify-between ">
                        <div className="custom-rate flex gap-2  items-baseline justify-between w-fit">
                            <div className="border rounded border-mediumGray px-2">
                                <Input
                                    variant="unstyled"
                                    type="date"
                                    id="start"
                                    name="date-start"
                                    value={getDate(rate.startDate)}
                                    className="max-w-[200px] text-lg text-dark"
                                    onChange={(event) =>
                                        handleCustomDateChange(index, "startDate", event.target.value)
                                    }
                                />
                                {/* max={rate.endDate} */}
                            </div>

                            <span className="text-lg text-dark">-</span>

                            <div className="border rounded border-mediumGray px-2">
                                <Input
                                    variant="unstyled"
                                    type="date"
                                    id="end"
                                    name="date-end"
                                    value={getDate(rate.endDate)}
                                    className="max-w-[200px] text-lg text-dark"
                                    onChange={(event) =>
                                        handleCustomDateChange(index, "endDate", event.target.value)
                                    }
                                />
                                {/* min={customRate.startDate} */}
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
                                    onChange={(event) => handleCustomRateChange(index, event.target.value)}
                                />
                            </div>
                            <span className="">/ hr</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MeetingRoomRates;
