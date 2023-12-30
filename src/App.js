import "./App.css";

import { ReactComponent as AshjarLogo } from "./assets/AshjarLogo.svg";
import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";

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
import NurseryListing from "./pages/Nurseries/NurseryListing/NurseryListing";
import NurseryDetails from "./pages/Nurseries/NurseryDetail/NurseryDetail";
import NurseryNew from "./pages/Nurseries/NurseryNew/NurseryNew";
import NurseryEdit from "./pages/Nurseries/NurseryEdit/NurseryEdit";
import Users from "./pages/Users/Users";
import InformationManagement from "./pages/InformationManagement/InformationManagement";
import AnnouncementPage from "./pages/AnnouncementPage/AnnouncementPage";
import Complaints from "./pages/Complaints/Complaints";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import SignIn from "./pages/SignIn/SignIn";
import MeetingRoomDetails from "./pages/MeetingRooms/MeetingRoomDetail/MeetingRoomDetail";
import MeetingRoomEdit from "./pages/MeetingRooms/MeetingRoomEdit/MeetingRoomEdit";
import MeetingRoomsListing from "./pages/MeetingRooms/MeetingRoomListing/MeetingRoomsListing";
import MeetingRoomNew from "./pages/MeetingRooms/MeetingRoomNew/MeetingRoomNew";
import WorkshopListing from "./pages/Workshops/WorkshopListing/WorkshopListing";
import WorkshopRequests from "./pages/WorkshopRequests/workshopRequestsListing/WorkshopRequestsListing";
import WorkshopDetails from "./pages/Workshops/WorkshopDetails/WorkshopDetails";

import PrivateRoute from "./auth/components/privateRoute";
import { useRecoilStateCallback } from "./hooks";
import { userAtom } from "./recoil/atoms";
import BranchEdit from "./pages/Branches/BranchEdit";
import CouponsPage from "./pages/Coupons/CouponsPage";
import Bookings from "./pages/BookingsPage/BookingsPage";
import WorkshopEditPost from "./pages/Workshops/WorkshopEdit/WorkshopEdit";

function App() {
    const [userA, setUserAtom] = useRecoilStateCallback(userAtom);
    const navigator = useNavigate();

    return (
        <div className="">
            <div className="header border-b border-borderColor px-6 py-4 flex justify-between items-center ">
                <div className="flex gap-2 items-end">
                    <AshjarLogo />
                    <span className="text-[#AF8465] text-[32px] font-Adam leading-none">Ashjar</span>
                </div>

                {userA ? (
                    <button
                        onClick={() => {
                            auth.signOut();
                            localStorage.setItem("user", JSON.stringify(null));
                            localStorage.setItem("token", JSON.stringify(null));
                            setUserAtom(null);
                            navigator("/login");
                        }}
                        className="p-3 border rounded-xl bg-primaryLight text-primary">
                        Sign Out
                    </button>
                ) : (
                    <button
                        // onClick={() => handleSignIn()}
                        className="p-3 border rounded-xl bg-primaryLight text-primary">
                        Sign In
                    </button>
                )}
            </div>
            <div className="app-container grid grid-cols-7 font-Adam">
                {userA ? <NavBar /> : ""}

                <div className="body col-span-6 p-12 h-[calc(100vh-80px)] ">
                    <Routes>
                        <Route path="/login" element={<SignIn />} />

                        <Route
                            path="/branches"
                            element={
                                <PrivateRoute redirect="/login">
                                    <Branches />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/branches/:id"
                            element={
                                <PrivateRoute redirect="/login">
                                    <BranchDetail />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/branches/:id/edit"
                            element={
                                <PrivateRoute redirect="/login">
                                    <BranchEdit />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/branches/new"
                            element={
                                <PrivateRoute redirect="/login">
                                    <NewBranch />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/meeting-rooms"
                            element={
                                <PrivateRoute redirect="/login">
                                    <MeetingRoomsListing />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/meeting-rooms/:id"
                            element={
                                <PrivateRoute redirect="/login">
                                    <MeetingRoomDetails />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/meeting-rooms/new"
                            element={
                                <PrivateRoute redirect="/login">
                                    <MeetingRoomNew />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/workshops/requests"
                            element={
                                <PrivateRoute redirect="/login">
                                    <WorkshopRequests />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/workshops/requests/create-post"
                            element={
                                <PrivateRoute redirect="/login">
                                    <WorkshopCreatePost />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/workshops/all"
                            element={
                                <PrivateRoute redirect="/login">
                                    <WorkshopListing />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/workshops/:id"
                            element={
                                <PrivateRoute redirect="/login">
                                    <WorkshopDetails />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/workshops/:id/edit"
                            element={
                                <PrivateRoute redirect="/login">
                                    <WorkshopEditPost />
                                </PrivateRoute>
                            }
                        />

                        {/* <Route path="/create-post" element={<PrivateRoute redirect="/login"><CreatePost />} /></PrivateRoute> */}

                        <Route
                            path="/meeting-rooms"
                            element={
                                <PrivateRoute redirect="/login">
                                    <MeetingRoomsListing />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/meeting-rooms/:id"
                            element={
                                <PrivateRoute redirect="/login">
                                    <MeetingRoomDetails />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/meeting-rooms/:id/edit"
                            element={
                                <PrivateRoute redirect="/login">
                                    <MeetingRoomEdit />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/meeting-rooms/new"
                            element={
                                <PrivateRoute redirect="/login">
                                    <MeetingRoomNew />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/workspaces"
                            element={
                                <PrivateRoute redirect="/login">
                                    <WorkspaceListing />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/workspaces/:id"
                            element={
                                <PrivateRoute redirect="/login">
                                    <WorkspaceDetail />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/workspaces/:id/edit"
                            element={
                                <PrivateRoute redirect="/login">
                                    <WorkspaceEdit />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/workspaces/new"
                            element={
                                <PrivateRoute redirect="/login">
                                    <WorkspaceNew />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/nurseries"
                            element={
                                <PrivateRoute redirect="/login">
                                    <NurseryListing />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/nurseries/:id"
                            element={
                                <PrivateRoute redirect="/login">
                                    <NurseryDetails />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/nurseries/new"
                            element={
                                <PrivateRoute redirect="/login">
                                    <NurseryNew />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/nurseries/:id/edit"
                            element={
                                <PrivateRoute redirect="/login">
                                    <NurseryEdit />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/users"
                            element={
                                <PrivateRoute redirect="/login">
                                    <Users />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/info-management"
                            element={
                                <PrivateRoute redirect="/login">
                                    <InformationManagement />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/announcement"
                            element={
                                <PrivateRoute redirect="/login">
                                    <AnnouncementPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/complaints"
                            element={
                                <PrivateRoute redirect="/login">
                                    <Complaints />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/coupons"
                            element={
                                <PrivateRoute redirect="/login">
                                    <CouponsPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute redirect="/login">
                                    <DashboardPage />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/dashboard/bookings"
                            element={
                                <PrivateRoute redirect="/login">
                                    <Bookings />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute redirect="/login">
                                    <DashboardPage />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
