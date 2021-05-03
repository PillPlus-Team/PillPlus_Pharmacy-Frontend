import { INVOICES_FETCH, INVOICES_FETCH_BY_IO, INVOICES_SELECT, INVOICES_DISPENSE } from './types';
import { USER_LOGOUT } from './types';

import { LoadingModal, ConfirmDialog, Toast } from './swals';

import { API_URL } from '../config';

/* For Production */
export const invoicesFetch = () => {
    return async (dispatch) => {
        const res = await fetch(API_URL + '/invoice/listCustomers', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.status === 401) {
            dispatch({ type: USER_LOGOUT });
        }

        if (res.status === 200) {
            let invoices = await res.json();
            invoices = invoices.map((invoice) => {
                let totalPay = 0;
                invoice.pills.forEach((pill) => {
                    totalPay += pill.totalPrice;
                });

                return { ...invoice, totalPay: totalPay };
            });
            invoices = invoices.sort((element_1, element_2) => element_1.startTime - element_2.startTime);

            dispatch({ type: INVOICES_FETCH, invoices: invoices });
        }
    };
};

export const invoicesFetchByIO = () => {
    return async (dispatch) => {
        const res = await fetch(API_URL + '/invoice/listCustomers', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.status === 401) {
            dispatch({ type: USER_LOGOUT });
        }

        if (res.status === 200) {
            let invoices = await res.json();
            invoices = invoices.map((invoice) => {
                let totalPay = 0;
                invoice.pills.forEach((pill) => {
                    totalPay += pill.totalPrice;
                });

                return { ...invoice, totalPay: totalPay };
            });
            invoices = invoices.sort((element_1, element_2) => element_1.startTime - element_2.startTime);

            dispatch({ type: INVOICES_FETCH_BY_IO, newInvoices: invoices });
        }
    };
};

export const invoicesSelect = ({ _id }) => {
    return {
        type: INVOICES_SELECT,
        _id: _id,
    };
};

export const invoicesDispense = ({ _id, onSuccess }) => {
    return async (dispatch, getState) => {
        LoadingModal.fire({ title: 'กำลังดำเนินการ ...' });
        LoadingModal.showLoading();

        const { invoices } = getState();
        const invoice = invoices.list.find((invoice) => invoice._id === _id);

        ConfirmDialog.fire({
            title: 'ยืนยันการจ่ายยา',
            html:
                `<br> ลูกค้า : ${invoice.name} <br>` +
                `รับผิดชอบโดย ${invoice.doctor} <br><br>` +
                `ยอดรวมยาทั้งสิ้น <b>${Number(invoice.totalPay).toLocaleString('th-TH', {
                    style: 'currency',
                    currency: 'THB',
                    minimumFractionDigits: 2,
                })}</b> <br>`,

            icon: 'warning',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(API_URL + `/invoice/dispensePill/${_id}`, {
                    method: 'PUT',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (res.status === 401) {
                    dispatch({ type: USER_LOGOUT });
                }

                if (res.status === 200) {
                    onSuccess();

                    dispatch({ type: INVOICES_DISPENSE, _id: _id });
                    Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success', timer: 1500 });
                } else {
                    Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
                    dispatch(invoicesFetch());
                }
            }
        });
    };
};

// export const invoicesFetch = () => {
//     return async (dispatch) => {
//         let invoices = [
//             {
//                 _id: 10000001,
//                 hn: '10225463',
//                 name: 'นาย พักตร์ภูมิ ตาแพร่',
//                 identificationNumber:'1341501382234',
//                 startTime: 1618415601123,
//                 queueNo: 1,
//                 doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
//                 pillStore: {
//                     pharmacy: 'ร้าน A',
//                     location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                 },
//                 pills: [],
//                 serviceCharge: 30.0,
//             },
//             {
//                 _id: 10000002,
//                 hn: '10225464',
//                 name: 'นาย พักตร์ภูมิ ตาแพร่',
//                 identificationNumber:'1341501382234',
//                 startTime: 1618415651123,
//                 queueNo: 2,
//                 doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
//                 pillStore: {
//                     pharmacy: 'ร้าน A',
//                     location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                 },
//                 pills: [
//                     { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
//                     { name: 'ยา B', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 2, unit: 'ขวด', totalPrice: 200.0 },
//                     { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
//                     { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
//                     { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
//                     { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
//                     { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
//                 ],
//                 serviceCharge: 50.0,
//             },
//             {
//                 _id: 10000003,
//                 hn: '10225465',
//                 name: 'นาย พักตร์ภูมิ ตาแพร่',
//                 identificationNumber:'1341501382234',
//                 startTime: 1618415661123,
//                 queueNo: 3,
//                 doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
//                 pillStore: {
//                     pharmacy: 'ร้าน A',
//                     location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                 },
//                 pills: [{ name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 }],
//                 serviceCharge: 50.0,
//             },
//         ];

//         invoices = invoices.map((invoice) => {
//             let totalPay = 0;
//             invoice.pills.forEach((pill) => {
//                 totalPay += pill.totalPrice;
//             });

//             return { ...invoice, totalPay: totalPay };
//         });
//         invoices = invoices.sort((element_1, element_2) => element_1.startTime - element_2.startTime);

//         dispatch({ type: INVOICES_FETCH, invoices: invoices });
//     };
// };

// export const invoicesSelect = ({ _id }) => {
//     return {
//         type: INVOICES_SELECT,
//         _id: _id,
//     };
// };

// export const invoicesDispense = ({ _id, onSuccess }) => {
//     return async (dispatch, getState) => {
//         LoadingModal.fire({ title: 'กำลังดำเนินการ ...' });
//         LoadingModal.showLoading();

//         const { invoices } = getState();
//         const invoice = invoices.list.find((invoice) => invoice._id === _id);

//         ConfirmDialog.fire({
//             title: 'ยืนยันการจ่ายยา',
//             html:
//                 `<br> ลูกค้า : ${invoice.name} <br>` +
//                 `รับผิดชอบโดย ${invoice.doctor} <br><br>` +
//                 `ยอดรวมยาทั้งสิ้น <b>${Number(invoice.totalPay).toLocaleString('th-TH', {
//                     style: 'currency',
//                     currency: 'THB',
//                     minimumFractionDigits: 2,
//                 })}</b> <br>`,

//             icon: 'warning',
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 dispatch({ type: INVOICES_DISPENSE, _id: _id });
//                 Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success', timer: 1500 });
//             }
//         });
//     };
// };
