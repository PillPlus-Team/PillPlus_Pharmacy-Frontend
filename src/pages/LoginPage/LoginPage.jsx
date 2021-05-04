import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { userLogin } from '../../actions/userActions';

const LoginPage = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();
        dispatch(userLogin({ email, password }));
    };

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="flex flex-row justify-center items-center w-9/12 h-5/6">
                <div className="hidden 2xl:block w-full h-full bg-green-500 rounded-l-lg shadow-md"></div>
                <div className="flex flex-col justify-center items-center w-96 h-96 sm:w-full sm:h-full p-8 sm:p-0 bg-white rounded-lg shadow-md 2xl:rounded-l-none">
                    <p className="text-4xl">ยินดีต้อนรับเข้าสู่ PILLPLUS+</p>
                    <form className="mt-8 w-80" onSubmit={submitHandler} autoComplete="off">
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
                        <input
                            className="w-full mt-4 p-2 pl-4 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                            id="input-password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            placeholder="รหัสผ่าน"
                            required
                        />
                        <button
                            className="w-full p-2 mt-6 bg-green-500 text-white rounded-lg focus:outline-none hover:bg-green-800 active:bg-green-500"
                            type="submit"
                        >
                            เข้าสู่ระบบ
                        </button>
                    </form>
                    <Link to="/forgot-password" className="mt-2 text-gray-800 hover:underline active:text-gray-600">
                        ลืมรหัสผ่าน ?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
