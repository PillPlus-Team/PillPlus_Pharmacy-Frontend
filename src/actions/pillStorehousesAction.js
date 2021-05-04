import { PILLSTOREHOUSES_FETCH, PILLSTOREHOUSES_SHOW, PILLSTOREHOUSES_EDIT_TOGGLE, PILLSTOREHOUSES_UPDATE_AMOUNT } from './types';
import { USER_LOGOUT } from './types';

import { LoadingModal, Toast } from './swals';

import { API_URL } from '../config';

/* For Production */
export const pillStorehousesFetch = () => {
    return async (dispatch) => {
        try {
            const res = await fetch(API_URL + '/pillStorehouse', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                let pillStorehouses = await res.json();
                pillStorehouses = pillStorehouses.map((pillStorehouse) => {
                    return { ...pillStorehouse, _id: pillStorehouse.pill._id };
                });

                dispatch({ type: PILLSTOREHOUSES_FETCH, pillStorehouses: pillStorehouses });
                dispatch(pillStorehousesFilter({ keyword: '' }));
            } else {
                throw res;
            }
        } catch (error) {
            if (error.status === 401) {
                dispatch({ type: USER_LOGOUT });
            }
        }
    };
};

export const pillStorehousesFilter = ({ keyword }) => {
    return (dispatch, getState) => {
        const { pillStorehouses } = getState();

        let _idList = [];
        pillStorehouses.list.map((pillStorehouse) => {
            let keys = Object.keys(pillStorehouse.pill).filter((key) => key != '_id');

            for (let i = 0; i < keys.length; i++) {
                if (String(pillStorehouse.pill[keys[i]]).includes(keyword)) {
                    return _idList.push(pillStorehouse._id);
                }
            }
            if (pillStorehouse.amount === keyword) {
                return _idList.push(pillStorehouse._id);
            }
        });

        dispatch({ type: PILLSTOREHOUSES_SHOW, _idList: _idList });
    };
};

export const pillStorehousesEditToggle = ({ _id }) => {
    return {
        type: PILLSTOREHOUSES_EDIT_TOGGLE,
        _id: _id,
    };
};

export const pillStorehousesUpdate = ({ _id, amount }) => {
    return async (dispatch, getState) => {
        LoadingModal.fire({ title: 'กำลังดำเนินการ ...' });
        LoadingModal.showLoading();

        const { pillStorehouses } = getState();
        const pillStorehouse = pillStorehouses.list.find((pillStorehouse) => pillStorehouse._id === _id);

        try {
            const res = await fetch(API_URL + `/pillStorehouse`, {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pill_id: pillStorehouse.pill._id,
                    amount: amount,
                }),
            });

            if (res.status === 200) {
                const editedPillStorehouse = await res.json().then((result) => {
                    return { _id: result.pill._id, pill: result.pill, amount: result.amount };
                });

                dispatch({ type: PILLSTOREHOUSES_UPDATE_AMOUNT, pillStorehouse: { ...pillStorehouse, ...editedPillStorehouse } });
                Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
            } else {
                throw res;
            }
        } catch (error) {
            if (error.status === 401) {
                dispatch({ type: USER_LOGOUT });
            } else {
                Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
                dispatch(pillStorehousesFetch());
            }
        }

        LoadingModal.close();
    };
};

/* For Dev */
// export const pillStorehousesFetch = () => {
//     return async (dispatch) => {
//         let pillStorehouses = [
//             {
//                 _id: 10000001,
//                 pill: {
//                     _id: 10000001,
//                     sn: '10225463',
//                     name: 'ยา A',
//                     description: 'ทานหลังอาหาร 15 นาที \nเช้า,เย็น',
//                     unit: 'เม็ด',
//                     price: 150.0,
//                     amount: 10,
//                     type: 'ED',
//                 },
//                 amount: 10,
//             },
//             {
//                 _id: 10000002,
//                 pill: {
//                     _id: 10000002,
//                     sn: '10225480',
//                     name: 'ยา B',
//                     description: 'ทานหลังอาหาร 15 นาที เช้า,เย็น',
//                     unit: 'ขวด',
//                     price: 159.0,
//                     amount: 10,
//                     type: 'NED',
//                 },
//                 amount: 10,
//             },
//         ];

//         pillStorehouses = pillStorehouses.map((pillStorehouse) => {
//             return { ...pillStorehouse, _id: pillStorehouse.pill._id };
//         });

//         dispatch({ type: PILLSTOREHOUSES_FETCH, pillStorehouses: pillStorehouses });
//         dispatch(pillStorehousesFilter({ keyword: '' }));
//     };
// };

// export const pillStorehousesFilter = ({ keyword }) => {
//     return async (dispatch, getState) => {
//         const { pillStorehouses } = getState();

//         let _idList = [];
//         pillStorehouses.list.map((pillStorehouse) => {
//             let keys = Object.keys(pillStorehouse.pill).filter((key) => key != '_id');

//             for (let i = 0; i < keys.length; i++) {
//                 if (String(pillStorehouse.pill[keys[i]]).includes(keyword)) {
//                     return _idList.push(pillStorehouse._id);
//                 }
//             }
//             if (pillStorehouse.amount === keyword) {
//                 return _idList.push(pillStorehouse._id);
//             }
//         });

//         dispatch({ type: PILLSTOREHOUSES_SHOW, _idList: _idList });
//     };
// };

// export const pillStorehousesEditToggle = ({ _id }) => {
//     return {
//         type: PILLSTOREHOUSES_EDIT_TOGGLE,
//         _id: _id,
//     };
// };

// export const pillsUpdate = ({ _id, amount }) => {
//     return async (dispatch, getState) => {
//         const { pillStorehouses } = getState();
//         const pillStorehouse = pillStorehouses.list.find((pillStorehouse) => pillStorehouse._id === _id);

//         dispatch({ type: PILLSTOREHOUSES_UPDATE_AMOUNT, pillStorehouse: { ...pillStorehouse, amount } });
//         Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
//     };
// };
