import { Input } from "@chakra-ui/react";

import { ReactComponent as PlusIcon } from "../assets/PlusIcon.svg";

import { useRecoilState } from "recoil";

import { useState } from "react";

function OpenDays(props) {
    const [openDays, setOpenDays] = useRecoilState(props.state);

    const [startAMPM, setStartAMPM] = useState("AM");
    const [endAMPM, setEndAMPM] = useState("AM");

    function handleNewDay() {
        let newDay = {
            day: "",
            startTime: "00:00",
            endTime: "00:00",
        };

        setOpenDays([...openDays, newDay]);
    }

    function handleDayChange(dayIndex, value) {
        const updatedOpenDays = JSON.parse(JSON.stringify(openDays));
        updatedOpenDays[dayIndex].day = value;
        setOpenDays(updatedOpenDays);
    }

    const handleTimeChange = (dayIndex, field, value) => {
        const updatedOpenDays = JSON.parse(JSON.stringify(openDays));
        updatedOpenDays[dayIndex][field] = value;
        setOpenDays(updatedOpenDays);
    };

    const handleAMPMChange = (dayIndex, field, value) => {
        const updatedOpenDays = JSON.parse(JSON.stringify(openDays));

        updatedOpenDays[dayIndex][field] = value;
        setOpenDays(updatedOpenDays);
    };

    function getAMPM(time) {
        if (time.substring(0, 2) >= 12) {
            return "PM";
        } else {
            return "AM";
        }
    }

    return (
        <div className="timings border rounded-2xl border-light px-8 py-12 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div className="text-left text-2xl">Opening Timings</div>
                <button
                    onClick={() => handleNewDay()}
                    className="rounded-lg border border-borderColor px-3 py-2 bg-primaryLight flex gap-2.5 items-center">
                    <span className="text-lg leading-normal">Add Custom Dates</span>
                    <PlusIcon className="h-4 w-4 text-dark fill-dark " />
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {openDays.map((day, index) => (
                    <div key={index} className="flex gap-4 justify-between items-center h-9">
                        <div className="grid place-content-center">
                            <Input
                                id="day"
                                variant="unstyled"
                                value={day.day}
                                style={{ fontSize: "20px" }}
                                className="text-xl 
																						input text-mediumGray leading-[18px] h-8  mx-2 my-2 "
                                onChange={(event) => handleDayChange(index, event.target.value)}
                                type="day"
                            />
                        </div>
                        <div className="timeSelector flex items-center w-fit gap-9">
                            <div className="start-time flex py-2 px-4 items-center justify-center gap-3 w-full">
                                <div className="border rounded border-mediumGray grid place-content-center">
                                    <Input
                                        id="starthour"
                                        variant="unstyled"
                                        value={day.startTime}
                                        style={{ fontSize: "20px" }}
                                        className="
																						input text-mediumGray leading-[18px] my-2 mx-2 "
                                        onChange={(event) =>
                                            handleTimeChange(index, "startTime", event.target.value)
                                        }
                                        type="time"
                                    />
                                </div>

                                <div className="border rounded h-full w-fit flex">
                                    <label
                                        className={
                                            getAMPM(day.startTime) === "AM"
                                                ? "bg-primary font-xs rounded-l"
                                                : ""
                                        }>
                                        <input
                                            type="radio"
                                            value="AM"
                                            className="absolute hidden"
                                            checked={getAMPM(day.startTime) === "AM"}
                                            onChange={(event) =>
                                                handleAMPMChange(index, day.startTime, event.target.value)
                                            }
                                        />
                                        <span className="block text-lg text-[#666666] px-2 py-1 font-medium">
                                            AM
                                        </span>
                                    </label>
                                    <label
                                        className={
                                            getAMPM(day.startTime) === "PM" ? "bg-primary rounded-r" : ""
                                        }>
                                        <input
                                            className="absolute hidden"
                                            type="radio"
                                            value="PM"
                                            checked={getAMPM(day.startTime) === "PM"}
                                            onChange={(event) => setStartAMPM(event.target.value)}
                                        />
                                        <span className="block text-lg text-[#666666] px-2 py-1 font-medium">
                                            PM
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <span className="text-base text-center font-normal">to</span>

                            <div className="end-time flex py-2 px-4 items-center justify-center gap-3 w-full">
                                <div className="border rounded border-mediumGray grid place-content-center">
                                    <Input
                                        id="endhour"
                                        variant="unstyled"
                                        value={day.endTime}
                                        style={{ fontSize: "20px" }}
                                        className="input 
																						text-mediumGray leading-[18px] my-2 mx-2"
                                        onChange={(event) =>
                                            handleTimeChange(index, "endTime", event.target.value)
                                        }
                                        type="time"
                                    />
                                </div>

                                <div className="border rounded h-full w-fit flex">
                                    <label
                                        className={
                                            getAMPM(day.endTime) === "AM"
                                                ? "bg-primary font-xs rounded-l"
                                                : ""
                                        }>
                                        <input
                                            type="radio"
                                            value="AM"
                                            className="absolute hidden"
                                            checked={getAMPM(day.startTime) === "AM"}
                                            onChange={(event) => setEndAMPM(event.target.value)}
                                        />
                                        <span className="block text-lg text-[#666666] px-2 py-1 font-medium">
                                            AM
                                        </span>
                                    </label>
                                    <label
                                        className={
                                            getAMPM(day.endTime) === "PM" ? "bg-primary rounded-r" : ""
                                        }>
                                        <input
                                            className="absolute hidden"
                                            type="radio"
                                            value="PM"
                                            checked={getAMPM(day.startTime) === "PM"}
                                            onChange={(event) => setEndAMPM(event.target.value)}
                                        />
                                        <span className="block text-lg text-[#666666] px-2 py-1 font-medium">
                                            PM
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OpenDays;
