import { Input, useToast } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { ReactComponent as MapsIcon } from "../../../assets/MapsIcon.svg";

import client from "../../../apollo";

import { useMutation, useQuery } from "@apollo/client";

import Breadcrumbs from "../../../components/Breadcrumbs";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { CREATE_NURSERY } from "../../../queries/nurseryQueries";
import { useRecoilState } from "recoil";
import { branchesData } from "../../../stores/branches";
import { useLocation, useNavigate } from "react-router-dom";
import PicturesGrid from "../../../components/PicturesGrid";
import { nurseryPictures } from "../../../stores/nurseryStore";
import Loader from "../../../components/Loader";
import { GET_BRANCHES } from "../../../queries/branchesQueries";

function NurseryNew() {
    const [nurseryName, setNurseryName] = useState("");

    const [totalSeats, setTotalSeats] = useState(23);
    const [selectedBranch, setSelectedBranch] = useState();
    const navigate = useNavigate();
    const toast = useToast();

    const [pictures, setPictures] = useRecoilState(nurseryPictures);

    // for branches selector
    const [branchData, setBranchData] = useRecoilState(branchesData);
    const { loading: branchesLoading, error: branchesError, data } = useQuery(GET_BRANCHES);
    useEffect(() => {
        if (!branchesLoading && !branchesError) {
            setBranchData(data.branches);
        }
    }, [branchesLoading, branchesError, data]);

    // selecting branch heandler
    function selectBranch(branch) {
        setSelectedBranch(branch);
    }

    function validateInputs() {
        if (!nurseryName) {
            toast({
                title: "Nursery name cannot be empty",
                status: "error",
            });
            return false;
        }

        if (!selectedBranch._id) {
            toast({
                title: "Please select a branch",
                status: "error",
            });
            return false;
        }

        if (!totalSeats) {
            toast({
                title: "Please select seats",
                status: "error",
            });
            return false;
        }

        return true;
    }

    // create nursery handler
    const [createNursery, { createData, loading, error }] = useMutation(CREATE_NURSERY);
    async function handleAddNursery() {
        if (validateInputs() === false) {
            return;
        }
        try {
            const { data } = await createNursery({
                mutation: CREATE_NURSERY,
                variables: {
                    input: {
                        name: nurseryName,
                        branch: selectedBranch._id,
                        seats: totalSeats,
                        pictures: pictures,
                    },
                },
                // client: client,
            });
            if (data) {
                toast({
                    title: "Nursery Created!",
                    status: "success",
                });

                navigate("/nurseries");
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
        <div className="NurseryNew">
            <div className="flex flex-col gap-16 ">
                <div className="flex justify-between">
                    <Breadcrumbs />
                    {loading ? (
                        <div className="h-[56px] w-[106.38px] bg-primary rounded-xl">
                            <Loader color="#FFF" />
                        </div>
                    ) : (
                        <button
                            onClick={handleAddNursery}
                            className="flex h-14 justify-center items-center gap-2 py-5 px-6 rounded-xl bg-primary">
                            <span className="text-white text-xl leading-6">Submit</span>
                        </button>
                    )}
                </div>
                <div className="relative shadow-md  border rounded-2xl px-8 py-12">
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
                                        {selectedBranch ? (
                                            <span className=" text-lg leading-none">
                                                {selectedBranch.name}
                                            </span>
                                        ) : (
                                            <span className=" text-lg leading-none">Select branch</span>
                                        )}
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

                        <PicturesGrid picturesState={nurseryPictures} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NurseryNew;
