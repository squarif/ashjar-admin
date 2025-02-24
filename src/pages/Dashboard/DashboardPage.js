import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { ReactComponent as ChevronRight } from "../../assets/ChevronRight.svg";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { DatePicker } from "antd";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import {
    GET_ADVANCE_SEARCH_BOOKINGS,
    GET_BRANCHES_REVENUE,
    GET_BRANCHES_REVENUE_FOR_N_MONTHS,
    GET_BRANCH_REVENUE,
    GET_BRANCH_REVENUE_FOR_N_MONTHS,
} from "../../queries/dashBoardQueries";
import { useQuery } from "@apollo/client";
import UsersBookings from "../BookingsPage/components/UsersBookingsList";
import { useRecoilState } from "recoil";
import { userBookingsFilters } from "../../stores/dashboardStores";
import client from "../../apollo";
import { GET_BRANCHES } from "../../queries/branchesQueries";
import { GET_USERS } from "../../queries/userQueries";

const COLORS = ["#E4E8EF", "#B0C478"];

function RevenuePieCharts({ dates, selectedBranch }) {
    const [workspaceRevenueData, setWorkspaceRevenueData] = useState(500);
    const [roomRevenueData, setRoomRevenueData] = useState(500);
    const [workshopRevenueData, setWorkshopRevenueData] = useState(500);
    const [totalRevenueData, setTotalRevenueData] = useState(1000);
    const { loading: usersLoading, error: usersError, data } = useQuery(GET_USERS);
    const [userData, setUserData] = useState([]);
    const [retentionRate, setRetentionRate] = useState([]);

    useEffect(() => {
        if (!usersLoading && !usersError) {
            setUserData(data.users);
            findRetentionRate();
        }
    }, [usersLoading, usersError, data, dates]);

    const dateToTimestampDates = (dateStr) => {
        const [day, month, year] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day); // Month is 0-indexed in Date constructor
        return date.getTime();
    };

    const dateToTimestamp = (dateStr) => {
        // const [day, month, year] = dateStr.split('-').map(Number);
        const date = new Date(dateStr); // Month is 0-indexed in Date constructor
        return date.getTime();
    };

    const startDate = dateToTimestampDates(dates?.startDate) < -1 ? dateToTimestamp(dates?.startDate): dateToTimestampDates(dates?.startDate)
    const endDate = dateToTimestampDates(dates?.endDate) < -1 ? dateToTimestamp(dates?.endDate): dateToTimestampDates(dates?.endDate)
    console.log({startDate, endDate})

    const checkDate = (date)=> {
        return dateToTimestamp(date) >= startDate && dateToTimestamp(date) <= endDate
    }

    const findRetentionRate = () => {
        
        const filteredUserBookings = data?.users?.map((user)=>{
            return {
                meetingRoomBookings: user.meetingRoomBookings.filter(booking => checkDate(booking.date)),
                workspaceBookings: user.workspaceBookings.filter(booking => checkDate(booking.date)),
                workshopBookings: user.workshopBookings.filter(booking => checkDate(booking.date))
            }
        })

        // console.log({dates, startDate, endDate, filteredUserBookings})

        const userLength = filteredUserBookings?.filter((user) => {
            return user.meetingRoomBookings.length === 1 || 
                   user.workspaceBookings.length === 1 || 
                   user.workshopBookings.length === 1 || 
                   (user.meetingRoomBookings.length + user.workspaceBookings.length + user.workshopBookings.length) === 1;
        })?.length;
        const requiredUsers = filteredUserBookings?.filter((user) => {
            return user.meetingRoomBookings.length > 1 || 
                   user.workspaceBookings.length > 1 || 
                   user.workshopBookings.length > 1 || 
                   (user.meetingRoomBookings.length + user.workspaceBookings.length + user.workshopBookings.length) > 1;
        })?.length;

        // console.log()
        // console.log({userLength, requiredUsers, data, dates})
        const retention = parseInt((requiredUsers / userLength) * 100)
        setRetentionRate(retention)
    }


    useEffect(() => {
        fetchBranchesData();
    }, [selectedBranch, dates]);

    function fetchBranchesData() {
        const params = selectedBranch
            ? {
                  startDate: dates.startDate,
                  endDate: dates.endDate,
                  id: selectedBranch._id,
              }
            : {
                  startDate: dates.startDate,
                  endDate: dates.endDate,
              };
        client
            .query({
                query: selectedBranch ? GET_BRANCH_REVENUE : GET_BRANCHES_REVENUE,
                variables: params,
            })
            .then(result => {
                console.log("GET BRANCHESSS", result);
                // Set the branches data

                let data = selectedBranch ? result.data.branchRevenue : result.data.branchesRevenue;
                setWorkspaceRevenueData(data.workSpaceRevenue);
                setRoomRevenueData(data.meetingRoomRevenue);
                setWorkshopRevenueData(data.workshopRevenue);

                setTotalRevenueData(
                    data.workSpaceRevenue + data.meetingRoomRevenue + data.workshopRevenue
                );
            });
    }
    return (
        <div className="pie-charts grid grid-cols-4 gap-4">
            <div className=" border rounded-xl border-borderColor shadow-md py-6 px-4 flex justify-between">
                <div className="flex flex-col gap-3">
                    <span className="text-mediumGray text-sm font-semibold text-mediumBold">
                        Workspace Revenue
                    </span>
                    <span className=" text-2xl text-primary">SAR {workspaceRevenueData}</span>
                    {/* <span className=" text-xs text-light">We had 150 Chairs Bookings</span> */}
                </div>
                <ResponsiveContainer width="50%" height="100%">
                    <PieChart>
                        <Pie
                            data={[
                                { name: "Total Branch Revenue", value: totalRevenueData },
                                { name: "Meeting Room", value: workspaceRevenueData },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={20}
                            outerRadius={40}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {[
                                { name: "Total Branch Revenue", value: totalRevenueData },
                                { name: "Meeting Room", value: workspaceRevenueData },
                            ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className=" border rounded-xl border-borderColor shadow-md py-6 px-4 flex justify-between">
                <div className="flex flex-col gap-3">
                    <span className="text-mediumGray text-sm font-semibold text-mediumBold">
                        Meeting Room Revenue
                    </span>
                    <span className=" text-2xl text-primary">SAR {roomRevenueData}</span>
                    {/* <span className=" text-xs text-light">We had 150 Chairs Bookings</span> */}
                </div>
                <ResponsiveContainer width="50%" height="100%">
                    <PieChart>
                        <Pie
                            data={[
                                { name: "Total Branch Revenue", value: totalRevenueData },
                                { name: "Meeting Room", value: roomRevenueData },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={20}
                            outerRadius={40}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {[
                                { name: "Total Branch Revenue", value: totalRevenueData },
                                { name: "Meeting Room", value: roomRevenueData },
                            ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className=" border rounded-xl border-borderColor shadow-md py-6 px-4 flex justify-between">
                <div className="flex flex-col gap-3">
                    <span className="text-mediumGray text-sm font-semibold text-mediumBold">
                        Workshop Revenue
                    </span>
                    <span className=" text-2xl text-primary">SAR {workshopRevenueData}</span>
                    {/* <span className=" text-xs text-light">We had 150 Chairs Bookings</span> */}
                </div>
                <ResponsiveContainer width="50%" height="100%">
                    <PieChart>
                        <Pie
                            data={[
                                { name: "Total Branch Revenue", value: totalRevenueData },
                                { name: "Workshop", value: workshopRevenueData },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={20}
                            outerRadius={40}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {[
                                { name: "Total Branch Revenue", value: totalRevenueData },
                                { name: "Workshop", value: workshopRevenueData },
                            ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className=" border rounded-xl border-borderColor shadow-md py-6 px-4 flex justify-between">
                <div className="flex flex-col gap-3">
                    <span className="text-mediumGray text-sm font-semibold text-mediumBold">
                        Retention Rate
                    </span>
                    <span className=" text-2xl text-primary"> {retentionRate} %</span>
                    {/* <span className=" text-xs text-light">We had 150 Chairs Bookings</span> */}
                </div>
                <ResponsiveContainer width="50%" height="100%">
                    <PieChart>
                        <Pie
                            data={[
                                { name: "Total Branch Revenue", value: 100 },
                                { name: "Percentage of Returning Users", value: retentionRate },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={20}
                            outerRadius={40}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {[
                                { name: "Total Branch Revenue", value: totalRevenueData },
                                { name: "Percentage of Returning Users", value: totalRevenueData },
                            ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className=" border rounded-xl border-borderColor shadow-md py-6 px-4 flex justify-between">
                <div className="flex flex-col gap-3">
                    <span className="text-mediumGray text-sm font-semibold text-mediumBold">
                        Total Revenue
                    </span>
                    <span className=" text-2xl text-primary">SAR {totalRevenueData}</span>
                    {/* <span className=" text-xs text-light">We had 150 Chairs Bookings</span> */}
                </div>
            </div>
        </div>
    );
}

function RevenueGraph({ dates, selectedBranch }) {
    const [branchRevenueData, setBranchRevenueData] = useState(null);

    useEffect(() => {
        fetchBranchesData();
    }, [selectedBranch]);

    function fetchBranchesData() {
        const params = selectedBranch
            ? {
                  n: 12,
                  id: selectedBranch._id,
              }
            : {
                  n: 12,
              };

        client
            .query({
                query: selectedBranch
                    ? GET_BRANCH_REVENUE_FOR_N_MONTHS
                    : GET_BRANCHES_REVENUE_FOR_N_MONTHS,
                variables: params,
            })
            .then(result => {
                console.log("RevenueGraph result", result);

                // Set the branches data
                let items = selectedBranch
                    ? result.data.branchRevenueForNMonths.map(item => {
                          return {
                              month: item.month.split(" ")[0],
                              revenue:
                                  item.meetingRoomRevenue +
                                  item.workSpaceRevenue +
                                  item.workshopRevenue,
                          };
                      })
                    : result.data.branchesRevenueForNMonths.map(item => {
                          return {
                              month: item.month.split(" ")[0],
                              revenue:
                                  item.meetingRoomRevenue +
                                  item.workSpaceRevenue +
                                  item.workshopRevenue,
                          };
                      });

                setBranchRevenueData(items);
            });
    }

    // monthly revenue graph data
    const {
        loading: monthlyRevenueLoading,
        error: monthlyRevenueError,
        data: monthlyDataResponse,
    } = useQuery(GET_BRANCHES_REVENUE_FOR_N_MONTHS, {
        variables: { n: 12 },
    });
    useEffect(() => {
        if (!monthlyRevenueLoading && !monthlyRevenueError) {
            // Set the branches data
            let items = monthlyDataResponse.branchesRevenueForNMonths.map(item => {
                return {
                    month: item.month.split(" ")[0],
                    revenue: item.meetingRoomRevenue + item.workSpaceRevenue + item.workshopRevenue,
                };
            });

            setBranchRevenueData(items);
        }
    }, [monthlyRevenueLoading, monthlyRevenueError, monthlyDataResponse]);

    const RectangleBar = props => {
        const { fill, x, y, width, height } = props;
        return <rect x={x} y={y} width={width} height={height} rx="5" ry="5" fill={fill} />;
    };

    return (
        <div className="total-revenue  border rounded-xl border-borderColor shadow-md py-6 px-4 flex flex-col">
            <span className="text-xl text-mediumGray">Total Revenue</span>
            {/* <div className="flex gap-5 items-center ">
                <span className="text-xl text-dark">SAR 170.8K</span>
                <span className="text-xs text-primary">5% than last month</span>
            </div> */}
            <ResponsiveContainer width="100%" height={325}>
                <BarChart
                    width={500}
                    height={300}
                    data={branchRevenueData}
                    margin={{
                        top: 36,
                        bottom: 36,
                    }}
                >
                    <XAxis dataKey="month" axisLine={false} />
                    <YAxis axisLine={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#B0C478" shape={<RectangleBar />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

function DashboardPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [branchData, setBranchData] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [filtersList, setFiltersList] = useRecoilState(userBookingsFilters);

    const [startDate, setStartDate] = useState("01-01-2023");
    const [endDate, setEndDate] = useState("30-01-2025");

    // branches list data
    const { loading: branchesLoading, error: branchesError, data } = useQuery(GET_BRANCHES);
    useEffect(() => {
        if (!branchesLoading && !branchesError) {
            setBranchData(data.branches);
        }
    }, [branchesLoading, branchesError, data]);

    function handleSelectBranch(selectedBranch) {
        // setAllBranchesFilter(false);
        // const id = branch._id;
        // // Fetch data for the selected branch
        // // Use Apollo Client's client.query to perform the query
        // // You need to have access to the Apollo Client's client instance
        // client
        //     .query({
        //         query: GET_BRANCH,
        //         variables: { id },
        //     })
        //     .then((result) => {
        //         //  console.log("result", result);
        //         // Check for loading and error states
        //         if (!result.loading && !result.error) {
        //             // Set the branch data in the state
        //             //  console.log("selected branch result.data.branch", result.data.branch);
        //             setSelectedBranch(result.data.branch);
        //         }
        //     });

        // let result = branchData.filter((branch) => {
        //     if (branch._id === selectedBranch._id) {
        //         return branch;
        //     }
        // });
        setSelectedBranch(selectedBranch);
    }

    const onChange = (value, dateString) => {
        console.log("Selected Time: ", value);
        console.log("Formatted Selected Time: ", dateString);
        if (value) {
            setStartDate(dateString[0]);
            setEndDate(dateString[1]);
        } else {
            setStartDate("01-01-2023");
            setEndDate("02-01-2025");
        }
    };
    const onOk = value => {
        console.log("onOk: ", value);
    };

    const cellRender = React.useCallback((current, info) => {
        if (info.type !== "date") {
            console.log("info.type", info.type);
            return info.originNode;
        }
        if (typeof current === "number") {
            return <div className="ant-picker-cell-inner">{current}</div>;
        }
        return (
            <div
                className="ant-picker-cell-inner"
                style={
                    current.date() === 1
                        ? {
                              border: `1px solid #C3C3BF`,
                              borderRadius: "12px",
                          }
                        : {}
                }
            >
                {current.date()}
            </div>
        );
    }, []);

    function handleApplyFilters() {
        fetchBookings(filtersList);
    }

    function fetchBookings(filtersList) {
        client
            .query({
                query: GET_ADVANCE_SEARCH_BOOKINGS,
                variables: {
                    params: {
                        ...filtersList,
                        seats: parseInt(filtersList["seats"]),
                        rate: parseInt(filtersList["rate"]),
                    },
                },
            })
            .then(result => {
                if (!result.loading && !result.error) {
                    console.log("result", result);
                    // setUserBookingsData(result.data.AdvanceSearchBooking.bookings);
                    setShowFilters(false);
                }
            });
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="title flex justify-between h-14">
                <Breadcrumbs />
                <div className="flex gap-4">
                    <Menu autoSelect={false}>
                        <MenuButton as="button" className="h-fit rounded-xl border ">
                            <div className="flex px-4 w-[312px] py-3 items-center justify-between">
                                {selectedBranch ? (
                                    <span className="text-dark">{selectedBranch.name}</span>
                                ) : (
                                    <span className="text-dark">All Branches</span>
                                )}

                                <ChevronRight className=" rotate-90 h-5 text-dark " />
                            </div>
                        </MenuButton>
                        <MenuList className="MenuList inset-0 w-[312px] left-[-200px]">
                            {branchData.map(branch => {
                                // console.log("branch", branch);
                                return (
                                    <MenuItem onClick={() => handleSelectBranch(branch)}>
                                        {branch.name}
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                    </Menu>

                    <DatePicker.RangePicker
                        format="YYYY-MM-DD"
                        onChange={onChange}
                        onOk={onOk}
                        cellRender={cellRender}
                        dropdownClassName="createDateRangePicker"
                        style={{
                            border: "1px solid #C3C3BF",
                            borderRadius: "12px",
                            cursor: "pointer",
                            fontSize: "18px",
                            backgroundColor: "#F3F8ED",
                            color: "#343839",
                            boxShadow: "none",
                        }}
                    />
                    {/* <button className="flex items-center gap-3 rounded-xl py-4 px-3 border border-borderColor bg-primaryLight">
                        <CalendarIcon className="text-light" />
                        <span className=" text-lg">Select Dates</span>
                        <PlusIcon className="text-light" />
                    </button> */}
                </div>
            </div>

            <RevenuePieCharts
                dates={{ startDate: startDate, endDate: endDate }}
                selectedBranch={selectedBranch}
            />

            <RevenueGraph selectedBranch={selectedBranch} />

            <UsersBookings selectedBranch={selectedBranch} />
        </div>
    );
}

export default DashboardPage;
