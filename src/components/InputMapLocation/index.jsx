import { useState, useEffect } from 'react';

import Modal from 'react-modal';
import '../../css/react-modal.css';

import MapPinLocation from './MapPinLocation';

const InputMapLocation = ({ initMapLocation = { lat: null, lng: null }, onValidChange = () => {}, onMapLocationChange = () => {} }) => {
    const [mapLocation, setMapLocation] = useState(initMapLocation);
    const [tempMapLocation, setTempMapLocation] = useState(mapLocation);

    const [isValid, setIsValid] = useState(mapLocation.lat && mapLocation.lng);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const canConfirm = tempMapLocation.lat && tempMapLocation.lng;

    const validation = () => {
        if (!(mapLocation.lat && mapLocation.lng)) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    };

    useEffect(() => {
        onMapLocationChange(mapLocation);
        validation();
    }, [mapLocation]);

    useEffect(() => {
        onValidChange(isValid);
    }, [isValid]);

    return (
        <>
            <button
                className={`w-full p-2 bg-white border-2 rounded-lg focus:outline-none ${
                    isValid ? 'text-green-500 border-2 border-green-500 hover:bg-green-100 ' : 'text-red-500  border-red-500 hover:bg-red-100 '
                }`}
                type="button"
                onClick={() => {
                    setModalIsOpen(true);
                }}
            >
                {!isValid && 'โปรดเลือกตำเเหน่งร้าน'}
                {isValid && (
                    <div className="flex flex-row justify-center space-x-2 text-green-400 ">
                        <p>LAT : {Number(mapLocation.lat).toLocaleString('th-TH', { minimumFractionDigits: 5 })}</p>
                        <p>LNT : {Number(mapLocation.lng).toLocaleString('th-TH', { minimumFractionDigits: 5 })}</p>
                    </div>
                )}
            </button>

            <Modal
                contentLabel="MapLocationInput-Modal"
                isOpen={modalIsOpen}
                onRequestClose={() => {
                    setModalIsOpen(false);
                }}
            >
                <div className="flex flex-col w-full h-full justify-center items-center">
                    <MapPinLocation
                        initLocation={mapLocation}
                        onLocationChange={(location) => {
                            setTempMapLocation(location);
                        }}
                    />

                    <div className="flex flex-row ml-auto mt-4 space-x-2">
                        <button
                            className="w-24 p-2 bg-gray-500 text-white rounded-lg focus:outline-none hover:bg-gray-400"
                            type="button"
                            onClick={() => {
                                setModalIsOpen(false);
                            }}
                        >
                            ยกเลิก
                        </button>
                        <button
                            className={`w-24 p-2 text-white rounded-lg focus:outline-none  ${
                                canConfirm ? 'bg-green-500 hover:bg-green-800' : 'bg-gray-300 cursor-not-allowed'
                            }`}
                            type="button"
                            disabled={!canConfirm}
                            onClick={() => {
                                setMapLocation(tempMapLocation);
                                setModalIsOpen(false);
                            }}
                        >
                            ยืนยัน
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default InputMapLocation;
