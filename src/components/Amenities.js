import { useEffect, useState } from "react";

import { ReactComponent as PlusIcon } from "../assets/PlusIcon.svg";
import { Switch } from "@chakra-ui/react";

import { Input } from "@chakra-ui/react";
import { atom, useRecoilState } from "recoil";
import FontAwesomeIconPicker from "./IconPicker/IconPicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconUpload from "./IconUpload";

function Amenity({ amenity, index, state }) {
    const [amenitiesData, setAmenitiesData] = useRecoilState(state);

    // const [icon, setIcon] = useState({
    //     prefix: "fas",
    //     icon: [
    //         576,
    //         512,
    //         [],
    //         "f302",
    //         "M160 32c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320H328 280 200c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120z",
    //     ],
    //     iconName: "images",
    // });

    const [icon, setIcon] = useState(amenity.picture);
    const [picture, setPicture] = useState();

    useEffect(() => {
        console.log("picture chnages", picture);
    }, [picture]);

    function handleAmenityPicture(index, icon) {
        // const updatedAmenities = [...amenitiesData];
        const updatedAmenities = JSON.parse(JSON.stringify(amenitiesData));

        console.log("updatedAmenities", updatedAmenities[index]);

        updatedAmenities[index].picture = JSON.stringify(icon);

        console.log("updatedAmenities", updatedAmenities);

        setAmenitiesData(updatedAmenities);

        setIcon(icon);
    }

    function increaseQuantity(index) {
        const updatedAmenities = [...amenitiesData];

        updatedAmenities[index] = {
            ...updatedAmenities[index],
            quantity: updatedAmenities[index].quantity + 1,
        };

        setAmenitiesData(updatedAmenities);
    }

    function decreaseQuantity(index) {
        if (amenitiesData[index].quantity > 1) {
            const updatedAmenities = [...amenitiesData];

            updatedAmenities[index] = {
                ...updatedAmenities[index],
                quantity: updatedAmenities[index].quantity - 1,
            };

            setAmenitiesData(updatedAmenities);
        }
    }
    function handleDeleteAmenity(index) {
        const updatedAmenties = JSON.parse(JSON.stringify(amenitiesData));
        updatedAmenties.splice(index, 1);
        setAmenitiesData(updatedAmenties);
    }
    function handleQuantityToggle(index, value) {
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
    }

    function handleToggle(index, value) {
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
    }

    function handleAmenityTitle(index, value) {
        // const updatedAmenities = [...amenitiesData];
        const updatedAmenities = JSON.parse(JSON.stringify(amenitiesData));

        console.log("updatedAmenities", updatedAmenities[index]);

        updatedAmenities[index].name = value;

        console.log("updatedAmenities", updatedAmenities);

        setAmenitiesData(updatedAmenities);
    }

    function handleAmenityIcon(index, icon) {
        setIcon(icon);
        console.log("ICON", icon);
        // const updatedAmenities = [...amenitiesData];
        const updatedAmenities = JSON.parse(JSON.stringify(amenitiesData));

        console.log("updatedAmenities", updatedAmenities[index]);

        updatedAmenities[index].picture = icon;

        console.log("updatedAmenities", updatedAmenities);

        setAmenitiesData(updatedAmenities);

        setIcon(icon);
    }

    return (
        <div key={index} className="flex p-6 justify-between items-center">
            <div className="border rounded-lg border-light  h-11 min-w-[148px] flex items-center">
                {/* <FontAwesomeIcon icon={icon} className="text-[#838481]" /> */}
                {/* <FontAwesomeIconPicker
                    value={icon.iconName}
                    onChange={(icon) => handleAmenityIcon(index, icon)}
                /> */}

                {amenity.picture.length ? (
                    <div className="flex gap-2 py-3 px-4">
                        <img className="object-cover" height="24" width="24" alt="" src={icon} />
                        <span className="text-mediumGray text-base ">Uploaded</span>
                    </div>
                ) : (
                    <IconUpload
                        propIcon={amenity.picture}
                        setPropIcon={(icon) => handleAmenityIcon(index, icon)}
                    />
                )}
            </div>

            <div className="border rounded-lg border-light px-4">
                <Input
                    id="title"
                    variant="unstyled"
                    placeholder="Name"
                    value={amenity.name}
                    className="py-1.5 text-xl max-w-[125px]"
                    onChange={(event) => handleAmenityTitle(index, event.target.value)}
                />
            </div>
            <div className="border w-fit rounded-lg overflow-hidden flex items-center">
                <label className={amenity.type === "toggle" ? "bg-primary px-2 py-2" : "px-2 py-2"}>
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
                <label className={amenity.type === "quantity" ? "bg-primary font-xs px-2 py-2" : "px-2 py-2"}>
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
            <div className="flex items-center">
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
                <button
                    onClick={() => handleDeleteAmenity(index)}
                    className="hover:bg-errorLight h-fit p-2 rounded-lg">
                    <PlusIcon className="rotate-45 text-error" />
                </button>
            </div>
        </div>
    );
}

function Amenities({ state }) {
    const [amenitiesData, setAmenitiesData] = useRecoilState(state);

    function handleAddAmenity() {
        let newAmenity = {
            picture: "",
            name: "",
            quantity: 1,
            type: "quantity",
        };

        setAmenitiesData([...amenitiesData, newAmenity]);
    }

    return (
        <div className="flex gap-7 flex-col">
            <div className="text-left text-2xl">Amenities</div>

            <div className="border rounded-2xl flex flex-col">
                {amenitiesData.map((amenity, index) => {
                    return <Amenity amenity={amenity} index={index} state={state} />;
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
