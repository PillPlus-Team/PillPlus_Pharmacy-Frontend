import { STATEMENTS_FETCH_BY_MONTH, STATEMENTS_SHOW } from './types';
import { USER_LOGOUT } from './types';

import { LoadingModal } from './swals';

import { API_URL } from '../config';

/* For Production */
export const statementsFetchByMonth = ({ month, year }) => {
    return async (dispatch) => {
        LoadingModal.fire({ title: 'กำลังดำเนินการ ...' });
        LoadingModal.showLoading();

        try {
            const res = await fetch(API_URL + `/invoice/statements?year=${year}&month=${month}`, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                let invoiceHistoryList = await res.json();

                let balanced = 0;
                invoiceHistoryList = invoiceHistoryList.map((invoiceHistory) => {
                    let totalPay = 0;
                    invoiceHistory.pills.forEach((pill) => {
                        totalPay += pill.totalPrice;
                    });

                    balanced += totalPay;

                    return { ...invoiceHistory, totalPay: totalPay, show: true };
                });

                dispatch({ type: STATEMENTS_FETCH_BY_MONTH, invoiceHistoryList: invoiceHistoryList, month: month, year: year, balanced: balanced });
                dispatch(statementsFilter({ keyword: '', month: month, year: year }));
            } else {
                throw res;
            }
        } catch (error) {
            if (error.status === 401) {
                dispatch({ type: USER_LOGOUT });
            }
        }

        if (LoadingModal.isLoading()) {
            LoadingModal.close();
        }
    };
};

export const statementsFilter = ({ keyword, month, year }) => {
    return async (dispatch, getState) => {
        const { statements } = getState();

        if (statements.month === month && statements.year === year) {
            let _idList = [];
            statements.list.map((invoiceHistory) => {
                const keys = Object.keys(invoiceHistory).filter((key) => key != '_id');
                for (let i = 0; i < keys.length; i++) {
                    if (String(invoiceHistory[keys[i]]).includes(keyword)) {
                        return _idList.push(invoiceHistory._id);
                    }
                }
            });
            dispatch({ type: STATEMENTS_SHOW, _idList: _idList, month: month, year: year });
        }
    };
};

/* For dev */
// export const statementsFetchByMonth = ({ month, year }) => {
//     return async (dispatch) => {
//         let invoiceHistoryList = [];
//         if (month === 1 && year === 2020) {
//             invoiceHistoryList = [
//                 {
//                     _id: 10000001,
//                     hn: '10225463',
//                     name: 'นาย พักตร์ภูมิ ตาแพร่',
//                     identificationNumber: '1341501382234',
//                     startTime: 1618415601123,
//                     queueNo: 1,
//                     doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
//                     pillStore: {
//                         pharmacy: 'ร้าน A',
//                         location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                     },
//                     pills: [],
//                     serviceCharge: 30.0,
//                     dispenseTime: 1618415601123,
//                 },
//                 {
//                     _id: 10000002,
//                     hn: '10225464',
//                     name: 'นาย พักตร์ภูมิ ตาแพร่',
//                     identificationNumber: '1341501382234',
//                     startTime: 1618415651123,
//                     queueNo: 2,
//                     doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
//                     pillStore: {
//                         pharmacy: 'ร้าน A',
//                         location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                     },
//                     pills: [
//                         { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
//                         { name: 'ยา B', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 2, unit: 'ขวด', totalPrice: 200.0 },
//                         { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
//                         { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
//                         { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
//                         { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
//                         { name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 },
//                     ],
//                     serviceCharge: 50.0,
//                     dispenseTime: 1618415601123,
//                 },
//             ];
//         }
//         if (month === 4 && year === 2021) {
//             invoiceHistoryList = [
//                 {
//                     _id: 10000003,
//                     hn: '10225465',
//                     name: 'นาย พักตร์ภูมิ ตาแพร่',
//                     identificationNumber: '1341501382234',
//                     startTime: 1618415661123,
//                     queueNo: 3,
//                     doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
//                     pillStore: {
//                         pharmacy: 'ร้าน A',
//                         location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                     },
//                     pills: [{ name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 }],
//                     serviceCharge: 50.0,
//                     dispenseTime: 1618415601123,
//                 },
//             ];
//         }

//         let balanced = 0;
//         invoiceHistoryList = invoiceHistoryList.map((invoiceHistory) => {
//             let totalPay = 0;
//             invoiceHistory.pills.forEach((pill) => {
//                 totalPay += pill.totalPrice;
//             });

//             balanced += totalPay;

//             return { ...invoiceHistory, totalPay: totalPay };
//         });

//         dispatch({ type: STATEMENTS_FETCH_BY_MONTH, invoiceHistoryList: invoiceHistoryList, month: month, year: year, balanced: balanced });
//         dispatch(statementsFilter({ keyword: '', month: month, year: year }));
//     };
// };

// export const statementsFilter = ({ keyword, month, year }) => {
//     return async (dispatch, getState) => {
//         const { statements } = getState();

//         if (statements.month === month && statements.year === year) {
//             let _idList = [];
//             statements.list.map((invoiceHistory) => {
//                 const keys = Object.keys(invoiceHistory).filter((key) => key != '_id');
//                 for (let i = 0; i < keys.length; i++) {
//                     if (String(invoiceHistory[keys[i]]).includes(keyword)) {
//                         return _idList.push(invoiceHistory._id);
//                     }
//                 }
//             });
//             dispatch({ type: STATEMENTS_SHOW, _idList: _idList, month: month, year: year });
//         }
//     };
// };
