import { Input } from "@chakra-ui/react";

import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { ReactComponent as EqualIcon } from "../../../assets/EqualIcon.svg";

import { Textarea } from "@chakra-ui/react";
import DatePicker from "./components/DatePicker/DatePicker";
import { useRecoilState } from "recoil";
import { workshopRequestPayload } from "../../../stores/workshopStore";
import Branches from "../components/Branches";
import Amenities from "../components/Amenities";
import Categories from "../components/Categories";

function WorkshopEditPost() {
    const [requestPayload, setWorkShopRequestPayload] = useRecoilState(workshopRequestPayload);

    let pricePerSeat = 69;

    return (
        <div className="flex flex-col gap-8">
            <div className="title border rounded-2xl border-light px-8 py-12 flex flex-col gap-8">
                <div className="title mb-6 rounded-xl border overflow-hidden px-4">
                    <Input
                        variant="unstyled"
                        value={requestPayload.name}
                        placeholder="Enter workshop name"
                        className="py-4 "
                        onChange={(event) =>
                            setWorkShopRequestPayload({ ...requestPayload, name: event.target.value })
                        }
                    />
                </div>
                <div className="cost flex gap-12 items-center">
                    <div className="border rounded-2xl border-light px-4">
                        <Input
                            id="cost"
                            variant="unstyled"
                            value={pricePerSeat}
                            className="py-4 max-w-[143px]"
                            onChange={(event) => (pricePerSeat = event.target.value)}
                        />
                    </div>
                    <div className="">
                        <CloseIcon className="h-5 w-5 text-mediumGray" />
                    </div>
                    <div className="border rounded-2xl border-light px-4">
                        <Input
                            id="seats"
                            variant="unstyled"
                            value={requestPayload.seats}
                            className="py-4 max-w-[125px]"
                            onChange={(event) =>
                                setWorkShopRequestPayload({ ...requestPayload, seats: event.target.value })
                            }
                        />
                    </div>
                    <div className="">
                        <EqualIcon />
                    </div>
                    <div className="text-primary text-[32px]">SAR {requestPayload.seats * pricePerSeat}</div>
                </div>
            </div>
            <div className="description flex gap-7 flex-col border rounded-2xl border-light px-8 py-12">
                <div className="text-left text-2xl">Description</div>
                <div className="border rounded-2xl bordr-light px-8 py-12">
                    <Textarea
                        value={requestPayload.description}
                        onChange={(event) =>
                            setWorkShopRequestPayload({ ...requestPayload, description: event.target.value })
                        }
                        placeholder="Here is a sample placeholder"
                        size="sm"
                    />
                </div>
            </div>
            <div className="timings border rounded-2xl border-light px-8 py-12 flex flex-col gap-6">
                <div className="text-left text-2xl">Timings</div>

                <DatePicker />
                <div className=""></div>
            </div>
            <div className="location border rounded-2xl border-light px-8 py-12 ">
                <Branches />
            </div>
            <div className="amenities border rounded-2xl border-light px-8 py-12 ">
                <Amenities />
            </div>
            <div className="categories border rounded-2xl border-light px-8 py-12 ">
                <Categories />
            </div>
            <div className="pictures border rounded-2xl border-light px-8 py-12 flex gap-7 flex-col ">
                <div className="text-left text-2xl">Pictures</div>
                <div className="pictures grid grid-cols-5 grid-rows-2 gap-6">
                    {requestPayload.pictures.map((picture, index) =>
                        index === 0 ? (
                            <div className="relative overflow-hidden rounded-2xl border col-span-3 row-span-2">
                                <img alt="" src={picture} />
                                <div className="bg-white h-[30px] w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-50">
                                    <span className="text-dark text-xs">
                                        SAR {requestPayload.pricePerSeat} / period
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-hidden border rounded-2xl">
                                <img className="" alt="" src={picture} />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default WorkshopEditPost;
