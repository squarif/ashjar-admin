import "./App.css";
import MeetingRoomDetails from "./pages/MeetingRooms/MeetingRoomDetail/MeetingRoomDetail";
import MeetingRoomEdit from "./pages/MeetingRooms/MeetingRoomEdit/MeetingRoomEdit";
import MeetingRoomsListing from "./pages/MeetingRooms/MeetingRoomListing/MeetingRoomsListing";
import MeetingRoomNew from "./pages/MeetingRooms/MeetingRoomNew/MeetingRoomNew";
// import WorkshopDetails from "./pages/Workshop/WorkshopDetails/WorkshopDetails";
import WorkshopListing from "./pages/Workshops/WorkshopListing/WorkshopListing";
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@chakra-ui/react";
// import { Input } from "@chakra-ui/react";
// import Branches from "./pages/branches/Branches";

import { ReactComponent as ChevronRight } from "./assets/ChevronRight.svg";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

import { ReactComponent as AshjarLogo } from "./assets/AshjarLogo.svg";

import WorkshopRequests from "./pages/WorkshopRequests/workshopRequestsListing/WorkshopRequestsListing";

import { Link, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import WorkshopDetails from "./pages/Workshops/WorkshopDetails/WorkshopDetails";
import React, { useEffect, useRef } from "react";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./auth/firebase/config";

import Branches from "./pages/Branches/Branches";
import BranchDetail from "./pages/Branches/BranchDetail";
import NewBranch from "./pages/Branches/NewBranch";
import WorkshopCreatePost from "./pages/WorkshopRequests/workshopRequestCreate/WorkshopCreatePost";
import WorkspaceListing from "./pages/Workspaces/WorkspaceListing/WorkspaceListing";
import WorkspaceDetail from "./pages/Workspaces/WorkspaceDetail/WorkspaceDetail";
import WorkspaceEdit from "./pages/Workspaces/WorkspaceEdit/WorkspaceEdit";
import WorkspaceNew from "./pages/Workspaces/WorkspaceNew/WorkspaceNew";
import NavBar from "./components/NavBar/NavBar";
import Breadcrumbs from "./components/Breadcrumbs";

function App() {
    let user = useRef();

    useEffect(() => {
        // Retrieve the user object from localStorage and parse it as JSON
        const userData = localStorage.getItem("user");

        // console.log("session data", localStorage);
        // console.log("user data", userData);
        const parsedUser = JSON.parse(userData);

        // Assign the parsed user object to the useRef
        user.current = parsedUser;

        // console.log("getItem user", user.current);
    }, []); // Empty dependency array for running the effect once on mount

    async function handleSignIn() {
        // console.log("auth");

        user = await signInWithEmailAndPassword(auth, "aliadnanarif25@gmail.com", "ALOHOMORA!!!")
            .then((userCredential) => {
                // Signed in
                // console.log("userCredential", userCredential);

                user = userCredential.user;
                localStorage.setItem("user", JSON.stringify(user));
                // ...
                return user;
            })
            .catch((error) => {
                console.log("error", error);
                // const errorCode = error.code;
                // const errorMessage = error.message;
                return null;
            });

        console.log("user", user);
    }

    return (
        <div className="">
            <div className="header border-b px-6 py-4 flex justify-between items-center ">
                <div className="flex gap-2 items-end">
                    <AshjarLogo />
                    <span className="text-[#AF8465] text-[32px] font-Adam leading-none">Ashjar</span>
                </div>

                {user.current ? (
                    <div className=" p-3 border rounded-xl bg-primaryLight text-primary">
                        {user.current.email}
                    </div>
                ) : (
                    <button
                        onClick={() => handleSignIn()}
                        className="p-3 border rounded-xl bg-primaryLight text-primary">
                        Sign In
                    </button>
                )}
            </div>
            <div className="app-container grid grid-cols-7  font-Adam">
                <Router>
                    <NavBar />

                    <div className="body col-span-6 p-12">
                        <Routes>
                            <Route path="/" element={<MeetingRoomNew />} />

                            <Route path="/branches" element={<Branches />} />
                            <Route path="/branches/:id" element={<BranchDetail />} />
                            <Route path="/branches/new" element={<NewBranch />} />

                            <Route path="/meeting-rooms" element={<MeetingRoomsListing />} />
                            <Route path="/meeting-rooms/:id" element={<MeetingRoomDetails />} />
                            <Route path="/meeting-rooms/new" element={<MeetingRoomNew />} />

                            <Route path="/workshops/requests" element={<WorkshopRequests />} />
                            <Route path="/workshops/requests/create-post" element={<WorkshopCreatePost />} />

                            <Route path="/workshops/all" element={<WorkshopListing />} />
                            <Route path="/workshops/:id" element={<WorkshopDetails />} />

                            {/* <Route path="/create-post" element={<CreatePost />} /> */}

                            <Route path="/meeting-rooms" element={<MeetingRoomsListing />} />
                            <Route path="/meeting-rooms/:id" element={<MeetingRoomDetails />} />
                            <Route path="/meeting-rooms/:id/edit" element={<MeetingRoomEdit />} />
                            <Route path="/meeting-rooms/new" element={<MeetingRoomNew />} />

                            <Route path="/workspaces" element={<WorkspaceListing />} />
                            <Route path="/workspaces/:id" element={<WorkspaceDetail />} />
                            <Route path="/workspaces/:id/edit" element={<WorkspaceEdit />} />
                            <Route path="/workspaces/new" element={<WorkspaceNew />} />
                        </Routes>
                    </div>
                </Router>
            </div>
        </div>
    );
}

export default App;
