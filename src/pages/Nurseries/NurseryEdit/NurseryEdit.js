import { Input, useToast } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useState } from "react";

import { ReactComponent as MapsIcon } from "../../../assets/MapsIcon.svg";

import client from "../../../apollo";

import { useMutation } from "@apollo/client";

import Breadcrumbs from "../../../components/Breadcrumbs";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { EDIT_NURSERY } from "../../../queries/nurseryQueries";
import { useRecoilState } from "recoil";
import { branchesData } from "../../../stores/branches";
import { useNavigate } from "react-router-dom";
import { editNurseryData, nurseryPictures } from "../../../stores/nurseryStore";

function NurseryEdit() {
    const [nurseryData, setNurseryData] = useRecoilState(editNurseryData);

    const [nurseryName, setNurseryName] = useState(nurseryData.name);
    const [totalSeats, setTotalSeats] = useState(nurseryData.seats);
    const [ratePerHour, setRatePerHour] = useState(nurseryData.priceRatePerHour);
    const [selectedBranch, setSelectedBranch] = useState(nurseryData.branch);

    const navigate = useNavigate();
    const toast = useToast();

    let [pictures, setPictures] = useRecoilState(nurseryPictures);

    // console.log("SATEEE", state);

    const [editNursery] = useMutation(EDIT_NURSERY);

    const [branchData, setBranchData] = useRecoilState(branchesData);

    function selectBranch(branch) {
        setSelectedBranch(branch);
    }

    //  console.log("NURSERY DATA", nurseryData);
    // console.log("NURSERY branch", nurseryData.branch.name);

    async function handleEditNursery() {
        try {
            //  console.log("selectedBranch", selectedBranch._id);

            let payload = {
                input: {
                    _id: nurseryData._id,
                    name: nurseryName,
                    branch: selectedBranch._id,
                    seats: parseInt(totalSeats),
                    priceRatePerHour: parseInt(ratePerHour),
                },
            };

            //  console.log("EDIT NURSERY PYALOAD", payload);
            // // console.log("EDIT_NURSERY", EDIT_NURSERY);
            const { data } = await editNursery({
                mutation: EDIT_NURSERY,
                variables: payload,
                // client: client,
            });
            if (data) {
                navigate("/nurseries");
                toast({
                    title: "Nursery Updated!",
                    status: "success",
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: error.message,
                status: "error",
            });
        }
    }

    return (
        <div className="NurseryEdit">
            <div className="flex flex-col gap-16 ">
                <div className="flex justify-between">
                    <Breadcrumbs />

                    <button
                        onClick={handleEditNursery}
                        className="flex h-14 justify-center items-center gap-2 py-5 px-6 rounded-xl bg-primary">
                        <span className="text-white text-xl leading-6">Submit</span>
                    </button>
                </div>
                {nurseryData ? (
                    <div className="relative shadow-md  border rounded-2xl px-8 py-12">
                        <div className="pictures grid grid-cols-5 grid-rows-2 gap-6">
                            {pictures.length ? (
                                pictures.map((picture, index) =>
                                    index === 0 ? (
                                        <div className="relative overflow-hidden rounded-2xl border col-span-3 row-span-2">
                                            <img alt="" src={picture} />
                                        </div>
                                    ) : (
                                        <div className="overflow-hidden border rounded-2xl">
                                            <img className="" alt="" src={picture} />
                                        </div>
                                    )
                                )
                            ) : (
                                <img
                                    className="object-contain opacity-25 mx-auto col-span-3 row-span-2"
                                    src="https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png"
                                    alt="workspace"
                                />
                            )}
                        </div>
                        <div className="flex gap-8 flex-col justify-between items-start w-[500px]">
                            <div className="border rounded-xl border-light w-full px-4">
                                <Input
                                    value={nurseryName}
                                    placeholder="Enter Nursery Name"
                                    className="py-6 text-dark text-[24px] w-full leading-none"
                                    onChange={(event) => setNurseryName(event.target.value)}
                                    variant="unstyled"
                                />
                            </div>
                            <Menu className="">
                                <div>
                                    <span className="text-sm text-mediumGray">Location</span>
                                    <MenuButton as="button" className="w-[500px]">
                                        <div className="flex items-center gap-4 border border-light py-5 px-2 rounded-xl">
                                            <MapsIcon className=" h-5" />

                                            <span className=" text-lg leading-none">
                                                {selectedBranch.name}
                                            </span>
                                        </div>
                                    </MenuButton>
                                </div>

                                <MenuList className="MenuList inset-0 col-span-6  left-[-200px]">
                                    {branchData.map((branch, index) => (
                                        <MenuItem key={index} onClick={() => selectBranch(branch)}>
                                            {branch.name}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                            <div className="relative grid grid-cols-8 gap-8 items-center">
                                {/* <span className="text-[32px] text-dark">Location</span> */}

                                <div className="col-span-4">
                                    <span className="text-sm text-mediumGray">Rate / Hour</span>
                                    <div className="border max-w-[125px] col-span-2 rounded-xl border-light px-4">
                                        <Input
                                            value={ratePerHour}
                                            placeholder=""
                                            className="py-[22px] text-dark text-[24px] leading-none"
                                            onChange={(event) => setRatePerHour(event.target.value)}
                                            variant="unstyled"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-4">
                                    <span className="text-sm text-mediumGray">Total Seats</span>
                                    <div className="border max-w-[125px] rounded-xl border-light px-4">
                                        <Input
                                            value={totalSeats}
                                            placeholder=""
                                            className="py-[22px] text-dark text-[24px] leading-none"
                                            onChange={(event) => setTotalSeats(event.target.value)}
                                            variant="unstyled"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    "Please go back"
                )}
            </div>
        </div>
    );
}

export default NurseryEdit;
