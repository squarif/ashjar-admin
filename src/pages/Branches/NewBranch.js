import { Button, Input, Spinner } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useState } from "react";

import { ReactComponent as MapsIcon } from "../../assets/MapsIcon.svg";

import client from "../../apollo";
import { useMutation } from "@apollo/client";
import { CREATE_BRANCH } from "../../queries/branchesQueries";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

function NewBranch() {
    const [branchName, setBranchName] = useState("testing frontend");
    const [branchLocation, setbranchLocation] = useState("lalu khait");

    const navigate = useNavigate();

    const [createBranch, { data, loading, error }] = useMutation(CREATE_BRANCH);
    async function handleAddBranch() {
        try {
            const { data } = await createBranch({
                mutation: CREATE_BRANCH,
                variables: {
                    input: {
                        name: branchName,
                        location: branchLocation,
                    },
                },
            });
            //  console.log(data, loading);

            navigate("/branches");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="NewBranch">
            <Breadcrumbs />

            <div className="flex flex-col gap-16 ">
                <div className="flex justify-between items-center">
                    <div className="border rounded-xl w-[430px] border-light px-4">
                        <Input
                            value={branchName}
                            placeholder="Enter branch name"
                            className="py-6  text-light text-[24px] leading-none"
                            onChange={(event) => setBranchName(event.target.value)}
                            variant="unstyled"
                        />
                    </div>

                    <button
                        onClick={handleAddBranch}
                        className="flex justify-center items-center gap-2 py-5 px-6 rounded-xl bg-primary">
                        {true ? (
                            <Spinner color="white" className="" />
                        ) : (
                            <span className="text-white text-xl leading-6">Submit</span>
                        )}
                    </button>
                </div>
                <div className="relative shadow-md flex justify-between border rounded-2xl px-8 py-12 items-start ">
                    <div className="relative flex flex-col gap-6 items-start justify-center">
                        <span className="text-[32px] text-dark">Location</span>

                        <Menu>
                            <MenuButton as="button">
                                <div className="flex items-center gap-4 border border-light py-4 px-2 rounded-xl w-[430px]">
                                    <MapsIcon className=" h-5" />
                                    <span className=" text-lg leading-none">Location</span>
                                </div>
                            </MenuButton>
                            <MenuList className="MenuList inset-0 w-[430px] left-[-200px]">
                                <MenuItem>Download</MenuItem>
                                <MenuItem>Create a Copy</MenuItem>
                                <MenuItem>Mark as Draft</MenuItem>
                                <MenuItem>Delete</MenuItem>
                                <MenuItem>Attend a Workshop</MenuItem>
                            </MenuList>
                        </Menu>

                        <div className="border rounded-xl w-[430px] border-light px-4">
                            <Input
                                value={branchLocation}
                                placeholder="Enter branch name"
                                className="py-5 text-dark text-[24px] leading-none"
                                onChange={(event) => setbranchLocation(event.target.value)}
                                variant="unstyled"
                            />
                        </div>
                    </div>

                    <div className="border rounded-xl w-[315px] h-[315px]">map</div>
                </div>
            </div>
        </div>
    );
}

export default NewBranch;
