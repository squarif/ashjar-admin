import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { ReactComponent as FilterIcon } from "../../assets/FilterIcon.svg";
import { ReactComponent as PlusIcon } from "../../assets/PlusIcon.svg";
import { ReactComponent as ChevronRight } from "../../assets/ChevronRight.svg";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";

import {
    PieChart,
    Pie,
    Sector,
    Cell,
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import { Link } from "react-router-dom";

function DashboardPage() {
    const data = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
    ];
    const COLORS = ["#E4E8EF", "#B0C478"];

    const barChartData = [
        {
            name: "Jan",
            revenue: 2400,
        },
        {
            name: "Feb",
            revenue: 1398,
        },
        {
            name: "Mar",
            revenue: 9800,
        },
        {
            name: "April",
            revenue: 3908,
        },
        {
            name: "May",
            revenue: 4800,
        },
        {
            name: "June",
            revenue: 3800,
        },
        {
            name: "July",
            revenue: 4300,
        },
        {
            name: "August",
            revenue: 4100,
        },
        {
            name: "September",
            revenue: 4800,
        },
        {
            name: "October",
            revenue: 4500,
        },
        {
            name: "November",
            revenue: 1300,
        },
        {
            name: "December",
            revenue: 100,
        },
    ];

    let requestList = [
        {
            _id: "653d7b712f2d99434c7e4c22",
            name: "Finance Workshop Edited",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "12.00 p.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "653cf6c9192631467c2f0648",
                name: "Nursery 2",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "approved",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Branch1",
                location: "Islamabad",
                _id: "6537572cefdb213c0c319113",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "653d9bf853787238d89464ff",
            name: "Sports Workshop",
            timing: [
                {
                    date: null,
                    startTime: "12.00 p.m",
                    endTime: "9.00 a.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "653d9b2e53787238d89464fc",
                name: "Brand New Nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Branch1",
                location: "Islamabad",
                _id: "6537572cefdb213c0c319113",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "653d9cda53787238d8946505",
            name: "E-Sports Workshop",
            timing: [
                {
                    date: null,
                    startTime: "12.00 p.m",
                    endTime: "9.00 a.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "653d9b2e53787238d89464fc",
                name: "Brand New Nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "rejected",
            draft: false,
            rejectionReason: "Unavailable",
            branch: {
                name: "Branch1",
                location: "Islamabad",
                _id: "6537572cefdb213c0c319113",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "653da62ceaaae456c42c2d61",
            name: "Testing Workshop",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "12.00 p.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "653cf6c9192631467c2f0648",
                name: "Nursery 2",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Branch1",
                location: "Islamabad",
                _id: "6537572cefdb213c0c319113",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "653daa7beaaae456c42c2d6d",
            name: "Testing Workshop",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "12.00 p.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "653d1311c024721d80bc1bf0",
                name: "Nursery 3",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Branch1",
                location: "Islamabad",
                _id: "6537572cefdb213c0c319113",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "653daadceaaae456c42c2d75",
            name: "Testing Workshop 2",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "12.00 p.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "653cf6c9192631467c2f0648",
                name: "Nursery 2",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "approved",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Branch1",
                location: "Islamabad",
                _id: "6537572cefdb213c0c319113",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "654554c943c1804664faec08",
            name: "Austria Workshop",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "10.00 a.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "6545519eaad1963490a2f8e5",
                name: "Austria Nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "approved",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Austria Collabs",
                location: "Austria",
                _id: "65455144aad1963490a2f8e3",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "6545573676ffc35e08dccc2a",
            name: "Austria Workshop 2222",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "10.00 a.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "6545519eaad1963490a2f8e5",
                name: "Austria Nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Austria Collabs",
                location: "Austria",
                _id: "65455144aad1963490a2f8e3",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "654557c3a642614c486c0394",
            name: "Austria Workshop 9999",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "10.00 a.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "6545519eaad1963490a2f8e5",
                name: "Austria Nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Austria Collabs",
                location: "Austria",
                _id: "65455144aad1963490a2f8e3",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "654557daa642614c486c0397",
            name: "Austria Workshop 9",
            timing: [
                {
                    date: null,
                    startTime: "9.00 a.m",
                    endTime: "10.00 a.m",
                    __typename: "Timing",
                },
            ],
            nursery: {
                _id: "6545519eaad1963490a2f8e5",
                name: "Austria Nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "approved",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Austria Collabs",
                location: "Austria",
                _id: "65455144aad1963490a2f8e3",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
        {
            _id: "654576e8d076443dec8c97d8",
            name: "Portugal Workshop",
            timing: [],
            nursery: {
                _id: "654572e9b6f2bf0a9c590687",
                name: "Portugal Nursery",
                __typename: "NurseryData",
            },
            workspace: null,
            description: null,
            categories: [],
            approvalStatus: "pending",
            draft: false,
            rejectionReason: null,
            branch: {
                name: "Portugal Branch",
                location: "Portugal",
                _id: "654572beb6f2bf0a9c590685",
                __typename: "BranchData",
            },
            __typename: "WorkshopRequest",
        },
    ];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},
							${y + height} ${x + width / 2},
							${y + height / 3}
						${x + width / 2}, 
						${y}
						C${x + width / 2},
						${y + height / 3} ${x + (2 * width) / 3},
						${y + height} ${x + width}, ${y + height}
						Z`;
    };

    const RectangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <rect x={x} y={y} width={width} height={height} rx="5" ry="5" fill={fill} />;
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="title flex justify-between h-14">
                <Breadcrumbs />
                <div className="flex gap-4">
                    <button className="flex items-center gap-3 rounded-xl py-4 px-3 border border-borderColor bg-primaryLight">
                        <FilterIcon className="text-light" />
                        <span className=" text-lg">Add Filters</span>
                        <PlusIcon className="text-light" />
                    </button>
                    <button className="flex items-center gap-3 rounded-xl py-4 px-3 border border-borderColor bg-primaryLight">
                        <FilterIcon className="text-light" />
                        <span className=" text-lg">Add Filters</span>
                        <PlusIcon className="text-light" />
                    </button>
                </div>
            </div>

            <div className="pie-charts grid grid-cols-4 gap-4">
                <div className=" border rounded-xl border-borderColor shadow-md py-6 px-4 flex justify-between">
                    <div className="flex flex-col gap-3">
                        <span className="text-mediumGray text-sm font-semibold text-mediumBold">
                            Workspace Revenue
                        </span>
                        <span className=" text-2xl text-primary">SAR 20.4K</span>
                        <span className=" text-xs text-light">We had 150 Chairs Bookings</span>
                    </div>
                    <ResponsiveContainer width="50%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={20}
                                outerRadius={40}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className=" border rounded-xl border-borderColor shadow-md py-6 px-4 flex justify-between">
                    <div className="flex flex-col gap-3">
                        <span className="text-mediumGray text-sm font-semibold text-mediumBold">
                            Workspace Revenue
                        </span>
                        <span className=" text-2xl text-primary">SAR 20.4K</span>
                        <span className=" text-xs text-light">We had 150 Chairs Bookings</span>
                    </div>
                    <ResponsiveContainer width="50%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={20}
                                outerRadius={40}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className=" border rounded-xl border-borderColor shadow-md py-6 px-4 flex justify-between">
                    <div className="flex flex-col gap-3">
                        <span className="text-mediumGray text-sm font-semibold text-mediumBold">
                            Workspace Revenue
                        </span>
                        <span className=" text-2xl text-primary">SAR 20.4K</span>
                        <span className=" text-xs text-light">We had 150 Chairs Bookings</span>
                    </div>
                    <ResponsiveContainer width="50%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={20}
                                outerRadius={40}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className=" border rounded-xl border-borderColor shadow-md py-6 px-4 flex justify-between">
                    <div className="flex flex-col gap-3">
                        <span className="text-mediumGray text-sm font-semibold text-mediumBold">
                            Workspace Revenue
                        </span>
                        <span className=" text-2xl text-primary">SAR 20.4K</span>
                        <span className=" text-xs text-light">We had 150 Chairs Bookings</span>
                    </div>
                    <ResponsiveContainer width="50%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={20}
                                outerRadius={40}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="total-revenue  border rounded-xl border-borderColor shadow-md py-6 px-4 flex flex-col">
                <span className="text-xl text-mediumGray">Total Revenue</span>
                <div className="flex gap-5 items-center ">
                    <span className="text-xl text-dark">SAR 170.8K</span>
                    <span className="text-xs text-primary">5% than last month</span>
                </div>
                <ResponsiveContainer width="100%" height={600}>
                    <BarChart
                        width={500}
                        height={300}
                        data={barChartData}
                        margin={{
                            top: 36,
                            bottom: 36,
                        }}>
                        <XAxis dataKey="name" axisLine={false} />
                        <YAxis axisLine={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#B0C478" shape={<RectangleBar />} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="latest-bookings flex flex-col gap-4 border rounded-xl border-borderColor shadow-md py-6 px-4 flex flex-col">
                <div className="flex justify-between items-center">
                    <span className="text-xl text-mediumGray">Latest Bookings</span>
                    <button className="rounded-xl py-2 px-3 flex gap-3 items-center border border-borderColor bg-primaryLight">
                        <span className="text-lg text-dark">View All</span>
                        <ChevronRight className="h-6 w-6 text-light" />
                    </button>
                </div>
                <div className="h-[1px] w-full border-t border-light"></div>
                <div className="border rounded-xl">
                    <TableContainer>
                        <Table variant="simple">
                            <Thead className="h-[60px]">
                                <Tr>
                                    <Th>Title</Th>
                                    <Th>Booking ID</Th>
                                    <Th>Date</Th>
                                    <Th>Requestee</Th>
                                    <Th>Cost</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {requestList.map((request, index) => (
                                    <Tr key={index}>
                                        <Td>{request.name}</Td>
                                        <Td>
                                            name
                                            {/* {request.requestee.name}  */}
                                        </Td>
                                        <Td>
                                            numberOfSeats
                                            {/* {request.numberOfSeats} */}
                                        </Td>
                                        <Td>date enter karwao </Td>

                                        <Td>SAR 50</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
