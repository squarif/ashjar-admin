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
import Loader from "../../../components/Loader";

// import { useQuery } from "@apollo/client";
// import { GET_BRANCHES } from "./queries";

function MeetingRoomListing() {
    const [searchQuery, setSearchQuery] = useState("");
    const [upcomingFilter, setUpcomingFilter] = useState(true);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [branchData, setBranchData] = useState([]);
    const { loading: branchesLoading, error: branchesError, data } = useQuery(GET_BRANCHES);

    useEffect(() => {
        if (!branchesLoading && !branchesError) {
            // Set the branches data
            //  console.log("data", data);
            setBranchData(data.branches);
        }
    }, [branchesLoading, branchesError, data]);

    function handleSelectBranch(branch) {
        const id = branch._id;
        // Fetch data for the selected branch
        // Use Apollo Client's client.query to perform the query
        // You need to have access to the Apollo Client's client instance
        client
            .query({
                query: GET_BRANCH,
                variables: { id },
            })
            .then((result) => {
                //  console.log("result", result);
                // Check for loading and error states
                if (!result.loading && !result.error) {
                    // Set the branch data in the state
                    //  console.log("selected branch result.data.branch", result.data.branch);
                    setSelectedBranch(result.data.branch);
                }
            });
    }

    if (branchesLoading)
        return (
            <div className="h-[400px]">
                <Loader />
            </div>
        );

    return (
        <div>
            <Breadcrumbs />
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

                    <Menu>
                        <MenuButton
                            as="button"
                            className={
                                upcomingFilter
                                    ? "rounded-xl h-fit bg-primary border"
                                    : "h-fit rounded-xl border "
                            }>
                            <div className="flex px-4 w-[312px] py-3 items-center justify-between">
                                {selectedBranch ? (
                                    <span className={upcomingFilter ? "text-white" : "text-dark"}>
                                        {selectedBranch.name}
                                    </span>
                                ) : (
                                    <span className={upcomingFilter ? "text-white" : "text-dark"}>
                                        Select a branch
                                    </span>
                                )}

                                <ChevronRight
                                    className={
                                        upcomingFilter
                                            ? "rotate-90 h-5 text-white "
                                            : " rotate-90 h-5 text-dark "
                                    }
                                />
                            </div>
                        </MenuButton>
                        <MenuList className="MenuList inset-0 w-[312px] left-[-200px]">
                            {branchData.map((branch) => {
                                // console.log("branch", branch);
                                return (
                                    <MenuItem onClick={() => handleSelectBranch(branch)}>
                                        {branch.name}
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                    </Menu>

                    <label
                        className={
                            upcomingFilter ? "rounded-xl h-fit bg-primary border" : "h-fit rounded-xl border "
                        }>
                        <input
                            key={"toggle"}
                            className="absolute hidden "
                            type="radio"
                            value={true}
                            checked={upcomingFilter}
                            onChange={() => setUpcomingFilter(true)}
                        />
                        <span className="block text-lg leading-normal  text-dark px-4 py-2.5 ">Upcoming</span>
                    </label>

                    <label
                        className={
                            !upcomingFilter
                                ? "rounded-xl bg-primary border h-fit"
                                : "h-fit rounded-xl border "
                        }>
                        <input
                            key={"quantity"}
                            type="radio"
                            value={false}
                            className="absolute hidden "
                            checked={!upcomingFilter}
                            onChange={() => setUpcomingFilter(false)}
                        />
                        <span className="block text-lg leading-normal text-dark px-4 py-2.5">All</span>
                    </label>
                </div>

                <div className="border rounded-2xl p-8">
                    <div className="flex gap-6 flex-wrap">
                        {selectedBranch
                            ? selectedBranch.meetingRooms.length
                                ? selectedBranch.meetingRooms.map((meetingRoom) => (
                                      <Link to={`/meeting-rooms/${meetingRoom._id}`}>
                                          <div className="rounded-xl h-fit border border-borderColor  w-[278px] overflow-hidden">
                                              <div className="relative h-[134px] overflow-hidden ">
                                                  <img
                                                      className="object-contain"
                                                      src={meetingRoom.pictures[0]}
                                                      alt="meeting room"
                                                  />

                                                  <div className="bg-white h-[30px] w-[164px] absolute bottom-1.5 left-1.5 rounded-xl backdrop-blur-[2px] bg-opacity-50">
                                                      <span className="text-dark text-xs">
                                                          SAR {meetingRoom.ratesPerHour} / period
                                                      </span>
                                                  </div>
                                              </div>

                                              <div className="h-fit py-2.5 px-3 flex flex-col">
                                                  <span className="w-fit text-lg text-dark">
                                                      {meetingRoom.name}
                                                  </span>
                                                  <div className="w-fit">
                                                      <span className="w-fit text-left text-sm text-light">
                                                          {meetingRoom.totalSeats}
                                                      </span>
                                                  </div>
                                              </div>
                                          </div>
                                      </Link>
                                  ))
                                : "No meeting rooms"
                            : "Select a branch"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MeetingRoomListing;
