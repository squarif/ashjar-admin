import { useState } from "react";

import { ReactComponent as PlusIcon } from "../../../../assets/PlusIcon.svg";
import { Switch } from "@chakra-ui/react";

import { Input } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { workspaceAmenitiesState } from "../../../../stores/workspaceStore";

// import { useQuery } from "@apollo/client";
// import { GET_Amenities } from "./queries";

function Amenities() {
    const [searchQuery, setSearchQuery] = useState("");
    // const [quantityToggle, setQuantityToggle] = useState("quantity");

    const [amenitiesData, setAmenitiesData] = useRecoilState(workspaceAmenitiesState);

    const decreaseQuantity = (index) => {
        if (amenitiesData[index].quantity > 1) {
            const updatedAmenities = [...amenitiesData];

            updatedAmenities[index] = {
                ...updatedAmenities[index],
                quantity: updatedAmenities[index].quantity - 1,
            };

            setAmenitiesData(updatedAmenities);
        }
    };

    const increaseQuantity = (index) => {
        const updatedAmenities = [...amenitiesData];

        updatedAmenities[index] = {
            ...updatedAmenities[index],
            quantity: updatedAmenities[index].quantity + 1,
        };

        setAmenitiesData(updatedAmenities);
    };

    const handleAddAmenity = () => {
        let newAmenity = {
            picture: "",
            name: "",
            quantity: 1,
            type: "quantity",
        };

        setAmenitiesData([...amenitiesData, newAmenity]);
    };

    const handleQuantityToggle = (index, value) => {
        // setQuantityToggle(value);

        const updatedAmenities = [...amenitiesData];

        updatedAmenities[index] = {
            ...updatedAmenities[index],
            quantity: 1,
            type: value,
        };

        // updatedAmenities[index] = {
        //     ...updatedAmenities[index],
        //     quantityToggle: value,
        // };

        setAmenitiesData(updatedAmenities);
    };

    const handleToggle = (index, value) => {
        const updatedAmenities = [...amenitiesData];
        if (value) {
            updatedAmenities[index] = {
                ...updatedAmenities[index],
                quantity: 1,
            };
        } else {
            updatedAmenities[index] = {
                ...updatedAmenities[index],
                quantity: 0,
            };
        }
        setAmenitiesData(updatedAmenities);
    };

    return (
        <div className="flex gap-7 flex-col">
            <div className="text-left text-2xl">Amenities</div>

            <div className="border rounded-2xl flex flex-col  ">
                {amenitiesData.map((amenity, index) => {
                    // console.log("amenity", amenity);
                    return (
                        <div key={index} className="flex p-6 justify-between items-center">
                            <div className="border rounded-2xl border-light px-4">
                                <Input
                                    id="svg"
                                    variant="unstyled"
                                    value={amenity.picture}
                                    className="py-1.5 text-xl max-w-[125px]"
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                />
                            </div>
                            <div className="border rounded-2xl border-light px-4">
                                <Input
                                    id="title"
                                    variant="unstyled"
                                    value={amenity.name}
                                    className="py-1.5 text-xl max-w-[125px]"
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                />
                            </div>
                            <div className="border w-fit rounded-lg overflow-hidden flex items-center">
                                <label
                                    className={
                                        amenity.type === "toggle" ? "bg-primary px-2 py-2" : "px-2 py-2"
                                    }>
                                    <input
                                        key={"toggle" + index}
                                        className="absolute hidden "
                                        type="radio"
                                        value="toggle"
                                        checked={amenity.type === "toggle"}
                                        onChange={() => handleQuantityToggle(index, "toggle")}
                                    />
                                    <span className="text-base text-dark  ">Toggle</span>
                                </label>
                                <label
                                    className={
                                        amenity.type === "quantity"
                                            ? "bg-primary font-xs px-2 py-2"
                                            : "px-2 py-2"
                                    }>
                                    <input
                                        key={"quantity" + index}
                                        type="radio"
                                        value="quantity"
                                        className="absolute hidden "
                                        checked={amenity.type === "quantity"}
                                        onChange={() => handleQuantityToggle(index, "quantity")}
                                    />
                                    <span className="text-base text-dark ">Quantity</span>
                                </label>
                            </div>
                            <div className="w-[112px]">
                                {amenity.type === "toggle" ? (
                                    <Switch
                                        id="toggle"
                                        size="lg"
                                        isChecked={amenity.quantity}
                                        onChange={(event) => handleToggle(index, event.target.checked)}
                                    />
                                ) : (
                                    <div className="w-[112px] rounded-lg justify-center items-center gap-2 flex">
                                        <button className="w-4 h-4 p-2 rounded-full border border-error flex justify-center items-center gap-2.5">
                                            <div
                                                className="text-center text-error text-2xl font-normal  leading-[18px]"
                                                onClick={() => decreaseQuantity(index)}>
                                                -
                                            </div>
                                        </button>
                                        <div className="py-1 px-2">
                                            <div className="text-center text-dark text-2xl font-normal leading-[18px]">
                                                {amenity.quantity}
                                            </div>
                                        </div>
                                        <button
                                            className="w-4 h-4 p-2 rounded-full border border-primary flex justify-center items-center gap-2.5"
                                            onClick={() => increaseQuantity(index)}>
                                            <div className="text-center text-primary text-2xl font-normal  leading-[18px]">
                                                +
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="">
                <button className="rounded-xl bg-primary flex gap-3 px-3 py-4" onClick={handleAddAmenity}>
                    <span className="text-lg text-white leading-normal">Add New Amenity</span>
                    <PlusIcon />
                </button>
            </div>
        </div>
    );
}

export default Amenities;
