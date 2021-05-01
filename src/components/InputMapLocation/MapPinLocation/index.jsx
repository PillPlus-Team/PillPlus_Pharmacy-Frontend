import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';

import mapStyles from './config/mapStyles';

const libraries = ['places'];
const initCenter = { lat: 13.729753400894694, lng: 100.77806063628931 };

const Locate = ({ panTo, onGetLocation = () => {} }) => {
    return (
        <button
            className="flex p-2 text-black border-2 border-gray-300 rounded-lg focus:outline-none min-w-min hover:bg-gray-200 active:bg-gray-100"
            onClick={() => {
                navigator.geolocation.getCurrentPosition((position) => {
                    panTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    onGetLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                });
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
            </svg>

            <p className="ml-1">ตำแหน่งของฉัน</p>
        </button>
    );
};

const Search = ({ panTo }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({});

    const handleInput = (event) => {
        console.log({ status, data });
        setValue(event.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    return (
        <div>
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    className="w-96 px-2 py-2 text-gray-500 border-b-2 border-gray-500 placeholder-gray-400 rounded-t-md focus:outline-none focus:border-gray-400 focus:bg-gray-100 hover:border-gray-400 hover:bg-gray-100"
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="ค้นหา"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === 'OK' && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
};

const MapPinLocation = ({ initLocation = { lat: 13.729753400894694, lng: 100.77806063628931 }, onLocationChange = () => {} }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBcyS0VEgAbAzAHQYprx3ycMwkmfg7noxE',
        libraries,
    });

    const [location, setLocation] = useState(initLocation);

    const onMapClick = React.useCallback((event) => {
        setLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    useEffect(() => {
        onLocationChange(location);
    }, [location]);

    if (loadError) return 'เกิดข้อผิดพลาด';
    if (!isLoaded) return 'กำลังโหลด ...';

    return (
        <div className="flex flex-col justify-center items-center w-full h-full ">
            <div className="flex flex-col md:flex-row justify-between items-center w-10/12 mb-4 space-y-2 md:space-x-2">
                <Locate
                    panTo={panTo}
                    onGetLocation={(location) => {
                        setLocation(location);
                    }}
                />
                <Search panTo={panTo} />
            </div>
            s
            <GoogleMap
                id="map"
                mapContainerClassName="w-10/12 h-5/6 rounded-lg shadow-md"
                zoom={14}
                center={initCenter}
                options={{
                    styles: mapStyles,
                    disableDefaultUI: true,
                    zoomControl: true,
                }}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                <Marker
                    key={`${location.lat}-${location.lng}`}
                    position={{ lat: location.lat, lng: location.lng }}
                    icon={{
                        url: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(30, 30),
                    }}
                />
            </GoogleMap>
        </div>
    );
};

export default MapPinLocation;
