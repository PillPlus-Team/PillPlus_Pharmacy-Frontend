import { useState, useEffect } from 'react';

const InputText = ({
    id,
    name,
    type,
    initValue = '',
    placeholder,
    autoComplete,
    required,
    minLength = 0,
    maxLength = 200,
    pattern,
    msgPatternError,
    dupList = [],
    msgDupError,
    onValidChange = () => {},
    onValueChange = () => {},
}) => {
    const [value, setValue] = useState(initValue);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessege] = useState('');

    const validation = () => {
        if (required && value.length === 0) {
            setErrorMessege('โปรดกรอก');
            setIsValid(false);
        } else {
            if (minLength <= value.length && value.length <= maxLength) {
                let regExpression = new RegExp(pattern);

                if (!regExpression.test(value) && value.length !== 0) {
                    setErrorMessege(msgPatternError);
                    setIsValid(false);
                } else {
                    if (dupList.includes(value)) {
                        setErrorMessege(msgDupError);
                        setIsValid(false);
                    } else {
                        setErrorMessege('');
                        setIsValid(true);
                    }
                }
            } else {
                if (minLength !== maxLength) {
                    setErrorMessege('ต้องการ ' + minLength + '-' + maxLength + ' ตัวอักษร');
                } else {
                    setErrorMessege('ต้องการ ' + minLength + ' ตัวอักษร');
                }
                setIsValid(false);
            }
        }
    };

    useEffect(() => {
        onValueChange(value);
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
                type={type}
                value={value}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
            />
        </>
    );
};

export default InputText;
