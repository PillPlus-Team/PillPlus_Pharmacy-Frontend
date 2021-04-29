import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { InputText, InputImageFile } from '../../../components';

import { userEditProfileToggle, userUpdateProfile, userChangePassword } from '../../../actions/userActions';

const ProfileEditor = ({ userInfo, pillStores }) => {
    const dispatch = useDispatch();

    const [avatarUri, setavatarUri] = useState(userInfo.avatarUri);
    const [name, setName] = useState(userInfo.name);
    const [phamacy, setPhamacy] = useState(userInfo.phamacy);
    const [location, setLocation] = useState(userInfo.location);
    const [email, setEmail] = useState(userInfo.email);
    const [phone, setPhone] = useState(userInfo.phone);

    const [isValidavatarUri, setIsValidavatarUri] = useState(true);
    const [isValidName, setIsValidName] = useState(true);
    const [isValidPhamacy, setIsValidPhamacy] = useState(true);
    const [isValidLocation, setIsValidLocation] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(true);

    const [canSubmit, setCanSubmit] = useState(false);

    let emailAlreadyUse = [];
    let phoneAlreadyUse = [];
    pillStores.map((value) => {
        if (value.email !== userInfo.email) {
            emailAlreadyUse.push(value.email);
        }
        if (value.phone !== userInfo.phone) {
            phoneAlreadyUse.push(value.phone);
        }
    });

    useEffect(() => {
        setCanSubmit(isValidavatarUri && isValidName && isValidPhamacy && isValidLocation && isValidEmail && isValidPhone);
    }, [isValidavatarUri, isValidName, isValidPhamacy, isValidLocation, isValidEmail, isValidPhone]);

    const submitHandler = () => {
        if (canSubmit) {
            dispatch(userUpdateProfile({ avatarUri, name, phamacy, location, email, phone }));
        }
    };

    return (
        <div className="flex flex-row min-w-max bg-white rounded-lg shadow-md">
            <InputImageFile
                className="ml-24 mt-24 rounded-lg"
                id="InputImageFile-avatar"
                name="avatar"
                accept="image/jpeg"
                limitSizeMB={1}
                initImageUrl={avatarUri}
                onValidChange={(state) => {
                    setIsValidavatarUri(state);
                }}
                onValueChange={(state) => {
                    setavatarUri(state);
                }}
            />
            <table className="table-fixed w-96 ml-32 mt-24 text-lg">
                <tr>
                    <td className="font-bold w-32 min-w-max py-4">ID</td>
                    <td className="w-96">{userInfo.ID}</td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">ชื่อ - นามสกุล</td>
                    <td>
                        <InputText
                            id="InputText-name"
                            name="name"
                            type="text"
                            initValue={name}
                            placeholder="ชื่อ"
                            autoComplete="off"
                            required
                            minLength={1}
                            maxLength={30}
                            pattern="^[a-zA-Zก-๏\s]+$"
                            msgPatternError="อังกฤษ/ไทย เท่านั้น"
                            onValidChange={(state) => {
                                setIsValidName(state);
                            }}
                            onValueChange={(state) => {
                                setName(state);
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">ชื่อร้าน</td>
                    <td>
                        <InputText
                            id="InputText-phamacy"
                            name="phamacy"
                            type="text"
                            initValue={phamacy}
                            placeholder="ชื่อร้าน"
                            autoComplete="off"
                            required
                            minLength={1}
                            maxLength={30}
                            pattern="^[a-zA-Zก-๏0-9\s]+$"
                            msgPatternError="อังกฤษ/ไทย/ตัวเลข เท่านั้น"
                            onValidChange={(state) => {
                                setIsValidPhamacy(state);
                            }}
                            onValueChange={(state) => {
                                setPhamacy(state);
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">ที่อยู่</td>
                    <td>
                        <InputText
                            id="InputText-location"
                            name="location"
                            type="text"
                            initValue={location}
                            placeholder="ที่อยู่"
                            autoComplete="off"
                            required
                            minLength={1}
                            maxLength={100}
                            onValidChange={(state) => {
                                setIsValidLocation(state);
                            }}
                            onValueChange={(state) => {
                                setLocation(state);
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">Email</td>
                    <td>
                        <InputText
                            id="InputText-email"
                            name="email"
                            type="text"
                            initValue={email}
                            placeholder="goodboy@mail.com"
                            autoComplete="off"
                            required
                            minLength={1}
                            maxLength={30}
                            pattern="^[\w]+[\.\w-]*?@[\w]+(\.[\w]+)+$"
                            msgPatternError="Email ไม่ถูกต้อง"
                            dupList={emailAlreadyUse}
                            msgDupError="Email ถูกใช้ไปเเล้ว"
                            onValidChange={(state) => {
                                setIsValidEmail(state);
                            }}
                            onValueChange={(state) => {
                                setEmail(state);
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="font-bold w-32 min-w-min py-4">เบอร์ติดต่อ</td>
                    <td>
                        <InputText
                            id="InputText-phone"
                            name="phone"
                            type="text"
                            initValue={phone}
                            placeholder="0912345678"
                            autoComplete="off"
                            required
                            minLength={9}
                            maxLength={10}
                            pattern="^[0-9]+$"
                            msgPatternError="ตัวเลข เท่านั้น"
                            dupList={phoneAlreadyUse}
                            msgDupError="เบอร์ติดต่อ ถูกไปใช้เเล้ว"
                            onValidChange={(state) => {
                                setIsValidPhone(state);
                            }}
                            onValueChange={(state) => {
                                setPhone(state);
                            }}
                        />
                    </td>
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
            <div className="flex flex-col justify-end items-end w-full mt-64 h-96">
                <div className="flex flex-row">
                    <button
                        className="w-24 mb-2 mr-2 p-2 bg-gray-500 text-white rounded-lg focus:outline-none hover:bg-gray-400"
                        type="button"
                        onClick={() => {
                            dispatch(userEditProfileToggle());
                        }}
                    >
                        ยกเลิก
                    </button>
                    <button
                        className={`w-24 mb-2 mr-2 p-2 text-white rounded-lg focus:outline-none  ${
                            canSubmit ? 'bg-green-500 hover:bg-green-800' : 'bg-gray-300 cursor-not-allowed'
                        }`}
                        type="button"
                        disabled={!canSubmit}
                        onClick={submitHandler}
                    >
                        ตกลง
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileEditor;
