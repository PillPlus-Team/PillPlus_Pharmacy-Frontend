import { useDispatch } from 'react-redux';

import { userEditProfileToggle, userChangePassword } from '../../../actions/userActions';

const ProfileDisplay = ({ userInfo }) => {
    const dispatch = useDispatch();

    return (
        <div className="flex flex-row min-w-max h-176 bg-white rounded-lg shadow-md ">
            <img className="w-80 h-80 ml-24 mt-24 rounded-lg shadow-md object-cover" src={userInfo.avatarUri} alt="user-avatar" />
            <div className="flex flex-row w-full">
                <table className="table-fixed w-96 ml-32 mt-24 text-lg">
                    <tr>
                        <td className="font-bold w-32 min-w-max py-4">ID</td>
                        <td className="w-96">{userInfo.ID}</td>
                    </tr>
                    <tr>
                        <td className="font-bold w-32 min-w-min py-4">ชื่อ - นามสกุล</td>
                        <td>{userInfo.name}</td>
                    </tr>
                    <tr>
                        <td className="font-bold w-32 min-w-min py-4">ชื่อร้าน</td>
                        <td>{userInfo.phamacy}</td>
                    </tr>
                    <tr>
                        <td className="font-bold w-32 min-w-min py-4">ที่อยู่</td>
                        <td>{userInfo.location}</td>
                    </tr>
                    <tr>
                        <td className="font-bold w-32 min-w-min py-4">ตำแหน่งร้าน</td>
                        <td>
                            {!(userInfo.lat && userInfo.lng) && (
                                <div className="flex flex-row space-x-2 text-red-400 ">ยังไม่ได้กำหนด (กำหนดเพื่อ Activate)</div>
                            )}
                            {userInfo.lat && userInfo.lng && (
                                <div className="flex flex-row space-x-2 text-gray-400 ">
                                    <p>LAT : {Number(userInfo.lat).toLocaleString('th-TH', { minimumFractionDigits: 5 })}</p>
                                    <p>LNT : {Number(userInfo.lng).toLocaleString('th-TH', { minimumFractionDigits: 5 })}</p>
                                </div>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold w-32 min-w-min py-4">เวลาทำการ</td>
                        <td>
                            {!userInfo.openingDesription && (
                                <div className="flex flex-row space-x-2 text-red-400 ">ยังไม่ได้กำหนด (กำหนดเพื่อ Activate)</div>
                            )}
                            {userInfo.openingDesription && (
                                <div className="flex flex-row space-x-2 text-sm text-gray-400 ">
                                    <p>LAT : {Number(userInfo.lat).toLocaleString('th-TH', { minimumFractionDigits: 5 })}</p>
                                    <p>LNT : {Number(userInfo.lng).toLocaleString('th-TH', { minimumFractionDigits: 5 })}</p>
                                </div>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold w-32 min-w-min py-4">Email</td>
                        <td>{userInfo.email}</td>
                    </tr>
                    <tr>
                        <td className="font-bold w-32 min-w-min py-4">เบอร์ติดต่อ</td>
                        <td>{userInfo.phone}</td>
                    </tr>
                    <tr>
                        <td className="font-bold w-32 min-w-min py-4">รหัสผ่าน</td>
                        <td>
                            <button
                                className="w-52 p-2 bg-green-500 text-white rounded-lg focus:outline-none hover:bg-green-800"
                                type="button"
                                onClick={() => {
                                    dispatch(userChangePassword());
                                }}
                            >
                                เปลี่ยนรหัสผ่าน
                            </button>
                        </td>
                    </tr>
                </table>
                <div className="flex flex-col items-end w-full mb-auto ">
                    <button
                        className="w-24 mt-2 mr-2 p-2 bg-green-500 text-white rounded-lg focus:outline-none hover:bg-green-800"
                        type="button"
                        onClick={() => {
                            dispatch(userEditProfileToggle());
                        }}
                    >
                        เเก้ไข
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileDisplay;
