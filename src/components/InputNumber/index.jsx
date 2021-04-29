import { useState, useEffect } from 'react';

const InputNumber = ({ id, name, initValue = '', min, max, placeholder, required, onValidChange = () => {}, onValueChange = () => {} }) => {
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

    return (
        <>
            <p className="text-red-400 italic text-sm">{errorMessage}</p>
            <input
                className={`w-full p-2 pl-4 rounded-lg border-2 focus:outline-none ${
                    isValid ? 'border-gray-200  focus:border-blue-500 ' : 'border-red-300 focus:border-red-500'
                }`}
                id={id}
                name={name}
                type="number"
                value={value}
                placeholder={placeholder}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
            />
        </>
    );
};

export default InputNumber;
