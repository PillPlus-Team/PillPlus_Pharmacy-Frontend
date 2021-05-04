import { useState, useEffect } from 'react';

const InputNumber = ({ id, name, initValue = '', min, max, step = 1, placeholder, required, onValidChange = () => {}, onValueChange = () => {} }) => {
    const [value, setValue] = useState(initValue);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessege] = useState('');

    const validation = () => {
        if (required && value === '') {
            setErrorMessege('โปรดกรอก');
            setIsValid(false);
        } else {
            if (min !== undefined && max !== undefined) {
                if (min <= value && value <= max) {
                    setErrorMessege('');
                    setIsValid(true);
                } else {
                    setErrorMessege('ช่วง ' + min + ' - ' + max + ' เท่านั้น');
                    setIsValid(false);
                }
            } else if (min === undefined) {
                if (value <= max) {
                    setErrorMessege('');
                    setIsValid(true);
                } else {
                    setErrorMessege('ไม่เกิน ' + max + ' เท่านั้น');
                    setIsValid(false);
                }
            } else if (max === undefined) {
                if (min <= value) {
                    setErrorMessege('');
                    setIsValid(true);
                } else {
                    setErrorMessege('ไม่ต่ำกว่า ' + min + ' เท่านั้น');
                    setIsValid(false);
                }
            } else {
                setErrorMessege('');
                setIsValid(true);
            }
        }
    };

    useEffect(() => {
        onValueChange(Number(value));
        validation();
    }, [value]);

    useEffect(() => {
        onValidChange(isValid);
    }, [isValid]);

    const increaseHandler = () => {
        if (max !== undefined) {
            if (value + step <= max) {
                setValue(Number(value) + step);
            }
        } else {
            setValue(Number(value) + step);
        }
    };
    const decreaseHandler = () => {
        if (min !== undefined) {
            if (min <= value - step) {
                setValue(Number(value) - step);
            }
        } else {
            setValue(Number(value) - step);
        }
    };

    return (
        <>
            <p className="text-red-400 italic text-sm">{errorMessage}</p>
            <div className="flex flex-row w-full">
                <button
                    className="w-20 bg-green-500 rounded-l-lg hover:bg-green-400 active:bg-green-800 focus:outline-none"
                    type="button"
                    onClick={increaseHandler}
                >
                    <span class="m-auto text-2xl text-white font-thin">+</span>
                </button>
                <input
                    className={`w-full p-2 pl-4 bg-gray-50 focus:outline-none ${isValid ? 'bg-gray-100' : 'bg-red-100'}`}
                    id={id}
                    name={name}
                    type="number"
                    value={value}
                    placeholder={placeholder}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                />

                <button
                    className="w-20 bg-red-500 rounded-r-lg hover:bg-red-400 active:bg-red-800 focus:outline-none"
                    type="button"
                    onClick={decreaseHandler}
                >
                    <span class="m-auto text-2xl text-white font-thin">-</span>
                </button>
            </div>
        </>
    );
};

export default InputNumber;
