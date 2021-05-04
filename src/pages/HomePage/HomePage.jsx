import { useSelector } from 'react-redux';

import { PageLayout } from '../../components';

import MenuButton from './components/ManuButton';

const HomePage = () => {
    const user = useSelector((state) => state.user);
    const menuList = useSelector((state) => state.menuList);

    const menuButtons = menuList.filter((menu) => menu.url !== '/home');

    return (
        <PageLayout pageTitle="หน้าหลัก" userInfo={user} menuList={menuList}>
            <div className="grid grid-flow-row justify-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 ">
                {menuButtons.map((menu) => {
                    return <MenuButton title={menu.title} url={menu.url} />;
                })}
            </div>
        </PageLayout>
    );
};

export default HomePage;
