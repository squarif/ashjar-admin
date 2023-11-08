import { Input } from "@chakra-ui/react";

import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { ReactComponent as EqualIcon } from "../../../assets/EqualIcon.svg";
import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";

import { Textarea } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";

import Amenities from "./components/Amenities";
import { useState } from "react";
import MeetingRoomRates from "./components/Rates";
import {
    meetingRoomAmenitiesState,
    newMeetingRoomRequest,
    meetingRoomOpenDaysState,
    meetingRoomRatesState,
} from "../../../stores/meetingRoomStore";

import { CREATE_MEETING_ROOM } from "../../../queries/meetingRoomQueries";
import { useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";

function MeetingRoomNew() {
    const [newMeetingRoomRequestPayload, setNewMeetingRoomPayload] = useRecoilState(newMeetingRoomRequest);
    const [openDays, setOpenDays] = useRecoilState(meetingRoomOpenDaysState);
    const rates = useRecoilValue(meetingRoomRatesState);
    const amenities = useRecoilValue(meetingRoomAmenitiesState);

    const [startAMPM, setStartAMPM] = useState("AM");
    const [endAMPM, setEndAMPM] = useState("AM");

    let { state } = useLocation();

    console.log("branch id", state);

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

    const inputStyle = {
        /* Hide the time input's clock icon */
        WebkitAppearance: "none",
    };

    function getAMPM(time) {
        if (time.substring(0, 2) > 12) {
            return "PM";
        } else {
            return "AM";
        }
    }

    const [createMeetingRoom] = useMutation(CREATE_MEETING_ROOM);
    async function handleAddMeetingRoom() {
        let payload = {
            ...newMeetingRoomRequestPayload,
            customRates: rates,
            openDays: openDays,
            amenities: amenities,
            branch: state.branch_id,
        };

        console.log("payload", payload);
        try {
            // console.log("CREATE_BRANCH", CREATE_BRANCH);
            const { data } = await createMeetingRoom({
                mutation: CREATE_MEETING_ROOM,
                variables: {
                    input: payload,
                },
                // client: client,
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="new-meeting-room">
            <Breadcrumbs />
            <div className="flex flex-col gap-8">
                <div className="title border rounded-2xl border-light px-8 py-12 flex flex-col gap-8">
                    <div className="title mb-6 rounded-xl border overflow-hidden px-4">
                        <Input
                            variant="unstyled"
                            value={newMeetingRoomRequestPayload.name}
                            placeholder="Enter Meeting Room Name"
                            className="py-4"
                            onChange={(event) =>
                                setNewMeetingRoomPayload({
                                    ...newMeetingRoomRequestPayload,
                                    name: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="cost flex gap-12 items-center">
                        <div className="border rounded-2xl border-light px-4">
                            <Input
                                id="cost"
                                variant="unstyled"
                                type="number"
                                value={newMeetingRoomRequestPayload.totalSeats}
                                className="py-4 max-w-[143px]"
                                onChange={(event) =>
                                    setNewMeetingRoomPayload({
                                        ...newMeetingRoomRequestPayload,
                                        totalSeats: parseInt(event.target.value),
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="description flex gap-7 flex-col border rounded-2xl border-light px-8 py-12">
                    <div className="text-left text-2xl">Description</div>
                    <div className="border rounded-2xl bordr-light px-8 py-12">
                        <Textarea
                            value={newMeetingRoomRequestPayload.description}
                            onChange={(event) =>
                                setNewMeetingRoomPayload({
                                    ...newMeetingRoomRequestPayload,
                                    description: event.target.value,
                                })
                            }
                            placeholder="Here is a sample placeholder"
                            size="sm"
                        />
                    </div>
                </div>

                <div className="timings border rounded-2xl border-light px-8 py-12 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <div className="text-left text-2xl">Opening Timings</div>
                        <button className="rounded-lg border border-borderColor px-3 py-2 bg-primaryLight flex gap-2.5 items-center">
                            <span className="text-lg leading-normal">Add Custom Dates</span>
                            <PlusIcon className="h-4 w-4 text-dark fill-dark " />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        {openDays.map((day, index) => (
                            <div key={index} className="flex gap-4 justify-between items-center h-9">
                                <span className="text-xl leading-normal text-mediumGray">{day.day}</span>

                                <div className="timeSelector flex items-center w-fit gap-9">
                                    <div className="start-time flex py-2 px-4 items-center justify-center gap-3 w-full">
                                        <div className="border rounded border-mediumGray grid place-content-center">
                                            <Input
                                                id="starthour"
                                                variant="unstyled"
                                                value={day.startTime}
                                                className="text-xs 
																						input text-mediumGray leading-[18px] h-5  mx-1 my-0.5 "
                                                onChange={(event) =>
                                                    handleTimeChange(index, "startTime", event.target.value)
                                                }
                                                type="time"
                                            />
                                        </div>

                                        {/* <span className="text-xs text-center font-normal">:</span>

                                    <div className="border rounded border-mediumGray grid place-content-center">
                                        <Input
                                            id="starthour"
                                            variant="unstyled"
                                            value={getMinutes(day.startTime)}
                                            className="text-xs text-mediumGray leading-[12px] h-5 max-w-[20px] mx-1 my-0.5"
                                            onChange={(event) => console.log(event.target.value)}
                                            maxLength={2}
                                        />
                                    </div> */}

                                        <div className="border rounded h-full w-[70px] flex">
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
                                                        handleAMPMChange(
                                                            index,
                                                            day.startTime,
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                                <span className="block text-xs text-[#666666] px-2 py-1 font-medium">
                                                    AM
                                                </span>
                                            </label>
                                            <label
                                                className={
                                                    getAMPM(day.startTime) === "PM"
                                                        ? "bg-primary rounded-r"
                                                        : ""
                                                }>
                                                <input
                                                    className="absolute hidden"
                                                    type="radio"
                                                    value="PM"
                                                    checked={getAMPM(day.startTime) === "PM"}
                                                    onChange={(event) => setStartAMPM(event.target.value)}
                                                />
                                                <span className="block text-xs text-[#666666] px-2 py-1 font-medium">
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
                                                className="text-xs 
																						input
																						text-mediumGray leading-[18px] h-5 mx-1  my-0.5"
                                                onChange={(event) =>
                                                    handleTimeChange(index, "endTime", event.target.value)
                                                }
                                                type="time"
                                                style={inputStyle}
                                            />
                                        </div>

                                        {/* <span className="text-xs text-center font-normal">:</span>

                                    <div className="border rounded border-mediumGray grid place-content-center">
                                        <Input
                                            id="endminute"
                                            variant="unstyled"
                                            value={getMinutes(day.endTime)}
                                            className="text-xs text-mediumGray leading-[12px] h-5 max-w-[20px] mx-1 my-0.5"
                                            onChange={(event) => console.log(event.target.value)}
                                        />
                                    </div> */}

                                        <div className="border rounded h-full w-[70px] flex">
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
                                                <span className="block text-xs text-[#666666] px-2 py-1 font-medium">
                                                    AM
                                                </span>
                                            </label>
                                            <label
                                                className={
                                                    getAMPM(day.endTime) === "PM"
                                                        ? "bg-primary rounded-r"
                                                        : ""
                                                }>
                                                <input
                                                    className="absolute hidden"
                                                    type="radio"
                                                    value="PM"
                                                    checked={getAMPM(day.startTime) === "PM"}
                                                    onChange={(event) => setEndAMPM(event.target.value)}
                                                />
                                                <span className="block text-xs text-[#666666] px-2 py-1 font-medium">
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

                <div className="rates border rounded-2xl border-light px-8 py-12 ">
                    <MeetingRoomRates />
                </div>
                <div className="amenities border rounded-2xl border-light px-8 py-12 ">
                    <Amenities />
                </div>

                <div className="pictures border rounded-2xl border-light px-8 py-12 flex gap-7 flex-col ">
                    <div className="text-left text-2xl">Pictures</div>
                    <div className="grid grid-cols-5 grid-rows-2 gap-6">
                        <div className="overflow-hidden rounded-2xl border col-span-3 row-span-2">
                            <img
                                alt=""
                                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgWFRYYGRgZHBocHRwcHBwhHBwYGhoaGhoeGh4cIS4lHB4rIRgaJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHhISHjYrISs0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgMEAAIHAQj/xABHEAACAQIEAwUFBAYHCAIDAAABAhEAAwQSITEFQVEGImFxkRMygaGxFELB0SNSYnKC8DNTkqLC4fEHFSRUg5Oy0jRjFkSz/8QAGAEBAQEBAQAAAAAAAAAAAAAAAQACAwT/xAAlEQACAgICAgIBBQAAAAAAAAAAAQIREjEDIUFRInEyBBNhgfD/2gAMAwEAAhEDEQA/AOg9jf6Nx+3/AIR+VMdLfY8924P2l+h/KmSpCaugIggEeImqV3g9ht7SfBQD6iKv17VSZXQBxHZ2zDFC6GD7rGNuczNU+BYO+bCPbv5QZ7rKGUQxEAnXlTPc2PkaE9lD/wAMngXH99qxirNW6PRcxi7racfskqfnpWw4qw9/D3F8VAYeootWU0/Zm16BtvjVhjGfKejAj6iK5/23Kl3ZSGGZDI1H3eldOuWg2jAEeIB+tc57bYYKXCDKO7oNBqROlc+S6X2dOOu/oKcKgoDRi0w5UC4LbbKBOmlHUTKCK9EdHF7MBBFUyCQZ0q5aXXy+ZqJ0MsY6elJFd+GO5DLAEc5166c6ixvCkRkd7qooMuDIzACAFIaRr5ztFFrrH7O5UkEI0EbgiaQ71h21Zix3kkk/OiiGJ+0NhHS3aQnO6pIGVRmIE66nfpVfjOFBxOfk1u36zcH5UDxNkLetGPde2fR13pq4vZ/SoYmEEeYY6/OpkDrOGIb3ZBEAeI3ml3gNv9APBm+TGm+dtwNdt9t6WOz1om225h3AHk7TpzrLRFptRoP5NRlDHU7UZt8LuPqEK+LaD0Ovyq3h+z36777hR+J/KihFP2ZVpJGoPwjmPWpQAyxvvTM5wNohHdCzEKFZszEsYAyieZ6V72gtgoiplkMe6I0EdBVVEKuIyoJYgDbUxrS9xTj1tDy8JkeijvH0HnRDjPDczlnxCWkgDKpGc9ZPvAeCkUJAwFkH2aNcfWC2gJ8Sdd+cGsOR2jxqrbAWL4jduZnGYIe7BXLIAmVAOm511PjVJsRmCrlgg95s3ebeZ6naN4y+dE+K8QS6xhMkr7oJmAvUabnWImANaEWUDP3pTNBDRMaET13gfGpHKVX0Vnts7sSdSSWPUnc+EnWi2ANm0hVi7y2YgaCYiDtIqGzZJXkNJ2jbT8KgxOCnUHvdOv8AnVd9ClSCd3joBlLaAjYnUgfDaqF/i15/vkeWn01obnK6EV6MSTsKcRyJvaMeZ9TXlR+1bwrKaC0fSnZA/wBIP3P8VMtJfAsW9svktNckCQDqImORnejB7QR72Hvr/B+cVZJdMqb0HKygq9psP94uv7yn8Jqzb45h22ur8ZH1AqyXsKYRNBuyv9BHR7g/vGiVvGW2910byZT9DQ7s17lwdL1z8D+NT2i8BqsrKytAeUg9ul1f91T/AD6U/Uk9uV9/xt/TNXLl0dOPZPwFQbannAoqy6aihPZ7+iSNdBRi420c67R0c3shK7Hx5VjnUA8/wqZlgeVQi3BzE69enlWgJ8Ms2nX98ev+tLDWoUzA6n501cOUZWB/WPzAqP8AQW9gJ8NW9aiEheH3bj50R27wgxAjfc6U28YQZkY8lb6r+dTtxKQci/Enn5D86HtiHuCXAkSBpA13+lRFRL4Z1VTJOswYHptW/ZZwmGuOFBK3MSemYrdfnFZYgFdBzGkbHSvOAr/wmIH/ANmL0/6lwxQiKGM7T39lCW9Y2k7jm/h+zQJ+Iuzt7d3uCO6hcqpMjcAAR8PhWuKtuxkQoLdN/LrUN+yQwIPXWVB3B5n6UMjRuMOrBbWHtpJAlVzNJ2Gb/KtOM28VH6Q3FnSDKj00FbHDZbmaZyuh+8dM0HUiBzroXae3KJpPf2/hasOBtSOOPhf1mrRbSDaT8/pXQcRw22w7yJ4ZQJoW/B0MgCB41jEchQdABroraAR1323GgqtiES0zmFdhGaRoocECNdSND8OlOCcIUDL94EtCzG0KD4ARp1objMAoco7BndO7KiQxcEe6vuwhGs7mpKkYYq3bbMoZFbWEVT7w01Z4OgOulWsFhYUjLlgkGZBLdY6UXv8AD7WZ84chYBILblMugH6omOdW3woAjcAQPICtEhaxfDs/g3I/nQy1w9g5RtCsEjz2pySz31nckfUUJxFphinVt4ST8K0XkH/YhWUd9nXlQnYeyh77j9kfX/OmmlTsqf0rD9g/+S0z2roacpBgwY5EbjzpRG5UHfWoHwFo720Pmq/lVmsqoga/BbB3tL8JH0oRwjhNtmvDvDJcZVysRCgAjz33pooNwT+lxI/+wH1WsOKtGk3TJv8AdBHu374/iBHoRXowV8bYgn95FPzEUTrK1SM2DgmJH3rTeasPoTSx2sz6+0CglCO7JEfHzp4pU7ZJOXxVvwrnyL4m+N/Ipdk7gNpTrMTTGG0pX7JD9CvlHpTIjRvXaH4nOWz12nSvFiNa9nn9ay3hmYnUf61oDS6+Xy3qnJLbabTRLE4MxowBiBmEr5kSD8xWjXrCCGdZ8518hUQMdGGggfWK9S2dc7CPkKu461F1CoAGRpgc8yx9TWpHXrUQNNjZs43B08xtW3Ax/wANiQNf0mJ+Msxn516+IJZQqyOc+da8ExSBMQjmD7a6CACYDfCOZqIVcZeEDnJH5azvtVXFXIiJ3/Ln8KbjYwiRFl3IiMx0+sc+lXcNfXX2dlEA55efhAEjxoIRUwt646slp2nLqFY7Sd48B610PjiSibe/z/dequJxV6QFcwegX6kE1E2YnvMzQJgknXbnoDrUQPxCaQBy/k0OdRrI0ohi1mR1B/GoMda0gfzvvWGJottVTNMczPTqa55xTCteuvlc3hIZ3YAKEAcqi5PeByaEaAnkSaf8fl9kRcKZIE5wCgH7QOkbUo8MxotujPbzBmbI9tFJK7CESYUDoZAjedMvYMocUxt4FSqCyAmcZ9ScqhWzZtSSfNvWj+HtEopcLmYAnLOXUTpOsVX4rgLZd3W2bjpblUzaFW7gIUgz94jSBHUiCOB4QlhCql2mNXYsdBEdB8AKUSKZQZ1EbEfUUBu2lGJuAEN3bcNO/WmlLffE8iKWbmX7S+VdMluB6g/OavA+SzHhWVs1z9kVlJHSeAhjdOUwcrdPDmVbw5Gmi0uVWyKA+rETu7A6nY6nmQKVeD4tbVzO8xBGgk60cftDhzuWBiJymRPSKG0tsab0ghgLjZUVzLhFLecCfnVula32gw3tA7O2cDJOVu8JkGB+8fiPKpcZ2vw6bODy1DDvEgAbaiJOnhFCmvYdoZKD8KEYjFDxtn1U0NftxhZyo+f9pQcs6TvG3So+BcZVr957jIgcJl3HuiDqdDvU5K0K7tDfWVSHFLH9an9ofnW68Qsna4n9pfzrVoKLVLXa4aJ5N+FHhikOzp6j86A9rLgKLlIJB5GdxWOR/Fm+P8kCOx5/Rx4n6mmbKKVuxrd1x0dvrTUBXWH4oxLZ4UqfCDU1XmrGFOprQC3jWlys7Od9YHKqWOeJBOukafs1fxLAXX11zfjQ/Eo75iEY7RCnePAeNJDTjn7yeIb/AA0uYvtNhLZbPibQj7udSfQSaYuILIQdQR6gVw//AGe4ZDj7aOiuP0ikMAwlUeDB592gh7ftphe77J3cSfcRiTr4xVLBcZuZrptYHFOLjlxKlQBoNTBHKugpYKkhMiLyCoAR8dj6VBiwQyS7GQ8ySB9yNEWOu451FQp+24m4ITAoi9bjg6eIzKantcK4s4n22Htj9gZvqrD50eyJ0Sf4Cf8AC1F8D7g8z9fEn61BRzvj/ZnGJZe9cx9xsgXuIGUGWVd1YfrTtypJ4YzJisOxdmJuqCWJOhIHprXae1cNhL4BBhJ9GB/CuJsYv2T0u2z/AH1pWia7OnPd11gnXlVXFYrltvG28a/WosReOmU7T6E0Ox+IJcbGNf59K5tmi7j72e2IVXzAQG906c9KC4fBXXdHebQCk5RlIAYsHAnUZoHlFESxyiOta4p2RM472pWBuCADqPGdPKssABjxdF8JbuTcJ1yle4kSo1OYgkiSd4601OSFpLu4pCjuyNnPgwVXAIIfJDSQdJmfU052kREVEHdCgAGZgDSZ1nzqRIqJ7w8x8daV75LYp+6FlE01gAZvDwHrTSbRzgzzH1pbYv8Aa3ze9kSfnG3hFPggithfCsqx7QdKyoRz4A4F9J55h/dNOBur0pJ4V/TJ+99QR+NOLsFEnUnYTHInU8hpvShZFi3GWcyJE6tB8Oo2MH4Us38VZABLh/be1UOVUAvmTIZiAIt6dctE8Vjvas1l7BYFT3ZtnMFYZiQXEL7p/DSr168q2i5tArlLsDECVJy85JkjQRqfiNJ7MPsjwGDtPlvqiqzgZwVAzEad4ESGUyPUHwhw+ERcW6hFCm2rRlETmgkCtezGKX2bxAX2jmJYkFyGIYMJEFiOmlTjTHedn6PWeqTNR0EvsVv+rT+yPyrz/d9n+rT+yv5VZrK1SKyoeG2f6pP7IoXxjhqQgVAAWGbLp3dZo1fvKilmMKoknwHlQHimPVjzy5W3BAMqYg9ZjeN658mKXZuDeWxe7OLke7AKjO2nh503WrkilrgeQ58oIgLM82Ikn50dw+0V04n8UHJ+TLWat7N0KSTVdnArM0ia6GCy+KVdcp18t68ON00Xfxqpc1j+da8TbWKis1uYsuwBWIPWa412P7vFUHS/dX1Fxa7HkGbSCefWuPcPX2fF42jGEf2rhH+Kojtd+1dJ7jIojXMrEz/Cw0iK9TBsR+kZWYGQVVlgEDSM5PxmrKtXoaoSE4Nerf2iZ/tTUlvDqogDx2Hw2HXWpJrJqHoF9orY+y4iP6q58lJrh2OEOh6Op9DNd340s4e8Otu4PVGrgfFbvun9oH5Goyx4vvBJB5UOa5MRpp+UVee4DIWM2Vokd0nx5xtVTiJCssenLlNcxLLOYAqpj7Tkdx2Q7gqJMgE6jpy8zWxvelSXC7qAjBddSQTI6CDpQyA59qHa4yoUyK1xuRZADly6akEwdtZOmlMeHNzIrXMmYme5my5T7vvazVHBG07sVksZzTOV1mDH3SN/nRJ20I9KECIsQ7aZeqySJ0mldWjEvMk5E1O+uuup1Ex8KYPb94T5UukD7U+X3ci/5/Oa14EIe0rKkynpWVEOvDGi6h/bX61e47jWbEpbBITKUJPu+0fKVzCRmXVAf3+W4F4Z4dSdgyn0INMd3iuFmS6EzMwTrptp4Csykku3RrFy0BeyjYfD2pxN6yt8u5bO6Z1JMZSSZGgGnj5yW4V2nwXsbYbFWcwRQczoGkAAyJ6iuXf7SnstiC9qCHthmgES4ZgSZiTEa+FJ/D7v6VJ2LLPPSRPyrSaxtGcWnR9Hrwu0e/bOXMpgqdDnKszeJOUa9JqK8sY22ettx6GahTj9pYADQNAAsCB01qriOLob1u4A0IGB2nvCBGtcJ83Ekqa2do8MlfQ1TWFqUuIdppGVFYEzqSNOkb1WXjNuBmV8w5lwDPgYmh/quO6TD9qXoYu0CTaEkAB0JnaM35xUOMw6ujryKfnH0qn/AL7S4hR4AYQGJkEnQZiAI151Swt+4tkq5WSxTMpLt3S5nLGpgjnzrM5qXa7VGXBxdNA7skSc4YzsJ/dkfhTPaUbikTFdocPbdrVqwHjRnckw3MZQNx4VFwntOiPo6FCDNoE6PyKZ9vETzrpxcuKUWv7MSfZ0Vkr1V5UIwfHUu6poR7ymJXpMfXaiS4gV6k0+0BHcSdp8a8RPiuvrpFb3LxVSFAOaQfCoMEsCWJ1JgHoOfrWXL5UNdWSPahww8j5a/nXIuLdzipPTE229Wtt+NdicaDXnSB2h7F4u9inxFkWyrOjrmeDKKo1EaarWgOmivQaWhi+Kz/8AGwv/AH2/9a9OM4r/AMrh/wDvH8qisZ6yKVjj+K/8pY/71YeJcV/5Kz/3hUVjFjUlHHVGHqpr5y4ldlAfKuyXeJ8WiPsNk/8AWX/2rmmJ7CcSZcv2b0uWvxepA2GlYyreBnptO9QYl84BnbN84Hx51mILIArAhvcI00YKZEjnIO3SqntP58tz8/nXKzRbbQDrV3AWgc5JyhFLk76So/xVQ3A110ozwpQ6OB9+5Zt69HuEt8lok+ujUV32X8P2fvKiqFcwAJ7snTcyd62xPBLgVmcMqqrEnu6ACeTTOmlRdqOKXGuMoYqiHKFBIBgwSep33qwvEnPD7xdicvcBO8EDSee9crXaTfR6XxNRTaQpYXiIyS0T3vkTHyigmHxYe+7xAIUR5VRa8Rp4VBgnMk+Vdlo8r2Of2wdKyl9cX/MV5SVHTFoRmsc8SfhZb/E4oqDVGxhU/VHpXHl486OvHyY2AO0XD7d9V9ncfONMzIAMp5QGJOtDOE9nPZ3UuO+dUYEqFiR0kkx6U+pZXoKnW2vShccksU+voXOLdtd/ZTGPs8rN5vO5H/itaNjUYgDCtvH9K+pPwFEQg6VjKKwv00f8hfM/8yvxLFraXKuES5cjXK3cQ9C7HvMPAR40HuY7GPoLFm0sciHO3kKMvFUeJcRSyhdyAAPifAda2+GHo5OTfbK3D8fibAS2yI9vM2ZSiksrakAnnvAqTjnaNJQYVSjhsjwhkKQsEyIGogUn2+P4m+/cUlToEC90fvPyNWsNirhxBRhD5VLHxSRm+f0ocEtGcn4L+P42cMC4sozOO+7Fu87bwFgAbUsdnzZvYlCyBAWIZASVIIJETqNY0oj2pYPbyhgJYQTMGOU+NDewyD7WA6gwH0I55TvNdopUZY14krhX9qn3QQVB0YHqK6Vw3CZ7aMWcFlViNNMwkD0Ncr4pg1uXrdtUAL3EXQciwnbwmut4jEpaT2j3PZpMSYy66LuD0FdF0NIF9p+IPhUR0yk54OcSNVY8iOlJKdr8QugKN5qW35DXanV+M2XJBxGFcTKzdCt4ToNaktPZYe/bnouIJnyyv+FeeUJuV3SO8ZQSqrYjX+1uMK9yAeR9nA+hroXD+KuLNtmWSyKTPdOYgEysdTSzxftFgLTZX74PNLwcfEG5I9K8tdsOGkBiLgB2Yo7AxpuFI5VrjuO3YTqWlQ3W+NT9z+9/lQ612uRrj2/ZMDbiTmGsqG0EeNDE7U8N3F9V8xH/AJqK2tcR4YzMy3bWZokh7cmBAmDJ0rrkc6GDDcdDsqC28mdJB2E0R9ueaN8qXsLfsKc1q6s+Y2PiJqx9pvMwPtUyTqIcsR0DaBfODTkgxZnEu09my/s3S4GgMIVYIM6+91BHwrxO1eHPJ/PKPzrbHWbby7WLTvEKXIPiASVnLJOlLeE7P3MsXAoaSSyOpGpJHcZRHSAw2ocixYt8Xs3L3tHto7DOz91SShLlreYLOhiJ/CYCYX2putCFU/b7phiTChoLHaYGkDbeuh8LyYZnVnB9qsQQFPczakZjqCT/ACRS5fcXMSq20doIJOQhe97uvQypk9a5ZJvof23tlQyAI/nWKZOzCkth1b79+4/8Nu2Av94mh/FcIV7iIxaAWYyQCSTAheQjnzI5VY4XjjZNthbcsiMk5JUl3LsQAZnWPgapSXRqMX2GuLcLS6z3c2RVZ84IkgrpKxuWkadTQ3tJiEXh+REZFZyozEZn6sY2k6fCr3/5GNZsnUyf0LwTpqQDqdBS/wBuOKtftIqI0q2wRwANI0I8D8qy3F68nZyk1T0hCxp72lVrDEfKrTYK6TJQ+jfiKhGAuL93puQPrXS0eamT5qyo4b9n+0v51lNoaZ1gGqtptT5mrWHtM7BVBJPIfzpRWx2cya3XAkzlUSfiTAHzqoAYj1KrVeuHBpoS7H96foAPnUP+8MLytMfNj+DUkV81au9WxxHD/wBR/ff/ANqvWOL2B/8ArqPKCfmKOhE3i3FfZiEUu52RQSfMxsKrYDB4nEWc17D5pLFVKONBtuNK6Za41ZjQFfCAP8qtJxG033o/eBHz2qpewpnMuC9mMWqFjbZCZhAUVF6DeT51Hhuw2LN32l5kAI72UlmMbCABI258q6gMNmYul2SdgQrBR0WIIHxrVrd4bMh81YfMMfpSoL2Aj3uylspD4ZsQZzS/tUjSAFCSDz361WTs/bsuHt4FQ4Ea4nEbRtBt0+PfxA+4h8rrT6FPxqJuI3hvh7h/de2R83B+VaSSChW4RwlDfS8LV5CssDcIgMQRGUakCTqelXu3GFvXcGyIoc57ZCqDMBxMT0FGjxNj9wg6yHKgjpMZjB/CqGKvX3EJ9nSeZRrny/R/WpRZq/FHMsLwpbdt72Kt3wqPbkKsQhzEuwZTmWVCwCPe31FdPvcEwgXuYawVYc7aNII/aGtDxhGDK93FNC/dVLFtGHMMCjsVPMZqKtig9seyUsF7oymQAAAJY6etVNIFs4x2tYNiL1qzhrQyNkX2dlQYZASe4o1DBoPj4VWweORLK2HUs6F5KQw1YncaabU8XuwN7EO74jEvkd2YW1ZoUMxIUjvLz5RzoivYy8iottsOVWID2+8AOWYZSfPfnWXddIUl5OWNcT9oeYqnhnUlpManlXS+J9k+IN7otx0QIPmQW+dAbvAcfb9/DZlHPIp9SFFFMuhdtAc4qyghZUhdRsddA01ZRXc5Vwysdu6rzPjDQPjRFezt1oH2bL1PtQAPOVPymhujSjeimmKeAUuOD4O34GpLfFsSpAF+7H77nX4mi9zsT+rcHkf8qpXeyF9fdcHyY0ZosJBHhjvfR2uO7PYbOCQCSj22UrMjmobn7o+AvgVhbV03s5L21PdKAKxyEL988sh21CcpopwTh12xaxRuTqqxrMwtwH/yFBrmKVQp595Dt0MT01mPD4UJK7S2Um8Un4ZJguN4y46IrhndlUSo1LMBrEda6zheBFU/SXWZ+eQZVHlMk+dc1/2eYRlxPtb2iWULbGS7dxABzPeY/wANG+N/7UraOUt288GCZ09dBPlPnXSMY1YOUvZp2qxmKwxZ7ZR7aiSDmVlUakyGIb0FJ7f7Q7skezDAcwx/FTRt+2mHxiPZdDbZ1KAkgqcwjfSDrVDsmlpQ6OiZj3SSB7y92NfT061mdR8DG5eQFxbthduxlzJA1CuYJ6mAJoDcxrtqW168/UyaOdreFqjlkECdhtr/AD86WwDVGmrQSyTo29u/6zeprK1ynoa9rRi2fTPZdFFsvpmL6+SgQPmT8asdo7bNZLJrrLRvHP0pc7PYt1coNVYEkeIG48Yn0rfHcWdHlGI/EdCDvTdI1QALV6r1pibqscygAHdRsDzjw5/LlWivWDRdR6nR6oI9To1FkEFfSqV7iVxGhW0gaEAipEahuKbvGki8vH2HvoD4qSD+NWbfa1QQM9xCTADDMOvjppS5cNA+OYvIhg95hlXqCQcxnyiqvQZezpmB7WB/cu2bnUBgG9AfwoqnGh99GHkQfrFfNd2AP52FGzxLE2IyXriiB94lToPutKyNjp0pqS8jlH0dxxDo7llcKDEgyrAc4OUj6VYw+CsR3g1z/qF/7sj0rjmB7b4kL38jkbysEjr3YHypn4d2tV1l7RX91g31AouSNXFnTrKYYaBUXwZQp/vCrF3E2UHedE82UfjSLhO0dttBcZfBpj56USs4hGOYJac9cqz8CtOcvJKEWE8V2kwiatdDeQ3PgW0Jqg3am239FYxD9CJj5ZgB8KtLjFO6fP6VIuMQ8yPMf61hyk/KOiXGlpv+wevF8Syx9mugnYqbeg8TdCmf4TWnG8dbspnexir7COZyg9SFYADyUnwowt0HYqfjWzHqKU2tuzLxelQhYPtliLrjJgSbc6kK8xz7zwvx18jTI2JumSMMjLE9y6GPxCoYoqyKeVR3cKj+8oPmJqv+Ar+RQv8AEsS+tqwoXeSDBG/vOyiIrbC4m6ffNjytl3aekIGAPxo43ALEg+zQxoJUGAOQ6VMbTp7gAHgI+lZdehSfs8w2EbK2UmGGoZSPkRQi92ZQzNtdTuND8jRJ8Y6bzXtri/WjJC4+RZ4vwn7Ph3W2CpceOwEafBm9a5ZiMIQYiu/Yt7eJQoTB3BjY/iK59xTgaq8MyA+LAA+RNdoyVJHKUXYi4HBkuNOdP/Zjs89y5cd9EDsD4iYP89aG3Dh8MM5Zbjj3UTvS3LOV0VesmanwvbRsPw8NE37l26ADyObOWI5gB1A86Jq1RR6Zt2lwEM9liGZRof1kYSp8DB1HUUhfZgCVO4MbVYxPaK+1w3HYM5jMSDrpEb7AaVtZvpdMxlbmPxFYUXE1JqRF9lH6wrKv/ZR41lVhR0bDYl0Mp70Mo8cwKx86kN/21oOfeEhv3hv6gg/GqKtUuAu/pbicnXN/GPejzBn+GuhgHAwSP5/nWrdu0eZj61FeWGnxqQPWEaLKIo6mtXxDA91VA8dT9aiz1o70kbtjnzkSIjQZV5RPL9oelVcTiBqzMPEnStXBLAqCT7ugJ3DE7fuihfaDDO1lwyPsDqrDYg9KaM2aNx6yWCIS7EwMo09dqXONYrPcOshO6PE/ePrp8K14cq2ke9MN7iT+sdz8Pwoe7aaUgzTEKQ0EERGh0I8xTYltL2GYAjOpzL6RB8CBFKLsSZJknmdzRjhRKkjoPw/zpAGhipn+fKmzhFwFJ8qWMbq58/nVzgeNysUOzbeB6VMkNecaRW124Qd9fCq9skwRyrMTdmI5fWgQinFbyDu3G2nU5h6NNW7Hai6vvqjfAqT6afKhCDONd4r0IOZrOKZpSaGO12nQ+8jL6N89D8qu4XtDYYwt7KehJX/yiaSSne8eVVEwrByxO8fDU/nRihU2dVt8QaJDhh8CPzqZOInmoPkTXKmLIZUkeIJH0q/h+J3l++djvB2E7nWhxfs0pr0dKXiK8ww+E/SvDilOzD6fWkvhfGy6u13KAkQVGpzMVG58BVvG8YtW8hctDiVYCdBG/Mb1lqRpSiMjNP8AlVV0U7xQezxmw3u3FB8TlPzirf2gnVWB+INZaNWW/ZAAwYnxoPi+Fq86z6GrTYg+HwqB7o8aGVgu5wFeUUD7Q9mbjIGt6lCTl6zEx46CmLiGOW2mcknWIEzJ86X8V2iuuMqHIvq3rUru0DaapiK+HYaMpBBiCCDRHAYUr3jI3+Mx+VXMTigDLNJPXUmqS4wtMCK722cqSCHtj1rKo5jWUYlkdDV6p4p3D9w5Xy909G1jzHLyJqRXqpi3748vxpsC3h8bnUPtI1HQ8x5ggj4VKHobbaHYDZ++B+1tcA+MN/HTzwjs6iAPidW3FvkP3+p8NvOpKwso8I4JdvwwGRP122/hG7fTxpswPZvDW9WHtG6vt8FGnrNS/wC8OQX/AErGxTHYRXRRSCy02IRNAAoHICB8qwXQ1CXwrudSYopg8NlEVoiDEYK247yK3mAfrQjF9m8K3vYe0fNE/KmgqKq4hgBOkdaGiEHH9hsE5/och6oWX5Ax8qT+Pdmvssujl0Yx3ozKTtqNGGnQV0fjPH0SVTvN8/j0rl/ajjD3jkmQDJMgLPQdY5mud9jXQulAzGZ1qLE2WRvmD9DUqXFXVjPgPzqS5xAPlDCAsx8fGkAxwvHZ1BJ7w0Iq3bvy51oFw3iK2nzAAhhDKRoRy35g038P4ZaurnU5Sf1TpPlQ2NGqD1rxEmZ6bnrVtuC3E9whx4GG9Dp86gRHEq6svSRGvhyNIFc2X33jpVlMPmB66fHzr1AygAmTPMRUd64w206x4VEVr1grOunSK0uyBMaQ3yU1McRIidfGoH10neB5Zj+U+lRE/Dr5TTIjgrBDAnfXSDofHxrXjeMF3IAmQWwREyN1IjQdPnWkSSfxrTEswX61EUlhhrzrW3dKaKxUzyJHLwrVWg17djmBWSLCcaxC7OSOjAH571Ztdpn+8inyJH1mgypXgXXSrFGsmGeI8aS7bywwMjcDl4g/hS1j8SwgKY69asFYNDcQcz/ED86lFInJshc7Dw+Z1/EV7YeGHpWpaWnqZrR960YC0mvar2r2grKhHZbtUOJXyCrDbY+dVftJNeXAXEEaVizVBPhGPGcTDFSHUdSpBKjxIAP8Mc66FhOOpiFzyPhy8CORrltnDRV22zA5g7T1DEUqVFR1C1jlHjVxOKIP9K5pa4ndG7A+Y/Kt8Tx10RnaIUTz16Aa7k6U5FR0z/e9sf6VHc7QouwJrmmD447+zlRmdcx1Oggkev4GhmL7WujMvsx3SR755fw6U2wpHSsZ2sb7ietLPFePuwJdwiDfWP5PlrSTd7T33PctqPgzH1kD5VTbh+JvNmck+fLyA0HwodvY/RLxXjzPKWpVOZ+835Dw3PPpQIsT1NMuH7M/ryf58KK4fhCINFAqutBT8idZ4fcbZY89KI2OAn77fAU1pg62bCgUWypC/a4cibKPjRLDOV208tKsPbUVqpHSqhCmF4k43hvPf1ovh+JIwhtPA6j+fOlTOaz2hHOohrxHDrVwSJHih09NqEYrgVzdGVvkfQ6fOhaYlgZVip6gx9N6I4bjbr70OPQ+o0+VNlQNxeGdBDoynxGh8jVW0RnPRRr4sYHxiQPWmpOMI+jHKvQ/e+O0fX61n4ZZf3VyyJLIYkk6CNvH0qsKFxgDpJrdF+VEMXwC4PccMOh7p/I/Kg2Is3E99WXz2PxGlIGt3earXSa9uNoKjS5URujkiKhLw3xrdn8K0ZNZqIy6+9CW0BPgfnp+NEcQND8KHYrQAddaEBmEs5g3lA89/wAqgar2FWEHiZqpiUhj46+tJEM1leVlJDXbqytZWVyOhOKkrKyhkbrQrtSf0K/v/wCGsrK1HZS0WMD/APJteSf/AMGoXkDYlwwBGY6HXmete1la8GfI2cNsrHuj0FWUG1ZWVlGja5WiVlZSRu2wqterKyoCFqh51lZUJ421RDasrKCN0qK5sayspIiTermCuMGMEjXr5VlZUQ0NUZrysrQCr2iQLcUKABGw0+lC296vayoyyJ9q0O1e1lQIjubfEfRqF473vgKysqRF6z7q+Q+lU8fuPjWVlSIqVlZWUkf/2Q=="
                            />
                        </div>
                        <div className="overflow-hidden border rounded-2xl">
                            <img
                                className=""
                                alt=""
                                src="data:image/jpeg;base64,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"
                            />
                        </div>
                        <div className="overflow-hidden border rounded-2xl">
                            <img
                                alt=""
                                src="data:image/jpeg;base64,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"
                            />
                        </div>
                        <div className="overflow-hidden border rounded-2xl">
                            <img
                                alt=""
                                src="data:image/jpeg;base64,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"
                            />
                        </div>
                    </div>
                </div>

                <div className="buttons  ">
                    <button
                        className="h-[148px] w-[148px] bg-primary flex justify-center items-center gap-4 flex-col rounded-xl"
                        onClick={() => handleAddMeetingRoom()}>
                        <PlusIcon />
                        <span className="text-white text-xl">Add Meeting Room </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MeetingRoomNew;
