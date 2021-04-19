import { useDispatch } from 'react-redux';
import { NavLink, Link, useHistory } from 'react-router-dom';

import { userLogout } from '../../../actions/userActions.js';

const SideBar = ({ menuList }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const logoutHandler = () => {
        dispatch(userLogout({ history }));
    };

    return (
        <div className="flex flex-col items-center w-96 pt-8 bg-green-500 shadow-md overflow-y-auto">
            <div className="text-white text-5xl font-bold">PILLPLUS+</div>
            <div className="flex flex-col justify-between w-full h-full mt-8 text-md text-white">
                <div className="flex flex-col">
                    {menuList.map((value) => {
                        return (
                            <NavLink
                                exact
                                to={value.url}
                                className="flex justify-start items-center w-full h-16 hover:bg-green-400"
                                activeClassName="border-l-4 text-xl bg-green-400 border-black"
                            >
                                <p className="pl-8">{value.title}</p>
                            </NavLink>
                        );
                    })}
                </div>
                <div className="flex flex-col">
                    <Link to="/profile" className="flex justify-center items-center w-full h-16 bg-green-600 hover:bg-green-400">
                        บัญชีผู้ใช้
                    </Link>
                    <button className="w-full h-16 bg-gray-500 text-white hover:bg-gray-400 focus:outline-none" onClick={logoutHandler}>
                        ออกจากระบบ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
