import { USER_LOGIN, USER_EDIT_PROFILE_TOGGLE, USER_UPDATE_PROFILE, USER_LOGOUT } from './types';

import { menuListFetch } from './menuListActions';
import { pillStoresFetch } from './pillStoresAction';

import { ConfirmDialog, ChaningModal, Toast } from './swals';

export const userLogin = ({ email, password, history }) => {
    return async (dispatch) => {
        let user = {
            ID: 10000001,
            name: 'พักตร์ภูมิ ตาแพร่',
            phamacy: 'ยาอม ยาดม ยาหม่อง',
            location: '123/5 ต.หายา อ.ยาหาย จ.กรุงเทพ 12345',
            email: 'phoom0529@gmail.com',
            phone: '0891234567',
            avatarUrl: 'https://avatars2.githubusercontent.com/u/36500890?s=460&u=c6d4793fcb2ec759704fa68bfe4806e93fbf2569&v=4',
        };

        dispatch({ type: USER_LOGIN, user: user });
        dispatch(menuListFetch());
        history.push('/home');
    };
};

export const userEditProfileToggle = () => {
    return {
        type: USER_EDIT_PROFILE_TOGGLE,
    };
};

export const userUpdateProfile = ({ avatarUrl, name, phamacy, location, mapLocation, openingData, email, phone }) => {
    return async (dispatch, getState) => {
        const { user } = getState();
        dispatch({
            type: USER_UPDATE_PROFILE,
            user: { ...user, avatarUrl, name, phamacy, location, lat: mapLocation.lat, lng: mapLocation.lng, openingData, email, phone },
        });
        Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
    };
};

export const userChangePassword = () => {
    return async () => {
        ChaningModal.mixin({
            progressSteps: ['1', '2'],
        })
            .queue([
                {
                    title: 'รหัสผ่านเดิม',
                    html:
                        '<p>โปรดกรอก รหัสผ่านเดิมของท่าน</p>' +
                        '<input id="old-password" class="swal2-input" type="password" placeholder="รหัสผ่าน" autocomplete="off">',
                    preConfirm: () => {
                        if (!document.getElementById('old-password').value) {
                            ChaningModal.showValidationMessage('กรุณากรอกรหัสผ่าน');
                        } else {
                            return document.getElementById('old-password').value;
                        }
                    },
                    confirmButtonText: 'ถัดไป',
                    cancelButtonText: 'ยกเลิก',
                },
                {
                    title: 'ป้อนรหัสผ่านใหม่',
                    html:
                        '<p>โปรดกรอก รหัสผ่านที่ท่านต้องการ</p>' +
                        '<input id="new-password-1" class="swal2-input" type="password" placeholder="รหัสผ่านใหม่" autocomplete="off">' +
                        '<input id="new-password-2" class="swal2-input" type="password" placeholder="รหัสผ่านใหม่ (อีกครั้ง)" autocomplete="off">',
                    preConfirm: () => {
                        if (!document.getElementById('new-password-1').value || !document.getElementById('new-password-2').value) {
                            ChaningModal.showValidationMessage('กรุณากรอกข้อมูลให้ครบ');
                        } else if (document.getElementById('new-password-1').value !== document.getElementById('new-password-2').value) {
                            ChaningModal.showValidationMessage('กรุณากรอกรหัสผ่านใหม่ ให้ตรงกัน');
                        } else if (
                            document.getElementById('new-password-1').value.length < 6 ||
                            document.getElementById('new-password-2').value.length < 6
                        ) {
                            ChaningModal.showValidationMessage('รหัสผ่านใหม่ ต้องมีความยาวมากกว่า 6 ตัวอักษร');
                        } else {
                            return [document.getElementById('new-password-1').value, document.getElementById('new-password-2').value];
                        }
                    },
                    confirmButtonText: 'ยืนยัน',
                    cancelButtonText: 'ยกเลิก',
                },
            ])
            .then((result) => {
                try {
                    const password = result.value[0];
                    const newPassword = result.value[1][0];
                    const reNewPassword = result.value[1][1];

                    if (password && newPassword && reNewPassword) {
                        Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
                    }
                } catch (error) {}
            });
    };
};

export const userLogout = ({ history }) => {
    return async (dispatch) => {
        ConfirmDialog.fire({
            title: 'ออกจากระบบ ?',
            text: 'ท่านกำลังออกจากระบบ',
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: USER_LOGOUT });
                history.push('/login');
            }
        });
    };
};

/* For Production */
// export const userLogin = ({ email, password, history }) => {
//     return async (dispatch) => {
//         const res = await fetch('/api/v1/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email,
//                 password,
//             }),
//         });

//         if (res.status == 200) {
//             const user = await res.json();
//             dispatch({ type: USER_LOGIN, user: user });
//             dispatch(menuListFetch());
//             history.push('/home');
//         } else if (res.status == 403) {
//             Toast.fire({
//                 title: 'อีเมล หรือ รหัสผ่าน ไม่ถูกต้อง',
//                 icon: 'error',
//             });
//         } else {
//             Toast.fire({
//                 title: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
//                 text: 'กรุณาติดต่อผู้ดูแลระบบ',
//                 icon: 'error',
//             });
//         }
//     };
// };

// export const userEditProfileToggle = () => {
//     return {
//         type: USER_EDIT_PROFILE_TOGGLE,
//     };
// };

// export const userUpdateProfile = ({ avatarUrl, name, phamacy, location, mapLocation, openingData, email, phone }) => {
//     return async (dispatch, getState) => {
//         const { user } = getState();

//         let updateAvatarUrl;
//         if (avatarUrl === user.avatarUrl) {
//             updateAvatarUrl = '';
//         } else {
//             updateAvatarUrl = avatarUrl;
//         }

//         const res = await fetch('/api/v1/editProfile', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 avatarUrl: updateAvatarUrl,
//                 name,
//                 phamacy,
//                 location,
//                 lat: mapLocation.lat,
//                 lng: mapLocation.lng,
//                 openingData,
//                 email,
//                 phone,
//             }),
//         });

//         if (res.status == 200) {
//             const editedUser = await res.json();
//             dispatch({ type: USER_UPDATE_PROFILE, user: { ...editedUser } });
//             Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
//         } else {
//             Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
//             dispatch(pillStoresFetch());
//         }
//     };
// };

// export const userChangePassword = () => {
//     return async () => {
//         ChaningModal.mixin({
//             progressSteps: ['1', '2'],
//         })
//             .queue([
//                 {
//                     title: 'รหัสผ่านเดิม',
//                     html:
//                         '<p>โปรดกรอก รหัสผ่านเดิมของท่าน</p>' +
//                         '<input id="old-password" class="swal2-input" type="password" placeholder="รหัสผ่าน" autocomplete="off">',
//                     preConfirm: () => {
//                         if (!document.getElementById('old-password').value) {
//                             ChaningModal.showValidationMessage('กรุณากรอกรหัสผ่าน');
//                         } else {
//                             return document.getElementById('old-password').value;
//                         }
//                     },
//                     confirmButtonText: 'ถัดไป',
//                     cancelButtonText: 'ยกเลิก',
//                 },
//                 {
//                     title: 'ป้อนรหัสผ่านใหม่',
//                     html:
//                         '<p>โปรดกรอก รหัสผ่านที่ท่านต้องการ</p>' +
//                         '<input id="new-password-1" class="swal2-input" type="password" placeholder="รหัสผ่านใหม่" autocomplete="off">' +
//                         '<input id="new-password-2" class="swal2-input" type="password" placeholder="รหัสผ่านใหม่ (อีกครั้ง)" autocomplete="off">',
//                     preConfirm: () => {
//                         if (!document.getElementById('new-password-1').value || !document.getElementById('new-password-2').value) {
//                             ChaningModal.showValidationMessage('กรุณากรอกข้อมูลให้ครบ');
//                         } else if (document.getElementById('new-password-1').value !== document.getElementById('new-password-2').value) {
//                             ChaningModal.showValidationMessage('กรุณากรอกรหัสผ่านใหม่ ให้ตรงกัน');
//                         } else if (
//                             document.getElementById('new-password-1').value.length < 6 ||
//                             document.getElementById('new-password-2').value.length < 6
//                         ) {
//                             ChaningModal.showValidationMessage('รหัสผ่านใหม่ ต้องมีความยาวมากกว่า 6 ตัวอักษร');
//                         } else {
//                             return [document.getElementById('new-password-1').value, document.getElementById('new-password-2').value];
//                         }
//                     },
//                     confirmButtonText: 'ยืนยัน',
//                     cancelButtonText: 'ยกเลิก',
//                 },
//             ])
//             .then(async (result) => {
//                 try {
//                     const password = result.value[0];
//                     const newPassword = result.value[1][0];
//                     const reNewPassword = result.value[1][1];

//                     const res = await fetch('/api/v1/changePassword', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({
//                             password,
//                             newPassword,
//                             reNewPassword,
//                         }),
//                     });

//                     if (res.status === 200) {
//                         Toast.fire({ title: 'ดำเนินการสำเร็จ', icon: 'success' });
//                     } else {
//                         Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
//                     }
//                 } catch (error) {}
//             });
//     };
// };

// export const userLogout = ({ history }) => {
//     return async (dispatch) => {
//         ConfirmDialog.fire({
//             title: 'ออกจากระบบ ?',
//             text: 'ท่านกำลังออกจากระบบ',
//             icon: 'warning',
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 const res = await fetch('/api/v1/logout', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });

//                 if (res.status == 200) {
//                     dispatch({ type: USER_LOGOUT });
//                     history.push('/login');
//                 }
//                 else{
//                     Toast.fire({ title: 'เกิดข้อผิดพลาด ในการดำเนินการ', icon: 'error' });
//                 }
//             }
//         });
//     };
// };
