import { useState, useEffect, useMemo } from 'react';

import ToggleButton from 'react-toggle-button';
import Modal from 'react-modal';
import '../../css/react-modal.css';

import InputDropdown from '../InputDropdown';

const dafaultOpeningData = [
    { day: 'จันทร์', opening: false, openHour: '00', openMinute: '00', closeHour: '23', closeMinute: '59' },
    { day: 'อังคาร', opening: false, openHour: '00', openMinute: '00', closeHour: '23', closeMinute: '59' },
    { day: 'พุธ', opening: false, openHour: '00', openMinute: '00', closeHour: '23', closeMinute: '59' },
    { day: 'พฤหัสบดี', opening: false, openHour: '00', openMinute: '00', closeHour: '23', closeMinute: '59' },
    { day: 'ศุกร์', opening: false, openHour: '00', openMinute: '00', closeHour: '23', closeMinute: '59' },
    { day: 'เสาร์', opening: false, openHour: '00', openMinute: '00', closeHour: '23', closeMinute: '59' },
    { day: 'อาทิตย์', opening: false, openHour: '00', openMinute: '00', closeHour: '23', closeMinute: '59' },
];

const hourListGenerater = (startHour = 0, endHour = 23) => {
    let list = [];
    while (startHour <= endHour) {
        list.push(startHour.toString().padStart(2, '0'));
        startHour += 1;
    }
    return list;
};

const minuteListGenerater = (startMinute = 0, endMinute = 59) => {
    let list = [];
    while (startMinute <= endMinute) {
        list.push(startMinute.toString().padStart(2, '0'));
        startMinute += 1;
    }
    return list;
};

const InputOpeningStore = ({ initOpeningData, msgOpeningNull, onOpeningNullChange = () => {}, onOpeningDataChange = () => {} }) => {
    /* Fix Shallow copy - create new array and copy*/
    const [openingData, setOpeningData] = useState(() => {
        if (initOpeningData) {
            return initOpeningData.map((element) => {
                return { ...element };
            });
        }
        return undefined;
    });
    /* Fix useEffect not recognize array state change*/
    const [countOpeningDataChange, setCountOpeningDataChange] = useState(0);

    /* Fix Shallow copy - create new array and copy */
    const [tempOpeningData, setTempOpeningData] = useState(() => {
        if (openingData) {
            return openingData.map((element) => {
                return { ...element };
            });
        }
        return dafaultOpeningData;
    });
    /* Fix useEffect not recognize array state change*/
    const [countTempOpeningDataChange, setCountTempOpeningDataChange] = useState(0);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const isNull = useMemo(() => {
        return !openingData;
    }, [openingData]);

    useEffect(() => {
        onOpeningDataChange(openingData);
    }, [countOpeningDataChange]);

    useEffect(() => {
        onOpeningNullChange(isNull);
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
                {isNull && <p>{msgOpeningNull}</p>}
                {!isNull && (
                    <div className="flex flex-col justify-center text-sm">
                        {openingData.map((value) => {
                            return (
                                <p className={`${value.opening ? 'text-green-400' : 'text-red-400'}`}>
                                    {value.day} :
                                    {value.opening ? `${value.openHour}:${value.openMinute} - ${value.closeHour}:${value.closeMinute}` : 'ปิด'}
                                </p>
                            );
                        })}
                    </div>
                )}
            </button>

            <Modal
                contentLabel="OpeningStoreInput-Modal"
                isOpen={modalIsOpen}
                closeTimeoutMS={300}
                onRequestClose={() => {
                    setModalIsOpen(false);
                }}
                style={{
                    overlay: {
                        position: 'fixed',
                        height: '100vh',
                        width: '100vw',
                        margin: 'auto',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    },
                    content: {
                        minWidth: 'max-content',
                    },
                }}
                ariaHideApp={false}
            >
                <div className="flex flex-col w-full h-full justify-center items-center">
                    <div className="flex flex-col justify-center items-center w-full h-full ">
                        <table className="table-fixed text-lg">
                            {tempOpeningData.map((value, index) => {
                                return (
                                    <tr>
                                        <td className="w-32 py-4">{value.day}</td>
                                        <td className="w-24">
                                            <InputDropdown
                                                id={`InputDropdown-openHour-${index}`}
                                                name="openHour"
                                                disabled={!tempOpeningData[index].opening}
                                                optionList={hourListGenerater()}
                                                selectedIndex={hourListGenerater().indexOf(tempOpeningData[index].openHour)}
                                                onValueChange={(state) => {
                                                    setTempOpeningData((currentState) => {
                                                        currentState[index].openHour = state;
                                                        return currentState;
                                                    });
                                                    setCountTempOpeningDataChange(countTempOpeningDataChange + 1);
                                                }}
                                            />
                                        </td>
                                        <td className="w-6 text-center font-bold"> : </td>
                                        <td className="w-24">
                                            <InputDropdown
                                                id={`InputDropdown-openMinute-${index}`}
                                                name="openMinute"
                                                disabled={!tempOpeningData[index].opening}
                                                optionList={minuteListGenerater()}
                                                selectedIndex={minuteListGenerater().indexOf(tempOpeningData[index].openMinute)}
                                                onValueChange={(state) => {
                                                    setTempOpeningData((currentState) => {
                                                        currentState[index].openMinute = state;
                                                        return currentState;
                                                    });
                                                    setCountTempOpeningDataChange(countTempOpeningDataChange + 1);
                                                }}
                                            />
                                        </td>
                                        <td className="w-12 text-center font-bold"> - </td>
                                        <td className="w-24">
                                            <InputDropdown
                                                id={`InputDropdown-closeHour-${index}`}
                                                name="closeHour"
                                                disabled={!tempOpeningData[index].opening}
                                                optionList={hourListGenerater()}
                                                selectedIndex={hourListGenerater().indexOf(tempOpeningData[index].closeHour)}
                                                onValueChange={(state) => {
                                                    setTempOpeningData((currentState) => {
                                                        currentState[index].closeHour = state;
                                                        return currentState;
                                                    });
                                                    setCountTempOpeningDataChange(countTempOpeningDataChange + 1);
                                                }}
                                            />
                                        </td>
                                        <td className="w-6 text-center font-bold"> : </td>
                                        <td className="w-24">
                                            <InputDropdown
                                                id={`InputDropdown-closeMinute-${index}`}
                                                name="closeMinute"
                                                disabled={!tempOpeningData[index].opening}
                                                optionList={minuteListGenerater()}
                                                selectedIndex={minuteListGenerater().indexOf(tempOpeningData[index].closeMinute)}
                                                onValueChange={(state) => {
                                                    setTempOpeningData((currentState) => {
                                                        currentState[index].closeMinute = state;
                                                        return currentState;
                                                    });
                                                    setCountTempOpeningDataChange(countTempOpeningDataChange + 1);
                                                }}
                                            />
                                        </td>
                                        <td className="w-36">
                                            <div className="ml-auto w-24">
                                                <ToggleButton
                                                    activeLabel=""
                                                    inactiveLabel=""
                                                    value={tempOpeningData[index].opening}
                                                    onToggle={(state) => {
                                                        setTempOpeningData((currentState) => {
                                                            currentState[index].opening = !state;
                                                            return currentState;
                                                        });
                                                        setCountTempOpeningDataChange(countTempOpeningDataChange + 1);
                                                    }}
                                                    colors={{
                                                        activeThumb: {
                                                            base: '#F3F4F6',
                                                        },
                                                        inactiveThumb: {
                                                            base: '#F3F4F6',
                                                        },
                                                        active: {
                                                            base: '#34D399',
                                                            hover: '#6EE7B7',
                                                        },
                                                        inactive: {
                                                            base: '#D1D5DB',
                                                            hover: '#9CA3AF',
                                                        },
                                                    }}
                                                    thumbAnimateRange={[2, 32]}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                    <div className="flex flex-row ml-auto mt-auto space-x-2">
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
                            className="w-24 p-2 text-white rounded-lg focus:outline-none bg-green-500 hover:bg-green-800 "
                            type="button"
                            onClick={() => {
                                setOpeningData(tempOpeningData);
                                setCountOpeningDataChange(countOpeningDataChange + 1);
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

export default InputOpeningStore;
