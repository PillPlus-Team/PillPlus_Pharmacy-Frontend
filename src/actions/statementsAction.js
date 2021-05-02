import { STATEMENTS_FETCH_BY_MONTH, STATEMENTS_SHOW } from './types';

export const statementsFetchByMonth = ({ month, year }) => {
    return async (dispatch) => {
        let invoiceHistoryList = [];
        if (month === 1 && year === 2020) {
            invoiceHistoryList = [
                {
                    _id: 10000001,
                    hn: '10225463',
                    name: 'นาย พักตร์ภูมิ ตาแพร่',
                    identificationNumber: '1341501382234',
                    startTime: 1618415601123,
                    queueNo: 1,
                    doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
                    pillStore: {
                        pharmacy: 'ร้าน A',
                        location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    },
                    pills: [],
                    serviceCharge: 30.0,
                    dispenseTime: 1618415601123,
                },
                {
                    _id: 10000002,
                    hn: '10225464',
                    name: 'นาย พักตร์ภูมิ ตาแพร่',
                    identificationNumber: '1341501382234',
                    startTime: 1618415651123,
                    queueNo: 2,
                    doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
                    pillStore: {
                        pharmacy: 'ร้าน A',
                        location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    },
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
                    dispenseTime: 1618415601123,
                },
            ];
        }
        if (month === 4 && year === 2021) {
            invoiceHistoryList = [
                {
                    _id: 10000003,
                    hn: '10225465',
                    name: 'นาย พักตร์ภูมิ ตาแพร่',
                    identificationNumber: '1341501382234',
                    startTime: 1618415661123,
                    queueNo: 3,
                    doctor: 'นพ.สมชาย เจริญรุ่งเรือง',
                    pillStore: {
                        pharmacy: 'ร้าน A',
                        location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                    },
                    pills: [{ name: 'ยา A', description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น', amount: 10, unit: 'เม็ด', totalPrice: 10.0 }],
                    serviceCharge: 50.0,
                    dispenseTime: 1618415601123,
                },
            ];
        }

        let balance = 0;
        invoiceHistoryList = invoiceHistoryList.map((invoiceHistory) => {
            let totalPay = 0;
            invoiceHistory.pills.forEach((pill) => {
                totalPay += pill.totalPrice;
            });

            balance += totalPay;

            return { ...invoiceHistory, totalPay: totalPay };
        });

        dispatch({ type: STATEMENTS_FETCH_BY_MONTH, invoiceHistoryList: invoiceHistoryList, month: month, year: year, balance: balance });
        dispatch(statementsFilter({ keyword: '', month: month, year: year }));
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

/* For Production */
// export const statementsFetchByMonth = ({ month, year }) => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/getAccounts', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: {
//                 month,
//                 year,
//             },
//         });

//         if (res.status === 200) {
//             let invoiceHistoryList = await res.json();
//             invoiceHistoryList = invoiceHistoryList.map((invoiceHistory) => {
//                 let totalPay = 0;
//                 invoiceHistory.pills.forEach((pill) => {
//                     totalPay += pill.totalPrice;
//                 });

//                 return { ...invoiceHistory, totalPay: totalPay, show: true };
//             });

//             dispatch({ type: STATEMENTSLIST_FETCH_BY_MONTH, invoiceHistoryList: invoiceHistoryList, month: month, year: year });
//             dispatch(statementsFilter({ keyword: '', month: month, year: year }));
//         }
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
