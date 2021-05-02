import { useState } from 'react';

import Modal from 'react-modal';
import '../../../css/react-modal.css';

import InvoiceInfoMonitor from './InvoiceInfoMonitor';

const StatementRowDisplay = ({ index, invoiceHistory }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <tbody className="divide-y divide-gray-200">
                <tr>
                    <td className="w-16 px-6 py-4 text-gray-500 pl-10">{index}</td>
                    <td className="w-24 px-6 py-4 text-gray-500">{invoiceHistory._id}</td>
                    <td className="w-44 px-6 py-4 text-gray-500">
                        <p className="break-words">{invoiceHistory.name}</p>
                    </td>
                    <td className="w-36 px-6 py-4 text-gray-500">
                        <p className="break-words">{invoiceHistory.dispenseTime}</p>
                    </td>

                    <td className="w-36 px-6 py-4 text-gray-500 text-center text-xl border-l-2 border-r-2">
                        {Number(invoiceHistory.totalPay).toLocaleString('th-TH', {
                            style: 'currency',
                            currency: 'THB',
                            minimumFractionDigits: 2,
                        })}
                    </td>
                    <td className="w-20 px-6 py-4 whitespace-nowrap text-center font-medium">
                        <button
                            class="text-indigo-600 hover:text-indigo-900 hover:underline focus:outline-none"
                            type="button"
                            onClick={() => {
                                setModalIsOpen(true);
                            }}
                        >
                            ดูรายละเอียด
                        </button>
                    </td>
                </tr>
            </tbody>
            <Modal
                contentLabel="CoordinateInput-Modal"
                isOpen={modalIsOpen}
                closeTimeoutMS={200}
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
                        height: '52rem',
                        width: '50rem',
                        left: 'auto',
                        bottom: 'auto',
                    },
                }}
                ariaHideApp={false}
            >
                <div className="flex flex-col w-full h-full justify-center items-center">
                    <div className="flex flex-col justify-center items-center w-176 h-176">
                        <InvoiceInfoMonitor invoice={invoiceHistory} />
                    </div>
                    <div className="flex flex-row ml-auto mt-auto">
                        <button
                            className="w-24 p-2 text-white rounded-lg focus:outline-none bg-green-500 hover:bg-green-800 "
                            type="button"
                            onClick={() => {
                                setModalIsOpen(false);
                            }}
                        >
                            ปิด
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default StatementRowDisplay;
