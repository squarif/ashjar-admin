import { Input } from "@chakra-ui/react";

import { ReactComponent as PlusIcon } from "../../../../assets/PlusIcon.svg";

import { useRecoilState, useRecoilValue } from "recoil";
import { workshopRequestPayload } from "../../../../stores/workshopRequestPayload";

import { useState } from "react";
import { newWorkspaceRequest, workspaceRatesState } from "../../../../stores/workspaceStore";

function MeetingRoomRates() {
    // const [requestPayload, setWorkShopRequestPayload] = useRecoilState(workshopRequestPayload);

    const [requestPayload, setNewMeetingRoomPayload] = useRecoilState(newWorkspaceRequest);

    const [rates, setRates] = useRecoilState(workspaceRatesState);

    function handleNewRate() {
        let newRate = {
            dateStart: "Dec 19 2023",
            dateEnd: "Dec 23 2023",
            rate: "69",
        };

        let updatedRates = [...rates, newRate];

        console.log("updatedRates", updatedRates);

        setRates(updatedRates, () => {
            console.log("updatedRates state", rates);
        });
    }

    function handleCustomRateChange(index, value) {
        let updatedRates = [...rates];

        updatedRates[index] = { ...updatedRates[index], rate: value };

        setRates(updatedRates);
    }

    function handleBaseRateChange(value) {
        let updatedRequest = { ...requestPayload };

        updatedRequest.ratesPerHour = value;

        setNewMeetingRoomPayload(updatedRequest);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div className="text-left text-2xl">Rates</div>
                <button
                    className="rounded-lg border border-borderColor px-6 py-4 bg-primaryLight flex items-center"
                    onClick={() => handleNewRate()}>
                    <span className="text-lg leading-normal">Add Custom Dates</span>
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
                        <span className="base-rate text-lg text-mediumGray">
                            {rate.dateStart} - {rate.dateEnd}
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
