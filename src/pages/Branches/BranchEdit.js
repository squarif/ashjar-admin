import { Button, Input, Spinner, useToast } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useRef, useState } from "react";

import { ReactComponent as MapsIcon } from "../../assets/MapsIcon.svg";

import { useMutation } from "@apollo/client";
import { UPDATE_BRANCH } from "../../queries/branchesQueries";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { branchData, branchesData } from "../../stores/branches";
import Maps from "../../components/Maps";
import { LoadScript, StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";

const MAP_LIBRARIES = ["places"];

function BranchEdit() {
    const { state } = useLocation();

    const [branchName, setBranchName] = useState(state.name);
    const [branchAddress, setbranchAddress] = useState(state.address);
    const [location, setLocation] = useState(state.location);
    const [locationName, setLocationName] = useState(JSON.parse(state.location).name);
    const [branches, setBranches] = useRecoilState(branchesData);
    const [branch, setBranch] = useRecoilState(branchData);

    const navigate = useNavigate();

    setBranch(state);

    console.log("state", state);
    console.log("location", JSON.parse(state.location));

    const toast = useToast();

    const [updateBranch, { data, loading, error }] = useMutation(UPDATE_BRANCH);
    async function handleUpdateBranch() {
        try {
            let payload = {
                _id: branch._id,
                name: branchName,
                address: branchAddress,
                location: JSON.stringify(location),
            };

            await updateBranch({
                mutation: UPDATE_BRANCH,
                variables: {
                    input: payload,
                },
            })
                .then((data) => {
                    let newBranches = [...branches, data.data.updateBranch];

                    setBranches(newBranches);

                    toast({
                        title: "Branch Created!",
                        status: "success",
                    });
                })
                .then(() => {
                    navigate("/branches");
                });
        } catch (error) {
            console.log(error);

            toast({
                title: "Error",
                description: error.message,
                status: "error",
            });
        }
    }

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyBWRimC90Mj6kSABtRjLPtbBQylm_XszkM",
        libraries: MAP_LIBRARIES,
    });

    const mapsRef = useRef(null);

    const onSearchBoxLoad = (ref) => {
        if (mapsRef.current) {
            mapsRef.current.onSearchBoxLoad(ref);
        } else {
            console.log("onSearchBoxLoad REF NF");
        }
    };

    const callOnPlacesChanged = () => {
        if (mapsRef.current) {
            mapsRef.current.onPlacesChanged();
        } else {
            console.log("callOnPlacesChanged REF NF");
        }
    };

    const onSetLocation = (value) => {
        console.log("onSetLocation", value);
        setLocation(value);
        setLocationName(value.name);
    };

    return (
        <div className="NewBranch">
            <Breadcrumbs />

            <div className="flex flex-col gap-16 ">
                <div className="flex justify-between items-center">
                    <div className="border rounded-xl w-[430px] border-light px-4">
                        <Input
                            value={branchName}
                            placeholder="Enter branch name"
                            className="py-6  text-dark text-[24px] leading-none"
                            onChange={(event) => setBranchName(event.target.value)}
                            variant="unstyled"
                        />
                    </div>

                    <button
                        onClick={handleUpdateBranch}
                        className="flex justify-center items-center gap-2 py-5 px-6 rounded-xl bg-primary">
                        {loading ? (
                            <Spinner color="white" className="" />
                        ) : (
                            <span className="text-white text-xl leading-6">Submit</span>
                        )}
                    </button>
                </div>
                <div className="relative shadow-md flex justify-between border rounded-2xl px-8 py-12 items-start ">
                    <div className="relative flex flex-col gap-6 items-start justify-center">
                        <span className="text-[32px] text-dark">Location</span>

                        {isLoaded && (
                            <StandaloneSearchBox
                                onLoad={onSearchBoxLoad}
                                onPlacesChanged={callOnPlacesChanged}>
                                <div className="border rounded-xl w-[430px] border-light px-4">
                                    <Input
                                        className="py-6  text-light text-[24px] leading-none"
                                        placeholder="Search for a place"
                                        variant="unstyled"
                                        type="text"
                                        value={locationName}
                                        onChange={(event) => setLocationName(event.target.value)}
                                    />
                                </div>
                            </StandaloneSearchBox>
                        )}

                        <div className="border rounded-xl w-[430px] border-light px-4">
                            <Input
                                value={branchAddress}
                                placeholder="Enter branch address"
                                className="py-5 text-dark text-[24px] leading-none"
                                onChange={(event) => setbranchAddress(event.target.value)}
                                variant="unstyled"
                            />
                        </div>
                    </div>

                    <div className="border rounded-xl w-[315px] h-[315px]">
                        <Maps
                            ref={mapsRef}
                            center={JSON.parse(state.location).location}
                            onSetLocation={(location) => onSetLocation(location)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BranchEdit;
