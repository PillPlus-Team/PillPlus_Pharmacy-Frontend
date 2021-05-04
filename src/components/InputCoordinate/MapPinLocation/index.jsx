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
            className="flex absolute z-10 p-2 right-2.5 bottom-28 duration-500 ease-out transform hover:scale-150 focus:outline-none "
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
            <img className="w-6 h-6" src="/images/locate-image.png" />
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

const MapPinLocation = ({ initLocation = initCenter, onLocationChange = () => {} }) => {
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
        mapRef.current.panTo({
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
                <Search panTo={panTo} />
            </div>

            <GoogleMap
                id="map"
                mapContainerClassName="w-10/12 h-5/6 rounded-lg shadow-md"
                zoom={14}
                center={location}
                options={{
                    styles: mapStyles,
                    disableDefaultUI: true,
                    zoomControl: true,
                }}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                <Locate
                    panTo={panTo}
                    onGetLocation={(location) => {
                        setLocation(location);
                    }}
                />
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
