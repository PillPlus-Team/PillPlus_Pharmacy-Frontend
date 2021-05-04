import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { userForgotPassword } from '../../actions/userActions';

const ForgotPasswordPage = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();
        dispatch(userForgotPassword({ email }));
    };

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="flex flex-row justify-center items-center w-9/12 h-5/6">
                <div className="flex flex-col justify-center items-center w-96 h-96 sm:w-full sm:h-full p-8 sm:p-0 bg-white rounded-lg shadow-md">
                    <p className="text-2xl font-bold">โปรดกรอก Email ที่ท่านใช้ในระบบ PillPlus+</p>
                    <p className="text-md text-gray-400">รหัสผ่านใหม่ จะถูกส่งไปยังที่อยู่นี้</p>
                    <form className="mt-12 w-80" onSubmit={submitHandler} autoComplete="off">
                        <input
                            className="w-full p-2 pl-4 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                            id="input-email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            placeholder="goodboy@mail.com"
                            required
                        />

                        <button
                            className="w-full p-2 mt-6 bg-green-500 text-white rounded-lg focus:outline-none hover:bg-green-800 active:bg-green-500"
                            type="submit"
                        >
                            ขอรหัสผ่านใหม่
                        </button>
                    </form>
                    <Link to="/login" className="mt-2 text-gray-800 hover:underline active:text-gray-600">
                        ย้อนกลับ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
