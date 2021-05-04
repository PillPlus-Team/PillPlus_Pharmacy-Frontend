import { PILLSTORES_FETCH } from './types';
import { USER_LOGOUT } from './types';

import { API_URL } from '../config';

/* For Production */
export const pillStoresFetch = () => {
    return async (dispatch) => {
        try {
            const res = await fetch(API_URL + '/pillStore/all', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                const pillStores = await res.json();

                dispatch({ type: PILLSTORES_FETCH, pillStores: pillStores });
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

/* For Dev */
// export const pillStoresFetch = () => {
//     return async (dispatch) => {
//         let pillStores = [
//             {
//                 _id: 10000001,
//                 ID: 10000001,
//                 name: 'พักตร์ภูมิ ตาแพร่',
//                 pharmacy: 'ยาอม ยาดม ยาหม่อง',
//                 location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                 email: 'phoom0529@gmail.com',
//                 phone: '0891234567',
//                 avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000002,
//                 ID: 10000002,
//                 name: 'พักตร์ภูมิ ตาแพร่',
//                 pharmacy: 'ยาพิษ bodyslam',
//                 location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                 email: 'phoom1477@gmail.com',
//                 phone: '0899997333',
//                 avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//             {
//                 _id: 10000003,
//                 ID: 10000003,
//                 name: 'พักตร์ภูมิ ตาแพร่',
//                 pharmacy: 'ยาดี ยาอี ยาไอซ์',
//                 location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
//                 email: 'phukphoomtaphrae@gmail.com',
//                 phone: '0891234765',
//                 avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
//             },
//         ];

//         dispatch({ type: PILLSTORES_FETCH, pillStores: pillStores });
//     };
// };
