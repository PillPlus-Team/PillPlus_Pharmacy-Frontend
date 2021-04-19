import { PILLSTORES_FETCH } from './types';

export const pillStoresFetch = () => {
    return async (dispatch) => {
        let pillStores = [
            {
                ID: 10000001,
                name: 'พักตร์ภูมิ ตาแพร่',
                phamacy: 'ยาอม ยาดม ยาหม่อง',
                location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                email: 'phoom0529@gmail.com',
                phone: '0891234567',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000002,
                name: 'พักตร์ภูมิ ตาแพร่',
                phamacy: 'ยาพิษ bodyslam',
                location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                email: 'phoom1477@gmail.com',
                phone: '0899997333',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000003,
                name: 'พักตร์ภูมิ ตาแพร่',
                phamacy: 'ยาดี ยาอี ยาไอซ์',
                location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                email: 'phukphoomtaphrae@gmail.com',
                phone: '0891234765',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000004,
                name: 'พักตร์ภูมิ ตาแพร่',
                phamacy: 'ยาอม ยาดม ยาหม่อง',
                location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                email: 'phoom0529@gmail.com',
                phone: '0891234567',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000005,
                name: 'พักตร์ภูมิ ตาแพร่',
                phamacy: 'ยาพิษ bodyslam',
                location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                email: 'phoom1477@gmail.com',
                phone: '0899997333',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000006,
                name: 'พักตร์ภูมิ ตาแพร่',
                phamacy: 'ยาดี ยาอี ยาไอซ์',
                location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                email: 'phukphoomtaphrae@gmail.com',
                phone: '0891234765',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000007,
                name: 'พักตร์ภูมิ ตาแพร่',
                phamacy: 'ยาอม ยาดม ยาหม่อง',
                location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                email: 'phoom0529@gmail.com',
                phone: '0891234567',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000008,
                name: 'พักตร์ภูมิ ตาแพร่',
                phamacy: 'ยาพิษ bodyslam',
                location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                email: 'phoom1477@gmail.com',
                phone: '0899997333',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
            {
                ID: 10000009,
                name: 'พักตร์ภูมิ ตาแพร่',
                phamacy: 'ยาดี ยาอี ยาไอซ์',
                location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
                email: 'phukphoomtaphrae@gmail.com',
                phone: '0891234765',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
            },
        ];

        dispatch({ type: PILLSTORES_FETCH, pillStores: pillStores });
    };
};

/* For Production */
// export const pillStoresFetch = () => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/getPillStores', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (res.status === 200) {
//             let pillStores = await res.json();

//             dispatch({ type: PILLSTORES_FETCH, pillStores: pillStores });
//         }
//     };
// };
