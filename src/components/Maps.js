import React, { forwardRef, useImperativeHandle, useState } from "react";
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from "@react-google-maps/api";

const MAP_LIBRARIES = ["places"];

const Maps = forwardRef((props, ref) => {
    const [map, setMap] = useState(null);
    const [searchBox, setSearchBox] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [center, setCenter] = useState(props.center);

    const onLoad = map => {
        setMap(map);
    };

    useImperativeHandle(ref, () => ({
        onPlacesChanged: onPlacesChanged,
        onSearchBoxLoad: onSearchBoxLoad,
    }));

    const onSearchBoxLoad = ref => {
        setSearchBox(ref);
    };

    const onPlacesChanged = () => {
        const places = searchBox.getPlaces();

        if (places?.length > 0) {
            const place = places[0];

            if (map && place.geometry) {
                setCenter(place.geometry.location);
                map.panTo(place.geometry.location);
                map.setZoom(14);
            }

            setSelectedPlace({
                name: place.name,
                location: place.geometry.location,
            });

            props.onSetLocation({
                name: place.name,
                location: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                },
            });
        }
    };

    const onMapClick = event => {
        if (props.onSetLocation) {
            const clickedLocation = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };

            setSelectedPlace({
                name: event.name ? event.name : "",
                location: clickedLocation,
            });

            props.onSetLocation({
                name: event.name ? event.name : "",
                location: clickedLocation,
            });
        }
    };

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: MAP_LIBRARIES,
    });
    // <LoadScript googleMapsApiKey="" libraries={[""]}>
    // </LoadScript>
    return (
        isLoaded && (
            <GoogleMap
                mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                }}
                zoom={10}
                center={center}
                options={{ streetViewControl: false }}
                onLoad={onLoad}
                onClick={onMapClick}
            >
                {selectedPlace && (
                    <Marker
                        position={selectedPlace.location}
                        onClick={() => setSelectedPlace(null)}
                    ></Marker>
                )}
            </GoogleMap>
        )
    );
});

export default Maps;
