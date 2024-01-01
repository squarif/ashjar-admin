import { Input } from "@chakra-ui/react";

import { ReactComponent as PlusIcon } from "../assets/PlusIcon.svg";
import { ReactComponent as ChevronRight } from "../assets/ChevronRight.svg";

import { useRecoilState } from "recoil";

import { useState } from "react";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { getDate } from "../util/helpers";

function OpenDaysList(props) {
    const [openDays, setOpenDays] = useRecoilState(props.state);
    const [days, setDays] = useState([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]);

    const [startAMPM, setStartAMPM] = useState("AM");
    const [endAMPM, setEndAMPM] = useState("AM");

    function handleDeleteDay(index) {
        const updatedOpenDays = JSON.parse(JSON.stringify(openDays));
        updatedOpenDays.splice(index, 1);

        setOpenDays(updatedOpenDays);
    }

    function handleDayChange(dayIndex, value) {
        const updatedOpenDays = JSON.parse(JSON.stringify(openDays));

        // console.log("updatedOpenDays", updatedOpenDays, dayIndex, value);
        updatedOpenDays[dayIndex].day = value;
        setOpenDays(updatedOpenDays);

        setDays(days.filter((day) => day !== value));
    }

    function handleTimeChange(dayIndex, field, value) {
        const updatedOpenDays = JSON.parse(JSON.stringify(openDays));
        updatedOpenDays[dayIndex][field] = value;
        setOpenDays(updatedOpenDays);
    }

    function handleAMPMChange(dayIndex, field, value) {
        const updatedOpenDays = JSON.parse(JSON.stringify(openDays));

        updatedOpenDays[dayIndex][field] = value;
        setOpenDays(updatedOpenDays);
    }

    function getAMPM(time) {
        if (time.substring(0, 2) >= 12) {
            return "PM";
        } else {
            return "AM";
        }
    }

    return openDays.map((day, index) => (
        <div key={index} className="flex gap-4 justify-between items-center h-9">
            {/* <div className="grid place-content-center">
						<Input
								id="day"
								variant="unstyled"
								value={day.day}
								placeholder="Enter Day"
								style={{ fontSize: "20px", paddingLeft: "8px" }}
								className={
										day.day
												? `text-xl 
														input text-mediumGray leading-[18px] h-8 mx-2 my-2`
												: `text-xl 
														input text-mediumGray leading-[18px] h-8 p-2 border border-borderColor`
								}
								onChange={(event) => handleDayChange(index, event.target.value)}
						/>
				</div> */}

            <Menu autoSelect={false} closeOnBlur>
                <MenuButton as="button" className="h-fit rounded-xl  ">
                    <div className="flex px-4 w-[312px] py-3 items-center justify-between">
                        {day.day ? (
                            <span className="text-dark">{day.day}</span>
                        ) : (
                            <span className="text-dark">Select a Day</span>
                        )}

                        <ChevronRight className="rotate-90 h-5 text-dark " />
                    </div>
                </MenuButton>
                <MenuList className="MenuList inset-0 w-[312px] left-[-200px]">
                    {days.map((day, dayIndex) => {
                        return (
                            <MenuItem key={dayIndex} onClick={() => handleDayChange(index, day)}>
                                {day}
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Menu>

            <div className="flex items-center">
                <div className="timeSelector flex items-center w-fit">
                    <div className="start-time flex py-2 px-4 items-center justify-center gap-3 w-full">
                        <div className="border rounded border-mediumGray grid place-content-center">
                            <Input
                                id="starthour"
                                variant="unstyled"
                                value={day.startTime}
                                style={{ fontSize: "20px" }}
                                className="
														input text-mediumGray leading-[18px] my-2 mx-2 "
                                onChange={(event) => handleTimeChange(index, "startTime", event.target.value)}
                                type="time"
                            />
                        </div>

                        <div className="border rounded h-full w-fit flex">
                            <label
                                className={
                                    getAMPM(day.startTime) === "AM" ? "bg-primary font-xs rounded-l" : ""
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
                                <span className="block text-lg text-[#666666] px-2 py-1 font-medium">AM</span>
                            </label>
                            <label className={getAMPM(day.startTime) === "PM" ? "bg-primary rounded-r" : ""}>
                                <input
                                    className="absolute hidden"
                                    type="radio"
                                    value="PM"
                                    checked={getAMPM(day.startTime) === "PM"}
                                    onChange={(event) => setStartAMPM(event.target.value)}
                                />
                                <span className="block text-lg text-[#666666] px-2 py-1 font-medium">PM</span>
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
                                onChange={(event) => handleTimeChange(index, "endTime", event.target.value)}
                                type="time"
                            />
                        </div>

                        <div className="border rounded h-full w-fit flex">
                            <label
                                className={
                                    getAMPM(day.endTime) === "AM" ? "bg-primary font-xs rounded-l" : ""
                                }>
                                <input
                                    type="radio"
                                    value="AM"
                                    className="absolute hidden"
                                    checked={getAMPM(day.startTime) === "AM"}
                                    onChange={(event) => setEndAMPM(event.target.value)}
                                />
                                <span className="block text-lg text-[#666666] px-2 py-1 font-medium">AM</span>
                            </label>
                            <label className={getAMPM(day.endTime) === "PM" ? "bg-primary rounded-r" : ""}>
                                <input
                                    className="absolute hidden"
                                    type="radio"
                                    value="PM"
                                    checked={getAMPM(day.startTime) === "PM"}
                                    onChange={(event) => setEndAMPM(event.target.value)}
                                />
                                <span className="block text-lg text-[#666666] px-2 py-1 font-medium">PM</span>
                            </label>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => handleDeleteDay(index)}
                    className="hover:bg-errorLight h-fit p-2 rounded-lg">
                    <PlusIcon className="rotate-45 text-error" />
                </button>
            </div>
        </div>
    ));
}

function CustomOpenHoursList(props) {
    // console.log("CustomOpenHoursList", props);
    const [customOpenHours, setCustomOpenHours] = useRecoilState(props.state);
    const [startAMPM, setStartAMPM] = useState("AM");
    const [endAMPM, setEndAMPM] = useState("AM");

    // custom open hours

    function handleDeleteCustomDate(index) {
        const updatedCustomOpenHours = JSON.parse(JSON.stringify(customOpenHours));
        updatedCustomOpenHours.splice(index, 1);

        setCustomOpenHours(customOpenHours);
    }

    function handleCustomDateChange(customDateIndex, field, value) {
        const updatedCustomDate = JSON.parse(JSON.stringify(customOpenHours));
        updatedCustomDate[customDateIndex][field] = value;

        setCustomOpenHours(updatedCustomDate);
    }

    function handleCustomOpenHoursTimeChange(dayIndex, field, value) {
        const updatedCustomDate = JSON.parse(JSON.stringify(customOpenHours));
        updatedCustomDate[dayIndex][field] = value;
        setCustomOpenHours(updatedCustomDate);
    }

    function getAMPM(time) {
        if (time.substring(0, 2) >= 12) {
            return "PM";
        } else {
            return "AM";
        }
    }

    function handleAMPMChange(dayIndex, field, value) {
        const updatedOpenDays = JSON.parse(JSON.stringify(customOpenHours));

        updatedOpenDays[dayIndex][field] = value;
        setCustomOpenHours(updatedOpenDays);
    }

    return customOpenHours.map((day, index) => (
        <div key={`customOpenHours` + index} className="flex gap-4 justify-between items-center h-9">
            <div className="custom-date flex gap-2 items-baseline justify-between w-fit">
                <div className="border rounded border-mediumGray px-2 py-1">
                    <Input
                        variant="unstyled"
                        type="date"
                        id="open-hours-start-date"
                        name="date-start"
                        value={getDate(day.startDate)}
                        className="max-w-[200px] text-lg text-dark"
                        onChange={(event) => handleCustomDateChange(index, "startDate", event.target.value)}
                    />
                    {/* max={customRate.endDate} */}
                </div>

                <span className="text-lg text-dark">-</span>

                <div className="border rounded border-mediumGray px-2 py-1">
                    <Input
                        variant="unstyled"
                        type="date"
                        id="open-hours-end-date"
                        name="date-end"
                        value={getDate(day.endDate)}
                        className="max-w-[200px] text-lg text-dark"
                        onChange={(event) => handleCustomDateChange(index, "endDate", event.target.value)}
                    />
                    {/* min={customRate.startDate} */}
                </div>
            </div>

            <div className="flex items-center">
                <div className="timeSelector flex items-center w-fit">
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
                                    handleCustomOpenHoursTimeChange(index, "startTime", event.target.value)
                                }
                                type="time"
                            />
                        </div>

                        <div className="border rounded h-full w-fit flex">
                            <label
                                className={
                                    getAMPM(day.startTime) === "AM" ? "bg-primary font-xs rounded-l" : ""
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
                                <span className="block text-lg text-[#666666] px-2 py-1 font-medium">AM</span>
                            </label>
                            <label className={getAMPM(day.startTime) === "PM" ? "bg-primary rounded-r" : ""}>
                                <input
                                    className="absolute hidden"
                                    type="radio"
                                    value="PM"
                                    checked={getAMPM(day.startTime) === "PM"}
                                    onChange={(event) => setStartAMPM(event.target.value)}
                                />
                                <span className="block text-lg text-[#666666] px-2 py-1 font-medium">PM</span>
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
                                    handleCustomOpenHoursTimeChange(index, "endTime", event.target.value)
                                }
                                type="time"
                            />
                        </div>

                        <div className="border rounded h-full w-fit flex">
                            <label
                                className={
                                    getAMPM(day.endTime) === "AM" ? "bg-primary font-xs rounded-l" : ""
                                }>
                                <input
                                    type="radio"
                                    value="AM"
                                    className="absolute hidden"
                                    checked={getAMPM(day.startTime) === "AM"}
                                    onChange={(event) => setEndAMPM(event.target.value)}
                                />
                                <span className="block text-lg text-[#666666] px-2 py-1 font-medium">AM</span>
                            </label>
                            <label className={getAMPM(day.endTime) === "PM" ? "bg-primary rounded-r" : ""}>
                                <input
                                    className="absolute hidden"
                                    type="radio"
                                    value="PM"
                                    checked={getAMPM(day.startTime) === "PM"}
                                    onChange={(event) => setEndAMPM(event.target.value)}
                                />
                                <span className="block text-lg text-[#666666] px-2 py-1 font-medium">PM</span>
                            </label>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => handleDeleteCustomDate(index)}
                    className="hover:bg-errorLight h-fit p-2 rounded-lg">
                    <PlusIcon className="rotate-45 text-error" />
                </button>
            </div>
        </div>
    ));
}

function OpenDays(props) {
    const [openDays, setOpenDays] = useRecoilState(props.openDaysState);
    const [customOpenHours, setCustomOpenHours] = useRecoilState(props.customOpenHoursState);

    function handleNewDay() {
        let newDay = {
            day: "",
            startTime: "09:00",
            endTime: "20:00",
        };

        setOpenDays([...openDays, newDay]);
    }

    function handleNewCustomDate() {
        let newDay = {
            startTime: "09:00",
            endTime: "20:00",
            startDate: "2024-01-01",
            endDate: "2024-01-01",
        };

        setCustomOpenHours([...customOpenHours, newDay]);
    }

    return (
        <div className="timings border rounded-2xl border-light px-8 py-12 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div className="text-left text-2xl">Opening Timings</div>

                <div className="flex gap-4">
                    <button
                        onClick={() => handleNewCustomDate()}
                        className="rounded-lg border border-borderColor px-3 py-2 bg-primaryLight flex gap-2.5 items-center">
                        <span className="text-lg leading-normal">Add Custom Date</span>
                        <PlusIcon className="h-4 w-4 text-dark fill-dark " />
                    </button>
                    <button
                        onClick={() => handleNewDay()}
                        className="rounded-lg border border-borderColor px-3 py-2 bg-primaryLight flex gap-2.5 items-center">
                        <span className="text-lg leading-normal">Add Day</span>
                        <PlusIcon className="h-4 w-4 text-dark fill-dark " />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <OpenDaysList state={props.openDaysState} />
                <CustomOpenHoursList state={props.customOpenHoursState} />
            </div>
        </div>
    );
}

export default OpenDays;
