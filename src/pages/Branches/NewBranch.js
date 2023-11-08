import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useState } from "react";

import client from "../../apollo";
import { useMutation } from "@apollo/client";
import { CREATE_BRANCH } from "../../queries/branchesQueries";
import Breadcrumbs from "../../components/Breadcrumbs";

function NewBranch() {
    const [branchName, setBranchName] = useState("testing frontend");
    const [branchLocation, setbranchLocation] = useState("lalu khait");
    const [createBranch] = useMutation(CREATE_BRANCH);

    async function handleAddBranch() {
        try {
            // console.log("CREATE_BRANCH", CREATE_BRANCH);
            const { data } = await createBranch({
                mutation: CREATE_BRANCH,
                variables: {
                    input: {
                        name: branchName,
                        location: branchLocation,
                    },
                },
                // client: client,
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="NewBranch">
            <Breadcrumbs />
            <div className="flex justify-between items-center">
                <Input
                    value={branchName}
                    placeholder="Enter branch name"
                    className="border py-4 px-6 rounded-xl w-[430px] "
                    onChange={(event) => setBranchName(event.target.value)}
                />
                <button
                    onClick={handleAddBranch}
                    className="flex justify-center items-center gap-2 p-3 rounded-xl bg-primary">
                    <span className="text-white text-xl leading-6">Submit</span>
                </button>
            </div>

            <div className="relative shadow-md flex justify-between border rounded-2xl px-8 py-12 items-start ">
                <div className="relative flex flex-col gap-6 items-start justify-center">
                    <span className="text-[32px] text-dark">Location</span>

                    <Select
                        variant="unstyled"
                        placeholder="Select option"
                        className="relative border py-4 px-2 rounded-xl w-[430px]">
                        <option value="option1" className="absolute right-0">
                            Option 1
                        </option>
                        <option value="option2" className="absolute">
                            Option 2
                        </option>
                        <option value="option3" className="absolute">
                            Option 3
                        </option>
                    </Select>

                    <Input
                        value={branchLocation}
                        onChange={(event) => setbranchLocation(event.target.value)}
                        placeholder="Basic usage"
                        className="border py-4 px-2 rounded-xl w-[430px] "
                    />
                </div>

                <div>map</div>
            </div>
        </div>
    );
}

export default NewBranch;
