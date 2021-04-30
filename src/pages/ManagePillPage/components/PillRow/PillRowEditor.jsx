import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { InputText, InputNumber } from '../../../../components';

import { pillsEditToggle, pillsUpdate } from '../../../../actions/pillsAction';

const PillRowEditor = ({ index, pill }) => {
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(pill.amount);

    const [isValidAmount, setIsValidAmount] = useState(true);

    const [canSubmit, setCanSubmit] = useState(true);

    useEffect(() => {
        setCanSubmit(isValidAmount);
    }, [isValidAmount]);

    const submitHandler = () => {
        if (canSubmit) {
            dispatch(pillsUpdate({ _id: pill._id, amount: amount }));
        }
    };

    return (
        <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="w-10 px-6 py-4 whitespace-nowrap text-gray-500 pl-10 align-top">{index}</td>
                <td className="w-32 px-6 py-4 text-gray-500 align-top">{pill.sn}</td>
                <td className="w-52 px-6 py-4 text-gray-500 align-top">
                    <p className="break-words">{pill.name}</p>
                </td>
                <td className="w-64 px-6 py-4 text-gray-500 align-top">
                    <p className="break-words">
                        {pill.description.split('\n').map((subString) => {
                            return (
                                <>
                                    {subString}
                                    <br />
                                </>
                            );
                        })}
                    </p>
                </td>
                <td className="w-36 px-6 py-4 text-gray-500 align-top">
                    <p className="break-words">
                        {Number(pill.price).toLocaleString('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 2 })}
                    </p>
                </td>
                <td className="w-36 px-6 py-4 text-gray-500 align-top">{pill.unit}</td>
                <td className="w-44 px-6 py-4 text-gray-500 align-top border-l border-r">
                    <InputNumber
                        id={`InputNumber-amount-${index}`}
                        name="amount"
                        initValue={amount}
                        min="0"
                        placeholder="จำนวน"
                        required
                        onValidChange={(state) => {
                            setIsValidAmount(state);
                        }}
                        onValueChange={(state) => {
                            setAmount(state);
                        }}
                    />
                </td>

                <td className="w-20 px-6 py-4 whitespace-nowrap text-center font-medium align-top">
                    <button
                        className={`focus:outline-none ${
                            canSubmit ? 'text-green-600 hover:text-green-900 hover:underline' : 'text-gray-400 cursor-not-allowed'
                        }`}
                        type="button"
                        onClick={submitHandler}
                        disabled={!canSubmit}
                    >
                        บันทึก
                    </button>
                </td>
                <td className="w-20 px-6 py-4 whitespace-nowrap text-center font-medium align-top">
                    <button
                        className="text-gray-800 hover:text-gray-500 hover:underline focus:outline-none"
                        type="button"
                        onClick={() => {
                            dispatch(pillsEditToggle({ _id: pill._id }));
                        }}
                    >
                        ยกเลิก
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default PillRowEditor;
