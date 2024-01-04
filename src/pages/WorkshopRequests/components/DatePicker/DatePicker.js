import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./util/calendar";
import cn from "./util/cn";

import { ReactComponent as ChevronRight } from "../../../../assets/ChevronRight.svg";
import { ReactComponent as ArrowIcon } from "../../../../assets/ArrowIcon.svg";
import { ReactComponent as CloseIcon } from "../../../../assets/CloseIcon.svg";

import { useRecoilState, useRecoilValue } from "recoil";
import {
    nurseryBookingsPayload,
    workshopAvailableSlots,
    workshopRequestPayload,
    workshopSelectedBranch,
    workspaceBookingsPayload,
} from "../../../../stores/workshopStore";

import { Switch, useToast } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { workshopBookingsPayload } from "../../../../stores/workshopStore";

import { useNavigate } from "react-router-dom";
import { GET_AVAILABLE_SLOTS } from "../../../../queries/workshopQueries";
import { useMutation } from "@apollo/client";
import client from "../../../../apollo";
import Bookings from "../Bookings";
import Loader from "../../../../components/Loader";

function formattedDate(selectedDate) {
    let date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function DatePicker() {
    // stores
    const [requestPayload, setWorkShopRequestPayload] = useRecoilState(workshopRequestPayload);
    const [workshopBookings, setWorkshopBookings] = useRecoilState(workshopBookingsPayload);

    const [availableSlots, setAvailableSlots] = useRecoilState(workshopAvailableSlots);

    const [workspaceBookings, setWorkspaceBookings] = useRecoilState(workspaceBookingsPayload);

    const selectedBranch = useRecoilValue(workshopSelectedBranch);

    const [selectedAvailableSlotsIndex, setSelectedAvailableSlotsIndex] = useState(0);

    const [slotsLoading, setSlotsLoading] = useState(false);

    // component
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const currentDate = dayjs();

    const [today, setToday] = useState(currentDate);
    const [startTime, setStartTime] = useState("01:30");
    const [endTime, setEndTime] = useState("02:30");
    const [numberOfDays, setNumberOfDays] = useState(1);
    const [showTimeSelector, setShowTimeSelector] = useState(false);
    const [selectedDate, setSelectedDate] = useState(currentDate);

    const toast = useToast();

    // console.log("avalabelslots", availableSlots);

    function handleSelectedDate(date, val) {
        console.log("handleSelectedDate", date);
        setSelectedDate(date);

        if (showTimeSelector) {
            setShowTimeSelector(!val);
        } else {
            setShowTimeSelector(true);
        }
    }

    function handleSelectTime() {
        let value = {
            date: formattedDate(selectedDate),
            startTime: startTime,
            endTime: endTime,
            nurseryBookings: [],
            workspaceBookings: [],
        };

        // console.log("handleSelectTime", value);

        setWorkshopBookings([...workshopBookings, value]);

        // setNurseryBookings([]);
        setWorkspaceBookings([]);
        setAvailableSlots([]);

        setShowTimeSelector(false);

        handleGetAvailableSlots();
        setSelectedAvailableSlotsIndex(workshopBookings.length);

        toast({
            title: "Time selected!",
            description: "Please select the seats now",
            status: "success",
        });
    }

    function returnDate(val) {
        console.log("returnDate", val);
        let date = new Date(val);
        console.log("date", date);

        date = date.toDateString().split(" ");
        return `${date[1]} ${date[2]}`;
    }

    function returnTime(val) {
        const [hourString, minute] = val.split(":");
        const hour = +hourString % 24;
        return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
    }

    function removeBooking(indexToRemove) {
        setWorkshopBookings([
            ...workshopBookings.slice(0, indexToRemove),
            ...workshopBookings.slice(indexToRemove + 1),
        ]);

        setAvailableSlots(availableSlots.filter((_, index) => index !== indexToRemove));
        setSelectedAvailableSlotsIndex(workshopBookings.length - 1);
    }

    async function handleGetAvailableSlots() {
        try {
            let date = formattedDate(selectedDate);
            let branchId = selectedBranch._id;

            if (!branchId) {
                toast({
                    title: "Select a location first!",

                    status: "error",
                });
                return;
            }

            let payload = { branchId, date, startTime, endTime };

            setSlotsLoading(true);

            client
                .query({
                    query: GET_AVAILABLE_SLOTS,
                    variables: payload,
                })
                .then((result) => {
                    if (!result.loading && !result.error) {
                        toast({
                            title: "Available Slots Loaded",

                            status: "success",
                        });
                        setAvailableSlots([
                            ...availableSlots,
                            result.data.getBranchWithWorkspacesAndNurseries,
                        ]);

                        setSlotsLoading(false);
                    }
                });
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: error.message,
                status: "error",
            });
            setSlotsLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-6 items-end">
                <div className="">
                    <span className="block mb-1.5 text-sm text-mediumGray">Number of Days</span>
                    <div className="border rounded-2xl border-light px-4">
                        <Input
                            min={0}
                            id="numberOfDays"
                            variant="unstyled"
                            type="number"
                            value={numberOfDays}
                            className="py-2 text-xl max-w-[125px]"
                            onChange={(event) => setNumberOfDays(event.target.value)}
                        />
                    </div>
                </div>
                <div className="h-[46px] items-center flex px-4 rounded-xl bg-primaryLight text-lg  leading-normal">
                    {workshopBookings.length} out of {numberOfDays} selected
                </div>
                <div className="flex gap-3 items-center mb-2.5">
                    <Switch
                        id="separate-booking"
                        size="lg"
                        checked={requestPayload.allowSeparateBooking}
                        onChange={(event) => {
                            setWorkShopRequestPayload({
                                ...requestPayload,
                                allowSeparateBooking: event.target.checked,
                            });
                        }}
                    />
                    <span className="block mt-1 text-base text-mediumGray leading-none">
                        Allow Separate Booking
                    </span>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-4 flex-wrap">
                    {workshopBookings.map((booking, index) => (
                        <button
                            key={index}
                            className={
                                selectedAvailableSlotsIndex === index
                                    ? "rounded-xl border border-dark text-dark bg-primaryLight items-center flex gap-3 py-3 px-4"
                                    : "rounded-xl border border-borderColor bg-primaryLight text-mediumGray items-center flex gap-3 py-3 px-4"
                            }
                            onClick={() => setSelectedAvailableSlotsIndex(index)}>
                            <CloseIcon
                                onClick={() => removeBooking(index)}
                                className=" border-2 rounded-full h-6 w-6 border-mediumGray"
                            />
                            <span className="text-lg  leading-normal">
                                {returnDate(booking.date)} {returnTime(booking.startTime)} -{" "}
                                {returnTime(booking.endTime)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-6">
                <div className="flex min-w-[330px] border rounded-2xl py-5 px-6  justify-center items-center flex-col">
                    <div className="month-and-date flex items-center  justify-between w-full">
                        <ChevronRight
                            className="w-5 active:bg-light rounded h-5 m-2 rotate-180 cursor-pointer hover:scale-105 "
                            onClick={() => {
                                setToday(today.month(today.month() - 1));
                            }}
                        />

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
                        {generateDate(today.month(), today.year()).map(
                            ({ date, currentMonth, today }, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="relative day text-center grid place-content-center text-sm">
                                        <h1
                                            className={cn(
                                                currentMonth ? "" : "text-light",
                                                today ? "b text-dark" : "",
                                                selectedDate.toDate().toDateString() ===
                                                    date.toDate().toDateString()
                                                    ? "bg-primary text-white"
                                                    : "",
                                                "grid h-10 w-10 font-normal rounded-full place-content-center text-sm  cursor-pointer select-none"
                                            )}
                                            onClick={() => {
                                                handleSelectedDate(
                                                    date,
                                                    selectedDate.toDate().toDateString() ===
                                                        date.toDate().toDateString()
                                                );
                                            }}>
                                            {date.date()}
                                        </h1>

                                        <div className="relative">
                                            {showTimeSelector &&
                                            selectedDate.toDate().toDateString() ===
                                                date.toDate().toDateString() ? (
                                                <div className="timeSelector p-1.5 w-max z-10 h-fit bottom-0 left-12 flex flex-col items-center absolute bg-white rounded-2xl border shadow-md">
                                                    <div className="start-time flex py-2 px-4 items-center justify-center gap-3 w-full">
                                                        <div className="border rounded-xl border-light grid place-content-center">
                                                            <Input
                                                                size="lg"
                                                                id="startTime"
                                                                variant="unstyled"
                                                                value={startTime}
                                                                style={{ fontSize: "40px" }}
                                                                className="
																						input text-mediumGray leading-[50px] mx-4 mt-1"
                                                                onChange={(event) =>
                                                                    setStartTime(event.target.value)
                                                                }
                                                                type="time"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <ArrowIcon />
                                                    </div>
                                                    <div className="end-time flex py-2 px-4 items-center justify-center gap-3 w-full">
                                                        <div className="border rounded-xl border-light grid place-content-center">
                                                            <Input
                                                                size="lg"
                                                                id="endTime"
                                                                variant="unstyled"
                                                                value={endTime}
                                                                style={{ fontSize: "40px" }}
                                                                className="
																						input text-mediumGray leading-[50px] mx-4 mt-1"
                                                                onChange={(event) =>
                                                                    setEndTime(event.target.value)
                                                                }
                                                                type="time"
                                                            />
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleSelectTime()}
                                                        className="mt-1 w-full rounded-xl border bg-primaryLight items-center flex gap-3 px-4 py-3">
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
                            }
                        )}
                    </div>
                </div>

                {availableSlots.length ? (
                    availableSlots.map((item, index) => {
                        return (
                            <Bookings
                                key={index}
                                loading={slotsLoading}
                                availableSlots={item}
                                index={index}
                                selectedAvailableSlotsIndex={selectedAvailableSlotsIndex}
                            />
                        );
                    })
                ) : slotsLoading ? (
                    <div className="flex flex-col items-center p-6 gap-4">
                        <div className=" text-mediumGray">Loading Available Slots</div>
                        <Loader />
                    </div>
                ) : (
                    <div className="p-6 text-mediumGray w-full h-[350px] flex justify-center items-center">
                        {" "}
                        Select date and time to view availability
                    </div>
                )}
            </div>
        </div>
    );
}

export default DatePicker;
