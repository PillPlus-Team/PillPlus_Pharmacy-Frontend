import { INVOICES_FETCH, INVOICES_SELECT, INVOICES_DISPENSE } from './types';

import { ConfirmDialog, Toast } from './swals';

export const invoicesFetch = () => {
    return async (dispatch) => {
        let invoices = [
            {
                ID: 10000002,
                hn: '10225464',
                name: 'นาย พักตร์ภูมิ ตาแพร่',
                startTime: 1618415651123,
                queueNo: 1,
                doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
                pillStorePhamacy: 'ร้าน A',
                pillStoreLocation: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                pills: [
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
                    { name: 'ยา B', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 2, unit: 'ขวด', totalPrice: 200.0 },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
                    { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
                ],
                serviceCharge: 50.0,
                totalPay: 310.0,
            },
            {
                ID: 10000003,
                hn: '10225465',
                name: 'นาย พักตร์ภูมิ ตาแพร่',
                startTime: 1618415661123,
                queueNo: 2,
                doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
                pillStorePhamacy: 'ร้าน A',
                pillStoreLocation: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                pills: [{ name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 }],
                serviceCharge: 50.0,
                totalPay: 60.0,
            },
        ];

        invoices = invoices.map((invoice) => {
            let totalPillPrice = 0;
            invoice.pills.forEach((pill) => {
                totalPillPrice += pill.totalPrice;
            });

            return { ...invoice, totalPillPrice: totalPillPrice };
        });

        invoices = invoices.sort((element_1, element_2) => element_1.startTime - element_2.startTime);
        dispatch({ type: INVOICES_FETCH, invoices: invoices });
    };
};

export const invoicesSelect = ({ ID }) => {
    return {
        type: INVOICES_SELECT,
        ID: ID,
    };
};

export const invoicesDispense = ({ ID }) => {
    return async (dispatch, getState) => {
        const { invoices } = getState();

        const invoice = invoices.list.find((invoice) => invoice.ID === ID);

        ConfirmDialog.fire({
            title: 'ยืนยันการจ่ายยา',
            html:
                `<br> HN ${invoice.hn} : ${invoice.name} <br><br>` +
                `รับยาที่ ${invoice.pillStorePhamacy} <br>` +
                `ที่อยู่ ${invoice.pillStoreLocation} <br><br>` +
                `ยอดรวมยาทั้งสิ้น <b>${Number(invoice.totalPillPrice).toLocaleString('th-TH', {
                    style: 'currency',
                    currency: 'THB',
                    minimumFractionDigits: 2,
                })}</b> <br>`,

            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: INVOICES_DISPENSE, ID: ID });
                Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success', timer: 1500 });
            }
        });
    };
};

/* For Production */
// export const invoicesFetch = () => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/getInvoices/myPillStore', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (res.status === 200) {
//             let invoices = await res.json();

//             invoices = invoices.map((invoice) => {
//                 let totalPillPrice = 0;
//                 invoice.pills.forEach((pill) => {
//                     totalPillPrice += pill.totalPrice;
//                 });
    
//                 return { ...invoice, totalPillPrice: totalPillPrice };
//             });

//             invoices = prescriptions.sort((element_1, element_2) => element_1.startTime - element_2.startTime);
//             dispatch({ type: INVOICES_FETCH, invoices: invoices });
//         }
//     };
// };

// export const invoicesSelect = ({ ID }) => {
//     return {
//         type: INVOICES_SELECT,
//         ID: ID,
//     };
// };

// export const invoicesDispense = ({ ID }) => {
//     return async (dispatch, getState) => {
//         const { invoices } = getState();

//         const invoice = invoices.list.find((invoice) => invoice.ID === ID);

//         let totalPillPrice = 0;
//         invoice.pills.forEach((pill) => {
//             totalPillPrice += pill.totalPrice;
//         });

//         ConfirmDialog.fire({
//             title: 'ยืนยันการชำระเงิน',
//             html:
//                 `<br> HN ${invoice.hn} : ${invoice.name} <br><br>` +
//                 `รับยาที่ ${invoice.pillStorePhamacy} <br>` +
//                 `ที่อยู่ ${invoice.pillStoreLocation} <br><br>` +
//                 `ยอดรวมยาทั้งสิ้น <b>${invoice.totalPillPrice.toLocaleString('th-TH', {
//                     style: 'currency',
//                     currency: 'THB',
//                     minimumFractionDigits: 2,
//                 })}</b> <br>`,

//             icon: 'warning',
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 const res = await fetch('/api/v1/invoicePay', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         ID,
//                     }),
//                 });

//                 if (res.status === 200) {
//                     dispatch({ type: INVOICES_DISPENSE, ID: ID });
//                     Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success', timer: 1500 });
//                 } else {
//                     Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
//                     dispatch(invoicesFetch());
//                 }
//             }
//         });
//     };
// };
