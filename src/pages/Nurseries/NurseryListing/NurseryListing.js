import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";

import { ReactComponent as ChevronRight } from "../../../assets/ChevronRight.svg";
import { ReactComponent as ClockIcon } from "../../../assets/ClockIcon.svg";
import { ReactComponent as TickIcon } from "../../../assets/TickIcon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/CloseIcon.svg";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";

import { ReactComponent as PlusIcon } from "../../../assets/PlusIcon.svg";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_BRANCH, GET_BRANCHES } from "../../../queries/branchesQueries";
import client from "../../../apollo";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useRecoilState } from "recoil";
import { branchesData } from "../../../stores/branches";
import Loader from "../../../components/Loader";

// import { useQuery } from "@apollo/client";
// import { GET_BRANCHES } from "./queries";

function NurseryListing() {
    const [searchQuery, setSearchQuery] = useState("");
    const [allBranchesFilter, setAllBranchesFilter] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [branchData, setBranchData] = useRecoilState(branchesData);
    const { loading: nurseryLoading, error: nurseryError, data } = useQuery(GET_BRANCHES);

    useEffect(() => {
        if (!nurseryLoading && !nurseryError) {
            // Set the nursery data
            setBranchData(data.branches);
        }
    }, [nurseryLoading, nurseryError, data]);

    function handleSelectBranch(selectedBranch) {
        setAllBranchesFilter(false);

        let result = branchData.filter((branch) => {
            if (branch._id === selectedBranch._id) {
                return branch;
            }
        });

        setSelectedBranch(result[0]);

        // client
        //     .query({
        //         query: GET_BRANCH,
        //         variables: { id },
        //     })
        //     .then((result) => {
        //      //  console.log("result", result);
        //         // Check for loading and error states
        //         if (!result.loading && !result.error) {
        //             // Set the branch data in the state
        //          //  console.log("selected branch result.data.branch", result.data.branch);
        //             setSelectedBranch(result.data.branch);
        //         }
        //     });
    }

    if (nurseryLoading)
        return (
            <div className="h-[400px]">
                <Loader />
            </div>
        );
    return (
        <div>
            <div className="flex justify-between">
                <Breadcrumbs />
                {selectedBranch && !allBranchesFilter ? (
                    <Link
                        to="/nurseries/new"
                        state={{ branch_id: selectedBranch._id }}
                        className="flex h-fit justify-center items-center gap-2 p-3 rounded-xl bg-primary">
                        <PlusIcon className="h-6 w-6 text-white" />
                        <span className="text-white text-xl leading-6">Add New</span>
                    </Link>
                ) : (
                    ""
                )}
            </div>

            <div className="flex flex-col gap-8">
                <div className="flex gap-6 max-h-12">
                    <div className="Search rounded-xl border overflow-hidden px-4 shadow-md ">
                        <Input
                            variant="unstyled"
                            value={searchQuery}
                            placeholder="Search"
                            className=" py-3 px-6 w-[430px] "
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />

                        <div className="Filter"></div>
                    </div>

                    <Menu autoSelect={false}>
                        <MenuButton
                            as="button"
                            className={
                                !allBranchesFilter
                                    ? "rounded-xl h-fit bg-primary border"
                                    : "h-fit rounded-xl border "
                            }>
                            <div className="flex px-4 w-[312px] py-3 items-center justify-between">
                                {selectedBranch ? (
                                    <span className={!allBranchesFilter ? "text-white" : "text-dark"}>
                                        {selectedBranch.name}
                                    </span>
                                ) : (
                                    <span className={!allBranchesFilter ? "text-white" : "text-dark"}>
                                        Select a branch
                                    </span>
                                )}

                                <ChevronRight
                                    className={
                                        allBranchesFilter
                                            ? "rotate-90 h-5 text-white "
                                            : " rotate-90 h-5 text-dark "
                                    }
                                />
                            </div>
                        </MenuButton>
                        <MenuList className="MenuList inset-0 w-[312px] left-[-200px]">
                            {branchData.map((branch, index) => {
                                // console.log("branch", branch);
                                return (
                                    <MenuItem key={index} onClick={() => handleSelectBranch(branch)}>
                                        <div className="flex justify-between w-full">
                                            <span>{branch.name}</span>
                                            <span>{branch.nurseries.length}</span>
                                        </div>
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                    </Menu>

                    <label
                        className={
                            allBranchesFilter
                                ? "rounded-xl bg-primary border h-fit"
                                : "h-fit rounded-xl border "
                        }>
                        <input
                            key={"quantity"}
                            type="radio"
                            value={false}
                            className="absolute hidden "
                            checked={allBranchesFilter}
                            onChange={() => setAllBranchesFilter(true)}
                        />
                        <span className="block text-lg leading-normal text-dark px-4 py-2.5">All</span>
                    </label>
                </div>

                <div className="border rounded-2xl p-8">
                    <div className="flex gap-6 flex-wrap">
                        {allBranchesFilter
                            ? branchData.map((branch) =>
                                  branch.nurseries?.length
                                      ? branch.nurseries.map((nursery) => (
                                            <Link to={`/nurseries/${nursery._id}`}>
                                                <div className="rounded-xl h-fit border border-borderColor  w-[278px] overflow-hidden">
                                                    <div className="relative h-[134px] overflow-hidden ">
                                                        {nursery.pictures?.length ? (
                                                            <img
                                                                className="object-contain"
                                                                src={nursery.pictures[0]}
                                                                alt="workspace"
                                                            />
                                                        ) : (
                                                            <img
                                                                className="object-contain h-[150px] opacity-25 mx-auto"
                                                                src="https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png"
                                                                alt="workspace"
                                                            />
                                                        )}

                                                        <div className="bg-white h-[30px] w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-50">
                                                            <span className="text-dark text-xs">
                                                                SAR {nursery.priceRatePerHour} / period
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="h-fit py-2.5 px-3 flex flex-col">
                                                        <span className="w-fit text-lg text-dark">
                                                            {nursery.name}
                                                        </span>
                                                        <div className="w-fit">
                                                            <span className="w-fit text-left text-sm text-light">
                                                                {nursery.seats}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                      : ""
                              )
                            : selectedBranch
                            ? selectedBranch.nurseries?.length
                                ? selectedBranch.nurseries.map((nursery) => (
                                      <Link to={`/nurseries/${nursery._id}`}>
                                          <div className="rounded-xl h-fit border border-borderColor  w-[278px] overflow-hidden">
                                              <div className="relative h-[134px] overflow-hidden ">
                                                  {nursery.pictures?.length ? (
                                                      <img
                                                          className="object-contain"
                                                          src={nursery.pictures[0]}
                                                          alt="workspace"
                                                      />
                                                  ) : (
                                                      <img
                                                          className="object-contain h-[150px] opacity-25 mx-auto"
                                                          src="https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png"
                                                          alt="workspace"
                                                      />
                                                  )}

                                                  <div className="bg-white h-[30px] w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-50">
                                                      <span className="text-dark text-xs">
                                                          SAR {nursery.priceRatePerHour} / period
                                                      </span>
                                                  </div>
                                              </div>

                                              <div className="h-fit py-2.5 px-3 flex flex-col">
                                                  <span className="w-fit text-lg text-dark">
                                                      {nursery.name}
                                                  </span>
                                                  <div className="w-fit">
                                                      <span className="w-fit text-left text-sm text-light">
                                                          {nursery.seats}
                                                      </span>
                                                  </div>
                                              </div>
                                          </div>
                                      </Link>
                                  ))
                                : "No Nurseries"
                            : "Select a branch"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NurseryListing;
