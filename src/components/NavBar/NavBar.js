import "./NavBar.css";

import { ReactComponent as UserIcon } from "../../assets/UserIcon.svg";
import { ReactComponent as AnnouncementIcon } from "../../assets/AnnouncementIcon.svg";
import { ReactComponent as BranchesIcon } from "../../assets/BranchesIcon.svg";
import { ReactComponent as ComplaintsIcon } from "../../assets/ComplaintsIcon.svg";
import { ReactComponent as CouponsIcon } from "../../assets/CouponsIcon.svg";
import { ReactComponent as DashboardIcon } from "../../assets/DashboardIcon.svg";
import { ReactComponent as InformationIcon } from "../../assets/InformationIcon.svg";
import { ReactComponent as NurseryIcon } from "../../assets/NurseryIcon.svg";
import { ReactComponent as RoomsIcon } from "../../assets/RoomsIcon.svg";
import { ReactComponent as WorkshopIcon } from "../../assets/WorkshopIcon.svg";
import { ReactComponent as WorkspacesIcon } from "../../assets/WorkspacesIcon.svg";

import { Link, useLocation } from "react-router-dom";

import React from "react";

function NavBar() {
    const location = useLocation();
    //  console.log("location", location);

    function selected(route) {
        if (location.pathname.includes(route)) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <nav className="nav-panel border-r border-borderColor col-span-1 flex flex-col gap-6 py-8 px-3 text-lg h-fit">
            <Link className={selected("/branches") ? "navButtonSelected" : "navButton"} to="/branches">
                <BranchesIcon className={selected("/branches") ? "navIconSelected" : "navIcon"} />
                <span>Branches</span>
            </Link>

            <div>
                <div className="navButton mb-4">
                    <WorkshopIcon className="navIcon" />
                    Workshops
                </div>
                <div className="flex flex-col pl-10 gap-2">
                    <Link
                        className={selected("/workshops/requests") ? "navButtonSelected" : "navButton"}
                        to="/workshops/requests">
                        <span>Requests</span>
                    </Link>

                    <Link
                        className={selected("/workshops/all") ? "navButtonSelected" : "navButton"}
                        to="/workshops/all">
                        <span> All</span>
                    </Link>
                </div>
            </div>

            <Link
                className={selected("/meeting-rooms") ? "navButtonSelected" : "navButton"}
                to="/meeting-rooms">
                <RoomsIcon className={selected("/meeting-rooms") ? "navIconSelected" : "navIcon"} />
                <span>Rooms</span>
            </Link>

            <Link className={selected("/workspaces") ? "navButtonSelected" : "navButton"} to="/workspaces">
                <WorkspacesIcon className={selected("/workspaces") ? "navIconSelected" : "navIcon"} />
                <span>Workspaces</span>
            </Link>

            <Link className={selected("/nurseries") ? "navButtonSelected" : "navButton"} to="/nurseries">
                <NurseryIcon className={selected("/nurseries") ? "navIconSelected" : "navIcon"} />
                <span>Nurseries</span>
            </Link>

            <Link className={selected("/users") ? "navButtonSelected" : "navButton"} to="/users">
                <UserIcon className={selected("/users") ? "navIconSelected" : "navIcon"} />
                <span>Users</span>
            </Link>

            <Link className={selected("/about") ? "navButtonSelected" : "navButton"} to="/about">
                <CouponsIcon className={selected("/about") ? "navIconSelected" : "navIcon"} />
                <span>Coupons</span>
            </Link>

            <Link
                className={selected("/announcement") ? "navButtonSelected" : "navButton"}
                to="/announcement">
                <AnnouncementIcon className={selected("/announcement") ? "navIconSelected" : "navIcon"} />
                <span>Announcement</span>
            </Link>

            <Link
                className={selected("/info-management") ? "navButtonSelected" : "navButton"}
                to="/info-management">
                <InformationIcon className={selected("/info-management") ? "navIconSelected" : "navIcon"} />
                <span>Information</span>
            </Link>

            <Link className={selected("/dashboard") ? "navButtonSelected" : "navButton"} to="/dashboard">
                <DashboardIcon className={selected("/dashboard") ? "navIconSelected" : "navIcon"} />
                <span>Dashboard</span>
            </Link>

            <Link className={selected("/complaints") ? "navButtonSelected" : "navButton"} to="/complaints">
                <ComplaintsIcon className={selected("/complaints") ? "navIconSelected" : "navIcon"} />
                <span>Complaints</span>
            </Link>
        </nav>
    );
}

export default NavBar;
