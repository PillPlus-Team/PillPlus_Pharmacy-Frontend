import { useState, useEffect, useMemo } from 'react';

import Modal from 'react-modal';
import '../../css/react-modal.css';

import MapPinLocation from './MapPinLocation';

const InputCoordinate = ({ initCoordinate, msgCoordinateNull, onCoordinateNullChange = () => {}, onCoordinateChange = () => {} }) => {
    const [coordinate, setCoordinate] = useState(initCoordinate);
    const [tempCoordinate, setTempCoordinate] = useState(coordinate);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const isNull = useMemo(() => {
        return !coordinate;
    }, [coordinate]);

    useEffect(() => {
        onCoordinateChange(coordinate);
    }, [coordinate]);

    useEffect(() => {
        onCoordinateNullChange(isNull);
    }, [isNull]);

    return (
        <>
            <button
                className={`w-full p-2 bg-white border-2 rounded-lg focus:outline-none ${
                    isNull ? 'text-red-500  border-red-500 hover:bg-red-100 ' : 'text-green-500 border-2 border-green-500 hover:bg-green-100 '
                }`}
                type="button"
                onClick={() => {
                    setModalIsOpen(true);
                }}
            >
                {isNull && <p>{msgCoordinateNull}</p>}
                {!isNull && (
                    <div className="flex flex-row justify-center space-x-2 text-green-400 ">
                        <p>LAT : {Number(coordinate.lat).toLocaleString('th-TH', { minimumFractionDigits: 5 })}</p>
                        <p>LNT : {Number(coordinate.lng).toLocaleString('th-TH', { minimumFractionDigits: 5 })}</p>
                    </div>
                )}
            </button>

            <Modal
                contentLabel="CoordinateInput-Modal"
                isOpen={modalIsOpen}
                closeTimeoutMS={300}
                onRequestClose={() => {
                    setModalIsOpen(false);
                }}
                style={{
                    overlay: {
                        display: 'flex',
                        position: 'fixed',
                        height: '100vh',
                        width: '100vw',
                        margin: 'auto',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    },
                }}
                ariaHideApp={false}
            >
                <div className="flex flex-col w-full h-full justify-center items-center">
                    <MapPinLocation
                        initLocation={coordinate}
                        onLocationChange={(location) => {
                            setTempCoordinate(location);
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
                                tempCoordinate ? 'bg-green-500 hover:bg-green-800' : 'bg-gray-300 cursor-not-allowed'
                            }`}
                            type="button"
                            disabled={!tempCoordinate}
                            onClick={() => {
                                setCoordinate(tempCoordinate);
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
export default InputCoordinate;
