import "./NavBar.css";

import { Link, useLocation } from "react-router-dom";

import React from "react";

function NavBar() {
    const location = useLocation();
    console.log("location", location);

    function selected(route) {
        if (route === location.pathname) {
            console.log("");
            return true;
        } else {
            console.log();
            return false;
        }
    }

    return (
        <nav className="nav-panel col-span-1 flex flex-col gap-6 py-8 px-3 text-lg">
            <Link className={selected("/branches") ? "navButtonSelected" : "navButton"} to="/branches">
                Branches
            </Link>
            <div>
                <div
                    className={
                        selected("/workshops/all") || selected("/workshops/requests")
                            ? "navButtonSelected"
                            : "navButton"
                    }
                    to="/workshops/all">
                    Workshops
                </div>
                <div className="flex flex-col px-6">
                    <Link className="navButton" to="/workshops/requests">
                        Requests
                    </Link>
                    <Link className="navButton" to="/workshops/all">
                        All
                    </Link>
                </div>
            </div>

            <Link
                className={selected("/meeting-rooms") ? "navButtonSelected" : "navButton"}
                to="/meeting-rooms">
                Rooms
            </Link>
            <Link className={selected("/workspaces") ? "navButtonSelected" : "navButton"} to="/workspaces">
                Workspaces
            </Link>

            <Link className={selected("") ? "navButtonSelected" : "navButton"} to="/about">
                Nurseries
            </Link>
            <Link className={selected("") ? "navButtonSelected" : "navButton"} to="/about">
                Users
            </Link>
            <Link className={selected("") ? "navButtonSelected" : "navButton"} to="/about">
                Coupons
            </Link>
            <Link className={selected("") ? "navButtonSelected" : "navButton"} to="/about">
                Announcement
            </Link>
            <Link className={selected("") ? "navButtonSelected" : "navButton"} to="/about">
                Information
            </Link>
            <Link className={selected("") ? "navButtonSelected" : "navButton"} to="/about">
                Dashboard
            </Link>
            <Link className={selected("") ? "navButtonSelected" : "navButton"} to="/about">
                Complaints
            </Link>
        </nav>
    );
}

export default NavBar;
