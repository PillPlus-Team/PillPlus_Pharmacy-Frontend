import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { PageLayout, PatientQueue } from '../../components';

import InvoiceInfoMonitor from './components/InvoiceInfoMonitor';

import { invoicesFetch, invoicesFetchByIO, invoicesSelect, invoicesDispense } from '../../actions/invoicesAction';

const DispensePage = ({ socket }) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);
    const invoices = useSelector((state) => state.invoices);

    let selectedInvoice;
    try {
        selectedInvoice = invoices.list.find((element) => element._id === invoices.selectedInvoice_id);
    } catch (err) {
        selectedInvoice = null;
    }

    useEffect(() => {
        dispatch(invoicesFetch());

        // socket.on('message', (message) => {
        //     dispatch(invoicesFetchByIO());
        //     console.log(message);
        // });
        // socket.on('err', (errror) => {
        //     console.error(errror);
        // });

        // setTimeout(() => {
        //     socket.emit('join', 'Payment_Room');
        //     console.log('join -> Payment_Room :', socket.id);
        // }, 100);

        // /* componentWillUnmount*/
        // return () => {
        //     socket.emit('leave', 'Payment_Room');
        //     console.log('leave -> Payment_Room :', socket.id);

        //     socket.removeAllListeners();
        // };
    }, []);

    return (
        <PageLayout userInfo={user} menuList={menuList}>
            <div className="flex flex-row justify-between w-full h-full">
                <div className="min-w-min">
                    <p className="text-3xl border-l-4 pl-4 mb-4">ลำดับ</p>
                    <div className="h-176">
                        <PatientQueue
                            patientQueueList={invoices.list}
                            onSelected={(selectedIndex) => {
                                dispatch(invoicesSelect({ _id: invoices.list[selectedIndex]._id }));
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col ml-14 ">
                    <div className="min-w-min ">
                        <p className="text-3xl border-l-4 pl-4 mb-4">ข้อมูลผู้ป่วย</p>
                        {!selectedInvoice && (
                            <div className="flex justify-center items-center w-160 h-160 bg-white shadow-md rounded-lg">
                                <p className="font-medium text-gray-400 tracking-wider">โปรดเลือกผู้ป่วย</p>
                            </div>
                        )}
                        {selectedInvoice && (
                            <div id="content-for-print" className="flex w-160 h-160">
                                <InvoiceInfoMonitor invoice={selectedInvoice} />
                            </div>
                        )}
                    </div>
                    <button
                        className={`w-52 p-2 mt-5 ml-auto  text-white rounded-lg focus:outline-none ${
                            selectedInvoice ? 'bg-green-500 hover:bg-green-800' : 'bg-gray-400 cursor-not-allowed '
                        }`}
                        type="button"
                        disabled={!selectedInvoice}
                        onClick={() => {
                            dispatch(
                                invoicesDispense({
                                    _id: invoices.selectedInvoice_id,
                                    onSuccess: () => {
                                        socket.emit('room', 'Payment_Room');
                                        console.log('knock Payment_Room!');
                                    },
                                })
                            );
                        }}
                    >
                        ยืนยันการจ่ายยา
                    </button>
                </div>
            </div>
        </PageLayout>
    );
};
export default DispensePage;
