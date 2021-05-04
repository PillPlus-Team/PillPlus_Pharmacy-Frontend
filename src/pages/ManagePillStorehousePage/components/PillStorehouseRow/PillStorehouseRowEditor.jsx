import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { InputNumber } from '../../../../components';

import { pillStorehousesEditToggle, pillStorehousesUpdate } from '../../../../actions/pillStorehousesAction';

const PillStorehouseRowEditor = ({ index, pillStorehouse }) => {
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(pillStorehouse.amount);

    const [isValidAmount, setIsValidAmount] = useState(true);

    const submitHandler = () => {
        if (isValidAmount) {
            dispatch(pillStorehousesUpdate({ _id: pillStorehouse._id, amount: amount }));
        }
    };

    return (
        <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="w-10 px-6 py-4 whitespace-nowrap text-gray-500 pl-10 align-top">{index}</td>
                <td className="w-32 px-6 py-4 text-gray-500 align-top">{pillStorehouse.pill.sn}</td>
                <td className="w-52 px-6 py-4 text-gray-500 align-top">
                    <p className="break-words">{pillStorehouse.pill.name}</p>
                </td>
                <td className="w-64 px-6 py-4 text-gray-500 align-top">
                    <p className="break-words">
                        {pillStorehouse.pill.description.split('\n').map((subString) => {
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
                        {Number(pillStorehouse.pill.price).toLocaleString('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 2 })}
                    </p>
                </td>
                <td className="w-36 px-6 py-4 text-gray-500 align-top">{pillStorehouse.pill.unit}</td>
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
                            isValidAmount ? 'text-green-600 hover:text-green-900 hover:underline' : 'text-gray-400 cursor-not-allowed'
                        }`}
                        type="button"
                        onClick={submitHandler}
                        disabled={!isValidAmount}
                    >
                        บันทึก
                    </button>
                </td>
                <td className="w-20 px-6 py-4 whitespace-nowrap text-center font-medium align-top">
                    <button
                        className="text-gray-800 hover:text-gray-500 hover:underline focus:outline-none"
                        type="button"
                        onClick={() => {
                            dispatch(pillStorehousesEditToggle({ _id: pillStorehouse._id }));
                        }}
                    >
                        ยกเลิก
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default PillStorehouseRowEditor;
