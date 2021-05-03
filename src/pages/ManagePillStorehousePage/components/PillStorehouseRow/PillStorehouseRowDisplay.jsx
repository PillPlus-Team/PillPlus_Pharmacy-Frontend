import { useDispatch } from 'react-redux';

import { pillStorehousesEditToggle } from '../../../../actions/pillStorehousesAction';

const PillStorehouseRowDisplay = ({ index, pillStorehouse }) => {
    const dispatch = useDispatch();

    return (
        <tbody className="divide-y divide-gray-200">
            <tr>
                <td className="w-10 px-6 py-4 text-gray-500 pl-10 align-top">{index}</td>
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
                <td className="w-44 px-6 py-4 text-gray-500 align-top text-right border-l border-r">
                    <p className="break-words">{Number(pillStorehouse.amount).toLocaleString('th-TH')}</p>
                </td>
                <td className="w-20 px-6 py-4 whitespace-nowrap text-center font-medium align-top" colSpan='2'>
                    <button
                        class="text-indigo-600 hover:text-indigo-900 hover:underline focus:outline-none"
                        type="button"
                        onClick={() => {
                            dispatch(pillStorehousesEditToggle({ _id: pillStorehouse._id }));
                        }}
                    >
                        เเก้ไข
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default PillStorehouseRowDisplay;
