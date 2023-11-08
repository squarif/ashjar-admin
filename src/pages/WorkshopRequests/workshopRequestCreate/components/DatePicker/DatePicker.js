import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./util/calendar";
import cn from "./util/cn";

import { ReactComponent as ChevronRight } from "../../../../../assets/ChevronRight.svg";
import { ReactComponent as ArrowIcon } from "../../../../../assets/ArrowIcon.svg";
import { ReactComponent as CloseIcon } from "../../../../../assets/CloseIcon.svg";

import { useRecoilState, useRecoilValue } from "recoil";
import { workshopRequestPayload } from "../../../../../stores/workshopRequestPayload";

import { Switch } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

import { useEffect } from "react";

function DatePicker() {
    // stores
    const [requestPayload, setWorkShopRequestPayload] = useRecoilState(workshopRequestPayload);

    // component
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [startAMPM, setStartAMPM] = useState("AM");
    const [endAMPM, setEndAMPM] = useState("AM");
    const [numberOfDays, setNumberOfDays] = useState(1);

    const [showTimeSelector, setShowTimeSelector] = useState(true);

    const [selectDate, setSelectDate] = useState(currentDate);

    // const workshopRequestPayload2 = useRecoilValue(workshopRequestPayload);

    return (
        <div className="">
            <div className="flex flex-col gap-1">
                <div>allowSeparateBooking: {requestPayload.allowSeparateBooking} </div>
            </div>
            <div className="flex gap-6 items-center">
                <div className="border rounded-2xl border-light px-4">
                    <Input
                        id="numberOfDays"
                        variant="unstyled"
                        value={numberOfDays}
                        className="py-4 text-xl max-w-[125px]"
                        onChange={(event) => setNumberOfDays(event.target.value)}
                    />
                </div>

                <div className="flex gap-3">
                    <Switch
                        id="separate-booking"
                        size="lg"
                        checked={requestPayload.allowSeparateBooking}
                        onChange={(event) => {
                            setWorkShopRequestPayload({
                                ...requestPayload,
                                allowSeparateBooking: event.target.checked,
                            });
                            console.log("onChange requestPayload", requestPayload.allowSeparateBooking);
                        }}
                    />
                    <span className="text-base text-mediumGray">Allow Separate Booking</span>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <button className="rounded-xl border bg-primaryLight items-center flex gap-3 py-3 px-4">
                    <CloseIcon className="text-mediumGray border-2 rounded-full h-6 w-6 border-mediumGray" />
                    <span className="text-lg text-mediumGray leading-normal">Jan 6th 12:00PM - 12:30PM </span>
                </button>

                <div className="py-3 px-4 rounded-xl bg-primaryLight text-lg  leading-normal">
                    3 out of {numberOfDays} selected
                </div>
            </div>
            <div className="flex w-[328px] border rounded-2xl py-5 px-6  justify-center items-center flex-col">
                <div className="month-and-date flex items-center  justify-between w-full">
                    <ChevronRight
                        className="w-5 active:bg-light rounded h-5 m-2 rotate-180 cursor-pointer hover:scale-105 "
                        onClick={() => {
                            setToday(today.month(today.month() - 1));
                        }}
                    />
                    {/* <h1
                        className=" cursor-pointer hover:scale-105 transition-all"
                        onClick={() => {
                            setToday(currentDate);
                        }}>
                        Today
                    </h1> */}

                    <h1 className="select-none text-dark text-base font-semibold">
                        {months[today.month()]}, {today.year()}
                    </h1>

                    <ChevronRight
                        className="w-5 h-5 m-2 active:bg-light rounded cursor-pointer hover:scale-105"
                        onClick={() => {
                            setToday(today.month(today.month() + 1));
                        }}
                    />
                </div>

                <div className="weekdays grid grid-cols-7 ">
                    {days.map((day, index) => {
                        return (
                            <h1
                                key={index}
                                className="text-sm font-medium text-center h-10 w-10 grid place-content-center text-dark select-none">
                                {day}
                            </h1>
                        );
                    })}
                </div>

                <div className="days grid grid-cols-7 ">
                    {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => {
                        return (
                            <div
                                key={index}
                                className="relative day text-center grid place-content-center text-sm">
                                <h1
                                    className={cn(
                                        currentMonth ? "" : "text-light",
                                        today ? "b text-dark" : "",
                                        selectDate.toDate().toDateString() === date.toDate().toDateString()
                                            ? "bg-primary text-white"
                                            : "",
                                        "grid h-10 w-10 font-normal rounded-full place-content-center text-sm  cursor-pointer select-none"
                                    )}
                                    onClick={() => {
                                        setSelectDate(date);
                                    }}>
                                    {date.date()}
                                </h1>
                                <div className="relative">
                                    {selectDate.toDate().toDateString() === date.toDate().toDateString() ? (
                                        <div className="timeSelector p-1.5 w-max z-10 h-fit bottom-0 left-12 flex flex-col items-center absolute bg-white rounded-2xl border shadow-md">
                                            <div className="start-time flex py-2 px-4 items-center justify-center gap-3 w-full">
                                                <div className="">
                                                    <div className="border rounded-xl border-light">
                                                        <Input
                                                            id="seats"
                                                            variant="unstyled"
                                                            value=""
                                                            className="text-2xl max-w-[48px] py-1"
                                                            onChange={(event) =>
                                                                console.log(event.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <span className="text-2xl text-center font-normal">:</span>
                                                <div className="">
                                                    <div className="border rounded-xl border-light max-w-[48px] py-1">
                                                        <Input
                                                            id="seats"
                                                            variant="unstyled"
                                                            value=""
                                                            className="text-2xl  "
                                                            onChange={(event) =>
                                                                console.log(event.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="border rounded overflow-hidden h-full flex flex-col">
                                                    <label
                                                        className={
                                                            startAMPM === "AM" ? "bg-primary font-xs" : ""
                                                        }>
                                                        <input
                                                            type="radio"
                                                            value="AM"
                                                            className="absolute hidden "
                                                            checked={startAMPM === "AM"}
                                                            onChange={(event) =>
                                                                setStartAMPM(event.target.value)
                                                            }
                                                        />
                                                        <span className="text-xs text-[#666666] px-2 font-medium">
                                                            AM
                                                        </span>
                                                    </label>
                                                    <label className={startAMPM === "PM" ? "bg-primary" : ""}>
                                                        <input
                                                            className="absolute hidden "
                                                            type="radio"
                                                            value="PM"
                                                            checked={startAMPM === "PM"}
                                                            onChange={(event) =>
                                                                setStartAMPM(event.target.value)
                                                            }
                                                        />
                                                        <span className="text-xs text-[#666666] font-medium">
                                                            PM
                                                        </span>
                                                    </label>

                                                    <div className=""></div>
                                                </div>
                                            </div>
                                            <div className="">
                                                <ArrowIcon />
                                            </div>
                                            <div className="end-time flex py-2 px-4 items-center justify-center gap-3 w-full">
                                                <div className="">
                                                    <div className="border rounded-xl border-light">
                                                        <Input
                                                            id="seats"
                                                            variant="unstyled"
                                                            value=""
                                                            className="text-2xl max-w-[48px] py-1"
                                                            onChange={(event) =>
                                                                console.log(event.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <span className="text-2xl text-center font-normal">:</span>
                                                <div className="">
                                                    <div className="border rounded-xl border-light max-w-[48px] py-1">
                                                        <Input
                                                            id="seats"
                                                            variant="unstyled"
                                                            value=""
                                                            className="text-2xl  "
                                                            onChange={(event) =>
                                                                console.log(event.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="border rounded overflow-hidden h-full flex flex-col">
                                                    <label
                                                        className={
                                                            endAMPM === "AM" ? "bg-primary font-xs" : ""
                                                        }>
                                                        <input
                                                            type="radio"
                                                            value="AM"
                                                            className="absolute hidden "
                                                            checked={endAMPM === "AM"}
                                                            onChange={(event) =>
                                                                setEndAMPM(event.target.value)
                                                            }
                                                        />
                                                        <span className="text-xs text-[#666666] px-2 font-medium">
                                                            AM
                                                        </span>
                                                    </label>
                                                    <label className={endAMPM === "PM" ? "bg-primary" : ""}>
                                                        <input
                                                            className="absolute hidden "
                                                            type="radio"
                                                            value="PM"
                                                            checked={endAMPM === "PM"}
                                                            onChange={(event) =>
                                                                setEndAMPM(event.target.value)
                                                            }
                                                        />
                                                        <span className="text-xs text-[#666666] font-medium">
                                                            PM
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            <button className="mt-1 w-full rounded-xl border bg-primaryLight items-center flex gap-3 px-4 py-3">
                                                <span className="w-full text-lg text-dark leading-normal">
                                                    Select time
                                                </span>
                                            </button>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default DatePicker;
